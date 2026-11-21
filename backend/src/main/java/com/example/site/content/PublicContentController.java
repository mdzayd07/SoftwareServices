package com.example.site.content;

import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1")
public class PublicContentController {
    private final JdbcTemplate db;
    public PublicContentController(JdbcTemplate db) { this.db=db; }

    @GetMapping("/services")
    public List<Map<String,Object>> services() { return db.queryForList("SELECT slug,title,summary,body,category,seo_title,seo_description,published_at FROM service_content WHERE status='PUBLISHED' ORDER BY sort_order,title"); }

    @GetMapping("/services/{slug}")
    public Map<String,Object> service(@PathVariable String slug) { return one("SELECT slug,title,summary,body,category,seo_title,seo_description,published_at FROM service_content WHERE slug=? AND status='PUBLISHED'", slug); }

    @GetMapping("/articles")
    public List<Map<String,Object>> articles() { return db.queryForList("SELECT slug,title,excerpt,author_display_name,topic,seo_title,seo_description,published_at FROM article_content WHERE status='PUBLISHED' ORDER BY published_at DESC"); }

    @GetMapping("/faqs")
    public List<Map<String,Object>> faqs() { return db.queryForList("SELECT question,answer FROM faq WHERE status='PUBLISHED' ORDER BY sort_order,question"); }

    @GetMapping("/site-settings")
    public List<Map<String,Object>> siteSettings() { return db.queryForList("SELECT setting_key,setting_value FROM site_setting WHERE setting_key IN ('contact.email','contact.phone','contact.responseExpectation','social.whatsapp','site.name') ORDER BY setting_key"); }

    @GetMapping("/articles/{slug}")
    public Map<String,Object> article(@PathVariable String slug) { return one("SELECT slug,title,excerpt,body,author_display_name,topic,seo_title,seo_description,published_at FROM article_content WHERE slug=? AND status='PUBLISHED'", slug); }

    private Map<String,Object> one(String sql, String slug) {
        var rows=db.queryForList(sql,slug);
        if (rows.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Content not found");
        return rows.get(0);
    }
}
