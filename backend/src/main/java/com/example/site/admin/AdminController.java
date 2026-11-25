package com.example.site.admin;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    private final JdbcTemplate db;
    private static final List<String> LEAD_STATES = List.of("NEW", "IN_REVIEW", "REPLIED", "QUALIFIED", "CLOSED", "SPAM");
    private static final List<String> CONTENT_STATES = List.of("DRAFT", "PUBLISHED", "ARCHIVED");
    private static final Set<String> SETTING_KEYS = Set.of("contact.email", "contact.phone", "contact.responseExpectation", "social.whatsapp", "site.name");

    public AdminController(JdbcTemplate db) { this.db = db; }

    @GetMapping("/leads")
    public List<Map<String,Object>> leads(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue="25") int size) {
        int safePage = Math.max(0, Math.min(page, 10_000)); int safeSize = Math.max(1, Math.min(size, 100));
        return db.queryForList("SELECT id,name,email,phone,organization,project_type,message,timeline,budget_range,status,created_at FROM lead ORDER BY created_at DESC LIMIT ? OFFSET ?", safeSize, safePage * safeSize);
    }

    @PatchMapping("/leads/status")
    public Map<String,String> updateLead(@Valid @RequestBody LeadStatusChange change) {
        if (!LEAD_STATES.contains(change.status())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid lead status");
        int updated = db.update("UPDATE lead SET status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?", change.status(), UUID.fromString(change.id()));
        if (updated == 0) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Lead not found");
        db.update("INSERT INTO audit_event (action,entity_type,entity_id) VALUES (?,?,?)", "LEAD_STATUS_CHANGED", "lead", UUID.fromString(change.id()));
        return Map.of("status", change.status());
    }

    @GetMapping("/services")
    public List<Map<String,Object>> services() { return db.queryForList("SELECT id,slug,title,summary,body,category,sort_order,status,seo_title,seo_description,updated_at FROM service_content ORDER BY sort_order,title"); }

    @PutMapping("/services")
    public Map<String,String> saveService(@Valid @RequestBody ServiceContent content) {
        requireContentStatus(content.status());
        String id = content.id() == null || content.id().isBlank() ? UUID.randomUUID().toString() : content.id();
        db.update("INSERT INTO service_content (id,slug,title,summary,body,category,sort_order,status,seo_title,seo_description) VALUES (?,?,?,?,?,?,?,?,?,?) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title,summary=EXCLUDED.summary,body=EXCLUDED.body,category=EXCLUDED.category,sort_order=EXCLUDED.sort_order,status=EXCLUDED.status,seo_title=EXCLUDED.seo_title,seo_description=EXCLUDED.seo_description,updated_at=CURRENT_TIMESTAMP,published_at=CASE WHEN EXCLUDED.status='PUBLISHED' THEN COALESCE(service_content.published_at,CURRENT_TIMESTAMP) ELSE NULL END",
                UUID.fromString(id), content.slug(), content.title(), content.summary(), content.body(), content.category(), content.sortOrder(), content.status(), content.seoTitle(), content.seoDescription());
        audit("SERVICE_SAVED", "service_content", id); return Map.of("id", id);
    }

    @GetMapping("/articles")
    public List<Map<String,Object>> articles() { return db.queryForList("SELECT id,slug,title,excerpt,body,author_display_name,topic,status,seo_title,seo_description,published_at,updated_at FROM article_content ORDER BY updated_at DESC"); }

    @PutMapping("/articles")
    public Map<String,String> saveArticle(@Valid @RequestBody ArticleContent content) {
        requireContentStatus(content.status());
        String id = content.id() == null || content.id().isBlank() ? UUID.randomUUID().toString() : content.id();
        db.update("INSERT INTO article_content (id,slug,title,excerpt,body,author_display_name,topic,status,seo_title,seo_description) VALUES (?,?,?,?,?,?,?,?,?,?) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title,excerpt=EXCLUDED.excerpt,body=EXCLUDED.body,author_display_name=EXCLUDED.author_display_name,topic=EXCLUDED.topic,status=EXCLUDED.status,seo_title=EXCLUDED.seo_title,seo_description=EXCLUDED.seo_description,updated_at=CURRENT_TIMESTAMP,published_at=CASE WHEN EXCLUDED.status='PUBLISHED' THEN COALESCE(article_content.published_at,CURRENT_TIMESTAMP) ELSE NULL END",
                UUID.fromString(id), content.slug(), content.title(), content.excerpt(), content.body(), content.authorDisplayName(), content.topic(), content.status(), content.seoTitle(), content.seoDescription());
        audit("ARTICLE_SAVED", "article_content", id); return Map.of("id", id);
    }

    @GetMapping("/faqs")
    public List<Map<String,Object>> faqs() { return db.queryForList("SELECT id,question,answer,sort_order,status FROM faq ORDER BY sort_order,question"); }

    @PutMapping("/faqs")
    public Map<String,String> saveFaq(@Valid @RequestBody FaqContent content) {
        requireContentStatus(content.status());
        String id=content.id()==null||content.id().isBlank()?UUID.randomUUID().toString():content.id();
        db.update("INSERT INTO faq (id,question,answer,sort_order,status) VALUES (?,?,?,?,?) ON CONFLICT (id) DO UPDATE SET question=EXCLUDED.question,answer=EXCLUDED.answer,sort_order=EXCLUDED.sort_order,status=EXCLUDED.status",
                UUID.fromString(id),content.question(),content.answer(),content.sortOrder(),content.status());
        audit("FAQ_SAVED","faq",id);return Map.of("id",id);
    }

    @GetMapping("/site-settings")
    public List<Map<String,Object>> siteSettings() { return db.queryForList("SELECT setting_key,setting_value,updated_at FROM site_setting ORDER BY setting_key"); }

    @PutMapping("/site-settings/{key}")
    public Map<String,String> saveSetting(@org.springframework.web.bind.annotation.PathVariable String key, @Valid @RequestBody SettingValue value) {
        if(!SETTING_KEYS.contains(key)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Setting is not editable");
        db.update("INSERT INTO site_setting (setting_key,setting_value) VALUES (?,?) ON CONFLICT (setting_key) DO UPDATE SET setting_value=EXCLUDED.setting_value,updated_at=CURRENT_TIMESTAMP",key,value.value());
        db.update("INSERT INTO audit_event (action,entity_type) VALUES (?,?)","SITE_SETTING_CHANGED","site_setting");
        return Map.of("key",key);
    }

    private void requireContentStatus(String status) { if (!CONTENT_STATES.contains(status)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid content status"); }
    private void audit(String action, String type, String id) { db.update("INSERT INTO audit_event (action,entity_type,entity_id) VALUES (?,?,?)", action, type, UUID.fromString(id)); }

    public record LeadStatusChange(@NotBlank String id, @NotBlank String status) {}
    public record ServiceContent(String id, @NotBlank @Size(max=160) String slug, @NotBlank @Size(max=200) String title, @NotBlank @Size(max=500) String summary, @NotBlank String body, @NotBlank @Size(max=80) String category, int sortOrder, @NotBlank String status, @Size(max=200) String seoTitle, @Size(max=320) String seoDescription) {}
    public record ArticleContent(String id, @NotBlank @Size(max=160) String slug, @NotBlank @Size(max=200) String title, @NotBlank @Size(max=500) String excerpt, @NotBlank String body, @NotBlank @Size(max=120) String authorDisplayName, @NotBlank @Size(max=80) String topic, @NotBlank String status, @Size(max=200) String seoTitle, @Size(max=320) String seoDescription) {}
    public record FaqContent(String id,@NotBlank @Size(max=500) String question,@NotBlank String answer,int sortOrder,@NotBlank String status) {}
    public record SettingValue(@NotBlank @Size(max=1000) String value) {}
}
