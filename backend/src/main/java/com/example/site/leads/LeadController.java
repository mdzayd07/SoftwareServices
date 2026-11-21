package com.example.site.leads;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/leads")
public class LeadController {
    private static final Logger log = LoggerFactory.getLogger(LeadController.class);
    private final JdbcTemplate db;
    private final ObjectProvider<JavaMailSender> mailSender;
    private final String notifyTo;
    private final String mailFrom;
    private final int retentionDays;
    private final ConcurrentHashMap<String, Window> windows = new ConcurrentHashMap<>();

    public LeadController(JdbcTemplate db, ObjectProvider<JavaMailSender> mailSender,
                          @Value("${app.leads.notify-to:}") String notifyTo,
                          @Value("${spring.mail.from:}") String mailFrom,
                          @Value("${app.leads.retention-days:90}") int retentionDays) {
        this.db = db; this.mailSender = mailSender; this.notifyTo = notifyTo; this.mailFrom = mailFrom; this.retentionDays=retentionDays;
    }

    @PostMapping
    public Map<String, String> submit(@Valid @RequestBody LeadRequest request,
                                      jakarta.servlet.http.HttpServletRequest servletRequest) {
        limit(servletRequest.getRemoteAddr());
        if (request.website() != null && !request.website().isBlank()) return Map.of("message", "Thank you. Your enquiry has been received.");
        if (!request.consentToContact()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Please agree to be contacted.");
        var id = UUID.randomUUID();
        var source = request.sourcePath() != null && request.sourcePath().startsWith("/") && !request.sourcePath().startsWith("//")
                ? request.sourcePath().substring(0, Math.min(500, request.sourcePath().length())) : null;
        db.update("INSERT INTO lead (id,name,email,organization,project_type,message,timeline,budget_range,consent_to_contact,source_path,status) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                id, request.name().trim(), request.email().trim().toLowerCase(), clean(request.organization()), request.projectType(),
                request.message().trim(), request.timeline(), request.budgetRange(), true, source, "NEW");
        notifyAdmin(request, id.toString());
        return Map.of("message", "Thank you. Your enquiry has been received.");
    }

    private void limit(String address) {
        long now = System.currentTimeMillis();
        Window current = windows.compute(address, (key, old) -> old == null || now - old.started > 600_000 ? new Window(now, 1) : new Window(old.started, old.count + 1));
        if (current.count > 5) throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Please wait before sending another enquiry.");
    }

    private void notifyAdmin(LeadRequest request, String reference) {
        JavaMailSender sender = mailSender.getIfAvailable();
        if (sender == null || notifyTo.isBlank() || mailFrom.isBlank()) return;
        try {
            var mail = new SimpleMailMessage();
            mail.setFrom(mailFrom); mail.setTo(notifyTo); mail.setSubject("New software services enquiry");
            mail.setText("A new enquiry was stored (reference " + reference + ").\nName: " + request.name()
                    + "\nEmail: " + request.email() + "\nOrganization: " + clean(request.organization())
                    + "\nProject type: " + request.projectType() + "\nMessage: " + request.message());
            sender.send(mail);
        } catch (RuntimeException ignored) {
            // The lead is already durable; mail outages must not discard it or expose form data in logs.
            log.warn("Lead notification delivery failed; the enquiry remains stored.");
        }
    }

    @Scheduled(fixedDelay = 86_400_000L, initialDelay = 60_000L)
    public void purgeExpiredLeads() {
        if (retentionDays > 0) db.update("DELETE FROM lead WHERE created_at < CURRENT_TIMESTAMP - (? * INTERVAL '1 day')", retentionDays);
    }

    private String clean(String value) { return value == null ? null : value.trim(); }
    private record Window(long started, int count) {}

    public record LeadRequest(
            @NotBlank @Size(min=2,max=100) String name,
            @NotBlank @Email @Size(max=254) String email,
            @Size(max=150) String organization,
            @NotBlank @Size(max=80) String projectType,
            @NotBlank @Size(min=20,max=5000) String message,
            @Size(max=80) String timeline,
            @Size(max=80) String budgetRange,
            boolean consentToContact,
            @Size(max=500) String sourcePath,
            @Size(max=200) String website) {}
}
