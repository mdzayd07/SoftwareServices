import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { serviceDrafts, ServiceDraft } from './content-drafts';
import { SiteSettingsService } from './site-settings.service';

@Component({
  selector: 'site-service-detail',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  template: `
    @if (route.paramMap | async; as params) {
      @if (findService(params.get('slug')); as service) {
        @if (publishedContent; as content) {
          <section class="page-hero">
            <p class="eyebrow">{{ content.category }}</p>
            <h1>{{ content.title }}</h1>
            <p class="intro">{{ content.summary }}</p>
            <div class="published-body">{{ content.body }}</div>
            <div class="service-detail-actions">
              <a class="button primary-cta" routerLink="/contact" [queryParams]="{ service: params.get('slug') }">
                Discuss This Project <span aria-hidden="true">↗</span>
              </a>
              <a class="button wa-cta" [href]="getServiceWhatsAppUrl(service)" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp 💬
              </a>
            </div>
          </section>
        } @else {
          <section class="page-hero service-detail-hero">
            <div class="hero-top-row">
              <span class="eyebrow">{{ service.category }}</span>
              <span class="timeline-pill">⏱️ {{ service.timeline }}</span>
            </div>
            <h1>{{ service.title }}</h1>
            <p class="intro">{{ service.tagline }}</p>
            <p class="service-problem-callout"><strong>The Problem We Solve:</strong> {{ service.problem }}</p>

            <div class="service-guarantees-bar">
              <div class="guarantee-pill">🛡️ 100% Code &amp; IP Handover</div>
              <div class="guarantee-pill">💼 40/40/20 Milestone Billing</div>
              <div class="guarantee-pill">🔒 Mutual NDA Protected</div>
              <div class="guarantee-pill">💰 From {{ service.estimatedBudget }}</div>
            </div>

            <div class="service-detail-grid">
              <article class="detail-block">
                <h2>Key Capabilities &amp; Features</h2>
                <ul>
                  @for (feat of service.features; track feat) {
                    <li><span class="check-icon">✓</span> {{ feat }}</li>
                  }
                </ul>
              </article>

              <article class="detail-block">
                <h2>Tangible Deliverables</h2>
                <ul>
                  @for (item of service.deliverables; track item) {
                    <li><span class="check-icon">✓</span> {{ item }}</li>
                  }
                </ul>
              </article>

              <article class="detail-block">
                <h2>Best Fit For</h2>
                <p>{{ service.fit }}</p>
              </article>

              <article class="detail-block">
                <h2>How Collaboration Works</h2>
                <p>{{ service.collaboration }}</p>
              </article>
            </div>

            <div class="service-detail-actions">
              <a class="button primary-cta" routerLink="/contact" [queryParams]="{ service: service.slug }">
                Request Scope &amp; Quote for {{ service.title }} <span aria-hidden="true">↗</span>
              </a>
              <a class="button wa-cta" [href]="getServiceWhatsAppUrl(service)" target="_blank" rel="noopener noreferrer">
                Discuss on WhatsApp 💬
              </a>
              <a class="text-link" href="/#estimator">
                Calculate with Estimator &rarr;
              </a>
            </div>
          </section>
        }
      } @else {
        <section class="page-hero">
          <p class="eyebrow">404 · NOT FOUND</p>
          <h1>Service not found</h1>
          <p class="intro">This service route does not match a known category.</p>
          <a class="button" routerLink="/services">Browse All Services <span aria-hidden="true">&rarr;</span></a>
        </section>
      }
    }
  `,
  styles: [`
    .service-detail-hero {
      max-width: 960px;
      margin: 0 auto;
    }
    .hero-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .timeline-pill {
      font-size: 0.82rem;
      font-weight: 600;
      color: #60a5fa;
      background: rgba(59, 130, 246, 0.12);
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
    }
    .service-problem-callout {
      background: rgba(255, 255, 255, 0.03);
      border-left: 3px solid #38bdf8;
      padding: 0.85rem 1.25rem;
      border-radius: 0 8px 8px 0;
      color: #cbd5e1;
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 1.25rem 0;
    }
    .service-guarantees-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin: 1.5rem 0 2.25rem 0;
    }
    .guarantee-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      font-size: 0.82rem;
      color: #e2e8f0;
      font-weight: 500;
    }
    .service-detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    .detail-block {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 12px;
      padding: 1.5rem;
    }
    .detail-block h2 {
      font-size: 1.15rem;
      margin: 0 0 1rem 0;
      color: #f8fafc;
    }
    .detail-block ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .detail-block li {
      font-size: 0.9rem;
      color: #cbd5e1;
      margin-bottom: 0.5rem;
      display: flex;
      gap: 0.5rem;
      align-items: flex-start;
    }
    .detail-block p {
      color: #94a3b8;
      font-size: 0.92rem;
      line-height: 1.6;
      margin: 0;
    }
    .check-icon {
      color: #10b981;
      font-weight: bold;
    }
    .service-detail-actions {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      flex-wrap: wrap;
      margin-top: 2.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .primary-cta {
      padding: 0.85rem 1.6rem;
    }
    .wa-cta {
      background: #16a34a !important;
      color: #fff !important;
      padding: 0.85rem 1.4rem;
    }
    .wa-cta:hover {
      background: #15803d !important;
    }
  `]
})
export class ServiceDetailComponent implements OnInit {
  readonly route = inject(ActivatedRoute);
  readonly settings = inject(SiteSettingsService);
  publishedContent: { title: string; summary: string; body: string; category: string } | null = null;
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  findService(slug: string | null): ServiceDraft | undefined {
    return serviceDrafts.find((service) => service.slug === slug);
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const draft = this.findService(slug);
    if (draft) {
      this.titleService.setTitle(`${draft.title} | Northline Software`);
      this.metaService.updateTag({ name: 'description', content: draft.tagline });
    }
    if (!isPlatformBrowser(this.platformId)) return;
    if (slug) {
      this.http.get<{ title: string; summary: string; body: string; category: string }>(`/api/v1/services/${encodeURIComponent(slug)}`).subscribe({
        next: (content) => {
          this.publishedContent = content;
          this.titleService.setTitle(`${content.title} | Northline Software`);
        },
        error: () => {}
      });
    }
  }

  getServiceWhatsAppUrl(service: ServiceDraft): string {
    const text = encodeURIComponent(
      `Hi, I am interested in your ${service.title} service.\n` +
      `Category: ${service.category}\n` +
      `Typical budget: ${service.estimatedBudget}\n` +
      `Please let me know how we can get started.`
    );
    return `https://wa.me/917013631398?text=${text}`;
  }
}
