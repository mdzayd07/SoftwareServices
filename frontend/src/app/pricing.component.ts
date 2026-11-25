import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteSettingsService } from './site-settings.service';
import { ProjectEstimatorComponent } from './project-estimator.component';

interface PricingTier {
  id: string;
  badge?: string;
  name: string;
  subtitle: string;
  priceInr: string;
  priceUsd: string;
  period: string; // 'one-time' or '/ month'
  description: string;
  features: string[];
  exclusions?: string[];
  recommended?: boolean;
}

@Component({
  selector: 'site-pricing',
  standalone: true,
  imports: [CommonModule, RouterLink, ProjectEstimatorComponent],
  template: `
    <!-- Pricing Hero -->
    <section class="pricing-hero">
      <div class="hero-container">
        <p class="eyebrow">TRANSPARENT PRICING · HONEST MILESTONE BILLING</p>
        <h1>Simple, Upfront Pricing With Zero Hidden Fees.</h1>
        <p class="hero-intro">
          Every project includes free technical consultation, clear milestone commitments, full source code handover, and dedicated post-launch support. Choose a package or use our calculator for custom builds.
        </p>

        <!-- Trust Badges Strip -->
        <div class="pricing-trust-badges">
          <div class="trust-badge">
            <span class="badge-num">40/40/20</span>
            <span class="badge-label">Milestone Billing</span>
          </div>
          <div class="trust-badge">
            <span class="badge-num">100%</span>
            <span class="badge-label">Code Ownership</span>
          </div>
          <div class="trust-badge">
            <span class="badge-num">{{ currency === 'INR' ? '₹0' : '$0' }}</span>
            <span class="badge-label">Hidden Charges</span>
          </div>
          <div class="trust-badge">
            <span class="badge-num">&lt;24h</span>
            <span class="badge-label">Response SLA</span>
          </div>
        </div>

        <!-- Universal Inclusions List -->
        <div class="universal-inclusions">
          <span class="inc-title">Included in every engagement:</span>
          <span class="inc-item">✓ Free discovery call</span>
          <span class="inc-item">✓ Milestone billing</span>
          <span class="inc-item">✓ GST / Corporate invoice</span>
          <span class="inc-item">✓ Mutual NDA on request</span>
          <span class="inc-item">✓ Full source code handover</span>
          <span class="inc-item">✓ Post-launch support SLA</span>
        </div>

        <!-- Currency Switcher -->
        <div class="currency-toggle-wrapper">
          <span class="currency-label">View Pricing in:</span>
          <div class="currency-toggle">
            <button
              type="button"
              [class.active]="currency === 'INR'"
              (click)="currency = 'INR'"
              aria-label="View prices in Indian Rupees">
              ₹ INR (India)
            </button>
            <button
              type="button"
              [class.active]="currency === 'USD'"
              (click)="currency = 'USD'"
              aria-label="View prices in US Dollars">
              $ USD (Global)
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Tabs Navigation -->
    <section class="pricing-tabs-section">
      <div class="tabs-nav" role="tablist">
        <button
          role="tab"
          [attr.aria-selected]="activeTab === 'web'"
          [class.active]="activeTab === 'web'"
          (click)="activeTab = 'web'">
          🌐 Web Development
        </button>
        <button
          role="tab"
          [attr.aria-selected]="activeTab === 'software'"
          [class.active]="activeTab === 'software'"
          (click)="activeTab = 'software'">
          ⚡ Custom Software &amp; SaaS
        </button>
        <button
          role="tab"
          [attr.aria-selected]="activeTab === 'app'"
          [class.active]="activeTab === 'app'"
          (click)="activeTab = 'app'">
          📱 Mobile Apps (Flutter)
        </button>
        <button
          role="tab"
          [attr.aria-selected]="activeTab === 'retainers'"
          [class.active]="activeTab === 'retainers'"
          (click)="activeTab = 'retainers'">
          🛡️ DevOps &amp; Retainers
        </button>
      </div>

      <!-- Tab 1: Web Development -->
      @if (activeTab === 'web') {
        <div class="tab-pane" role="tabpanel">
          <div class="pane-header">
            <h2>Modern Web Development Packages</h2>
            <p>From high-converting business sites to high-performance Angular web applications.</p>
          </div>
          <div class="pricing-cards-grid">
            @for (tier of webTiers; track tier.id) {
              <div class="pricing-card" [class.highlighted]="tier.recommended">
                @if (tier.badge) {
                  <span class="card-badge">{{ tier.badge }}</span>
                }
                <h3>{{ tier.name }}</h3>
                <p class="tier-subtitle">{{ tier.subtitle }}</p>
                <div class="price-box">
                  <span class="price-from">From</span>
                  <span class="price-val">{{ currency === 'INR' ? tier.priceInr : tier.priceUsd }}</span>
                  <span class="price-period">{{ tier.period }}</span>
                </div>
                <p class="tier-desc">{{ tier.description }}</p>

                <div class="card-actions">
                  <a
                    [routerLink]="['/contact']"
                    [queryParams]="{ package: tier.name, service: 'web-development' }"
                    class="button plan-cta">
                    Get Started ↗
                  </a>
                  <a
                    [href]="getPlanWhatsApp(tier.name)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="wa-sub-btn">
                    Ask on WhatsApp 💬
                  </a>
                </div>

                <div class="features-list">
                  <span class="features-label">What's included:</span>
                  <ul>
                    @for (feat of tier.features; track feat) {
                      <li class="check-item"><span class="icon">✓</span> {{ feat }}</li>
                    }
                    @for (ex of tier.exclusions || []; track ex) {
                      <li class="cross-item"><span class="icon">✗</span> {{ ex }}</li>
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Tab 2: Custom Software & SaaS -->
      @if (activeTab === 'software') {
        <div class="tab-pane" role="tabpanel">
          <div class="pane-header">
            <h2>Custom Software, SaaS &amp; Spring Boot Engineering</h2>
            <p>Tailored enterprise architectures, robust REST APIs, and multi-tenant software platforms.</p>
          </div>
          <div class="pricing-cards-grid">
            @for (tier of softwareTiers; track tier.id) {
              <div class="pricing-card" [class.highlighted]="tier.recommended">
                @if (tier.badge) {
                  <span class="card-badge">{{ tier.badge }}</span>
                }
                <h3>{{ tier.name }}</h3>
                <p class="tier-subtitle">{{ tier.subtitle }}</p>
                <div class="price-box">
                  <span class="price-from">From</span>
                  <span class="price-val">{{ currency === 'INR' ? tier.priceInr : tier.priceUsd }}</span>
                  <span class="price-period">{{ tier.period }}</span>
                </div>
                <p class="tier-desc">{{ tier.description }}</p>

                <div class="card-actions">
                  <a
                    [routerLink]="['/contact']"
                    [queryParams]="{ package: tier.name, service: 'custom-software-development' }"
                    class="button plan-cta">
                    Get Started ↗
                  </a>
                  <a
                    [href]="getPlanWhatsApp(tier.name)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="wa-sub-btn">
                    Ask on WhatsApp 💬
                  </a>
                </div>

                <div class="features-list">
                  <span class="features-label">What's included:</span>
                  <ul>
                    @for (feat of tier.features; track feat) {
                      <li class="check-item"><span class="icon">✓</span> {{ feat }}</li>
                    }
                    @for (ex of tier.exclusions || []; track ex) {
                      <li class="cross-item"><span class="icon">✗</span> {{ ex }}</li>
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Tab 3: Mobile Apps -->
      @if (activeTab === 'app') {
        <div class="tab-pane" role="tabpanel">
          <div class="pane-header">
            <h2>Cross-Platform Mobile App Packages (Flutter)</h2>
            <p>Unified Android and iOS apps from early prototype validation to enterprise field systems.</p>
          </div>
          <div class="pricing-cards-grid">
            @for (tier of appTiers; track tier.id) {
              <div class="pricing-card" [class.highlighted]="tier.recommended">
                @if (tier.badge) {
                  <span class="card-badge">{{ tier.badge }}</span>
                }
                <h3>{{ tier.name }}</h3>
                <p class="tier-subtitle">{{ tier.subtitle }}</p>
                <div class="price-box">
                  <span class="price-from">From</span>
                  <span class="price-val">{{ currency === 'INR' ? tier.priceInr : tier.priceUsd }}</span>
                  <span class="price-period">{{ tier.period }}</span>
                </div>
                <p class="tier-desc">{{ tier.description }}</p>

                <div class="card-actions">
                  <a
                    [routerLink]="['/contact']"
                    [queryParams]="{ package: tier.name, service: 'mobile-app-development' }"
                    class="button plan-cta">
                    Get Started ↗
                  </a>
                  <a
                    [href]="getPlanWhatsApp(tier.name)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="wa-sub-btn">
                    Ask on WhatsApp 💬
                  </a>
                </div>

                <div class="features-list">
                  <span class="features-label">What's included:</span>
                  <ul>
                    @for (feat of tier.features; track feat) {
                      <li class="check-item"><span class="icon">✓</span> {{ feat }}</li>
                    }
                    @for (ex of tier.exclusions || []; track ex) {
                      <li class="cross-item"><span class="icon">✗</span> {{ ex }}</li>
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Tab 4: DevOps & Dedicated Retainers -->
      @if (activeTab === 'retainers') {
        <div class="tab-pane" role="tabpanel">
          <div class="pane-header">
            <h2>Cloud, DevOps &amp; Dedicated Retainers</h2>
            <p>Predictable monthly support, continuous delivery pipelines, and ongoing platform modernization.</p>
          </div>
          <div class="pricing-cards-grid">
            @for (tier of retainerTiers; track tier.id) {
              <div class="pricing-card" [class.highlighted]="tier.recommended">
                @if (tier.badge) {
                  <span class="card-badge">{{ tier.badge }}</span>
                }
                <h3>{{ tier.name }}</h3>
                <p class="tier-subtitle">{{ tier.subtitle }}</p>
                <div class="price-box">
                  <span class="price-from">From</span>
                  <span class="price-val">{{ currency === 'INR' ? tier.priceInr : tier.priceUsd }}</span>
                  <span class="price-period">{{ tier.period }}</span>
                </div>
                <p class="tier-desc">{{ tier.description }}</p>

                <div class="card-actions">
                  <a
                    [routerLink]="['/contact']"
                    [queryParams]="{ package: tier.name, service: 'retainers' }"
                    class="button plan-cta">
                    Get Started ↗
                  </a>
                  <a
                    [href]="getPlanWhatsApp(tier.name)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="wa-sub-btn">
                    Ask on WhatsApp 💬
                  </a>
                </div>

                <div class="features-list">
                  <span class="features-label">What's included:</span>
                  <ul>
                    @for (feat of tier.features; track feat) {
                      <li class="check-item"><span class="icon">✓</span> {{ feat }}</li>
                    }
                    @for (ex of tier.exclusions || []; track ex) {
                      <li class="cross-item"><span class="icon">✗</span> {{ ex }}</li>
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </section>

    <!-- Embedded Estimator Section -->
    <section class="pricing-estimator-wrap" id="estimator">
      <div class="estimator-header">
        <p class="eyebrow">CUSTOM SCOPE CALCULATOR</p>
        <h2>Need a Custom Build or Exact Ballpark?</h2>
        <p>Use our interactive estimator to select specific architectural features and get an instant cost range.</p>
      </div>
      <site-project-estimator />
    </section>

    <!-- Comprehensive Pricing FAQ Section -->
    <section class="pricing-faq-section">
      <div class="faq-container">
        <div class="faq-header">
          <p class="eyebrow">COMMON QUESTIONS</p>
          <h2>Frequently Asked Questions About Billing &amp; Delivery</h2>
          <p>Everything you need to know about our milestone model, contracts, IP, and support.</p>
        </div>

        <div class="faq-accordion">
          @for (faq of faqs; track faq.q; let i = $index) {
            <div class="faq-card" [class.is-open]="openFaq === i">
              <button
                type="button"
                class="faq-q-btn"
                (click)="toggleFaq(i)"
                [attr.aria-expanded]="openFaq === i">
                <span>{{ faq.q }}</span>
                <span class="faq-arrow" aria-hidden="true">{{ openFaq === i ? '−' : '+' }}</span>
              </button>
              @if (openFaq === i) {
                <div class="faq-a-body">
                  <p>{{ faq.a }}</p>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Bottom Consultation CTA -->
    <section class="pricing-cta-banner">
      <div class="cta-inner">
        <h2>Not Sure Which Package Best Fits Your Goals?</h2>
        <p>Book a free 30-minute technical discovery call. We review your architecture, discuss trade-offs, and recommend the most cost-effective path forward.</p>
        <div class="cta-actions">
          <a routerLink="/contact" class="button cta-primary">Schedule Free Technical Consultation ↗</a>
          <a [href]="settings.whatsappUrl" target="_blank" rel="noopener noreferrer" class="button cta-wa">
            Chat With Engineering Lead on WhatsApp 💬
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .pricing-hero {
      background: radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.12), transparent 70%), #0f172a;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 4rem 1.5rem 3rem 1.5rem;
      text-align: center;
    }
    .hero-container {
      max-width: 900px;
      margin: 0 auto;
    }
    .pricing-hero h1 {
      font-size: 2.5rem;
      font-weight: 800;
      color: #f8fafc;
      margin: 0.5rem 0 1rem 0;
      line-height: 1.2;
    }
    .hero-intro {
      font-size: 1.12rem;
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .pricing-trust-badges {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .trust-badge {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }
    .badge-num {
      font-size: 1.4rem;
      font-weight: 800;
      color: #38bdf8;
    }
    .badge-label {
      font-size: 0.85rem;
      color: #cbd5e1;
      font-weight: 500;
    }
    .universal-inclusions {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      font-size: 0.88rem;
      color: #e2e8f0;
      margin-bottom: 2rem;
    }
    .inc-title {
      font-weight: 700;
      color: #38bdf8;
    }
    .inc-item {
      color: #94a3b8;
    }
    .currency-toggle-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .currency-label {
      font-size: 0.95rem;
      font-weight: 600;
      color: #cbd5e1;
    }
    .currency-toggle {
      display: inline-flex;
      background: #1e293b;
      padding: 4px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .currency-toggle button {
      background: transparent;
      border: none;
      color: #94a3b8;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .currency-toggle button.active {
      background: #2563eb;
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
    }

    /* Tabs */
    .pricing-tabs-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
    }
    .tabs-nav {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 3rem;
    }
    .tabs-nav button {
      background: #1e293b;
      color: #cbd5e1;
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.75rem 1.5rem;
      border-radius: 30px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .tabs-nav button.active {
      background: #2563eb;
      color: #ffffff;
      border-color: #3b82f6;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
    }
    .pane-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }
    .pane-header h2 {
      font-size: 1.85rem;
      font-weight: 700;
      color: #f8fafc;
      margin-bottom: 0.5rem;
    }
    .pane-header p {
      color: #94a3b8;
      font-size: 1.05rem;
    }

    /* Cards Grid */
    .pricing-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }
    .pricing-card {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 2.2rem;
      position: relative;
      display: flex;
      flex-direction: column;
      transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    }
    .pricing-card:hover {
      transform: translateY(-4px);
      border-color: rgba(56, 189, 248, 0.4);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
    }
    .pricing-card.highlighted {
      border: 2px solid #38bdf8;
      background: linear-gradient(180deg, rgba(30, 41, 59, 1) 0%, rgba(15, 23, 42, 1) 100%);
      box-shadow: 0 8px 24px rgba(56, 189, 248, 0.15);
    }
    .card-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #38bdf8;
      color: #0f172a;
      font-size: 0.75rem;
      font-weight: 800;
      padding: 0.3rem 0.85rem;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .pricing-card h3 {
      font-size: 1.4rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 0.4rem 0;
    }
    .tier-subtitle {
      font-size: 0.9rem;
      color: #94a3b8;
      min-height: 2.6rem;
      margin-bottom: 1.2rem;
      line-height: 1.4;
    }
    .price-box {
      display: flex;
      align-items: baseline;
      gap: 0.4rem;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .price-from {
      font-size: 0.9rem;
      color: #94a3b8;
    }
    .price-val {
      font-size: 2.2rem;
      font-weight: 800;
      color: #38bdf8;
    }
    .price-period {
      font-size: 0.88rem;
      color: #94a3b8;
    }
    .tier-desc {
      font-size: 0.95rem;
      color: #cbd5e1;
      line-height: 1.5;
      margin-bottom: 1.5rem;
      min-height: 52px;
    }
    .card-actions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }
    .plan-cta {
      display: block;
      text-align: center;
      padding: 0.8rem 1.25rem;
      font-weight: 700;
      font-size: 0.95rem;
      border-radius: 8px;
    }
    .wa-sub-btn {
      display: block;
      text-align: center;
      background: rgba(22, 163, 74, 0.15);
      color: #4ade80 !important;
      border: 1px solid rgba(34, 197, 94, 0.3);
      padding: 0.65rem 1rem;
      border-radius: 8px;
      font-size: 0.88rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .wa-sub-btn:hover {
      background: #16a34a;
      color: #ffffff !important;
    }
    .features-list {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1.2rem;
      flex-grow: 1;
    }
    .features-label {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
      display: block;
      margin-bottom: 0.8rem;
    }
    .features-list ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .check-item {
      font-size: 0.9rem;
      color: #e2e8f0;
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      line-height: 1.4;
    }
    .check-item .icon {
      color: #38bdf8;
      font-weight: 800;
      flex-shrink: 0;
    }
    .cross-item {
      font-size: 0.9rem;
      color: #64748b;
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      line-height: 1.4;
      text-decoration: line-through;
    }
    .cross-item .icon {
      color: #ef4444;
      font-weight: 800;
      flex-shrink: 0;
    }

    /* Estimator Wrap */
    .pricing-estimator-wrap {
      background: #0f172a;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 4rem 1.5rem;
    }
    .estimator-header {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 2.5rem auto;
    }
    .estimator-header h2 {
      font-size: 2rem;
      font-weight: 800;
      color: #f8fafc;
      margin-bottom: 0.5rem;
    }
    .estimator-header p {
      color: #94a3b8;
      font-size: 1.05rem;
    }

    /* FAQs */
    .pricing-faq-section {
      padding: 4rem 1.5rem;
      background: #0b1120;
    }
    .faq-container {
      max-width: 850px;
      margin: 0 auto;
    }
    .faq-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .faq-header h2 {
      font-size: 2rem;
      font-weight: 800;
      color: #f8fafc;
      margin-bottom: 0.5rem;
    }
    .faq-header p {
      color: #94a3b8;
    }
    .faq-accordion {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .faq-card {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      overflow: hidden;
      transition: border-color 0.2s ease;
    }
    .faq-card.is-open {
      border-color: rgba(56, 189, 248, 0.4);
    }
    .faq-q-btn {
      width: 100%;
      text-align: left;
      background: transparent;
      border: none;
      padding: 1.25rem 1.5rem;
      font-size: 1.05rem;
      font-weight: 600;
      color: #f8fafc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    .faq-arrow {
      font-size: 1.4rem;
      color: #38bdf8;
      font-weight: 700;
    }
    .faq-a-body {
      padding: 0 1.5rem 1.25rem 1.5rem;
      color: #cbd5e1;
      font-size: 0.95rem;
      line-height: 1.6;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 1rem;
    }

    /* Consultation Banner */
    .pricing-cta-banner {
      background: linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%);
      padding: 4rem 1.5rem;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    .cta-inner {
      max-width: 800px;
      margin: 0 auto;
    }
    .cta-inner h2 {
      font-size: 2.2rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 1rem;
    }
    .cta-inner p {
      color: #cbd5e1;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .cta-actions {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .cta-primary {
      padding: 0.9rem 1.8rem;
      font-size: 1rem;
      font-weight: 700;
    }
    .cta-wa {
      background: #16a34a !important;
      color: #ffffff !important;
      padding: 0.9rem 1.8rem;
      font-size: 1rem;
      font-weight: 700;
    }
    .cta-wa:hover {
      background: #15803d !important;
    }

    @media (max-width: 768px) {
      .pricing-hero h1 { font-size: 2rem; }
      .pricing-trust-badges { grid-template-columns: 1fr 1fr; }
      .universal-inclusions { flex-direction: column; align-items: flex-start; }
      .pricing-cards-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class PricingComponent {
  readonly settings = inject(SiteSettingsService);

  currency: 'INR' | 'USD' = 'INR';
  activeTab: 'web' | 'software' | 'app' | 'retainers' = 'web';
  openFaq: number | null = 0;

  toggleFaq(index: number): void {
    this.openFaq = this.openFaq === index ? null : index;
  }

  getPlanWhatsApp(planName: string): string {
    const encoded = encodeURIComponent(`Hi, I am interested in the "${planName}" package on your website. Could you please share a detailed scope breakdown and timeline?`);
    return `https://wa.me/917013631398?text=${encoded}`;
  }

  readonly webTiers: PricingTier[] = [
    {
      id: 'web-starter',
      name: 'Starter Website',
      subtitle: 'For solo professionals, local services & early-stage startup launches.',
      priceInr: '₹25,000',
      priceUsd: '$350',
      period: 'one-time',
      description: 'Clean responsive web presence with rapid delivery, contact lead capture, and search engine foundations.',
      features: [
        '4–6 high-converting responsive pages',
        'Custom brand styling & layout',
        'Direct inquiry form + WhatsApp click-to-chat',
        'Google Maps & business profile integration',
        'Core on-page SEO & OpenGraph metadata',
        'Fast SSL hosting configuration',
        '1 round of structured revisions'
      ],
      exclusions: [
        'Custom SaaS multi-tenancy',
        'Complex third-party API orchestration'
      ]
    },
    {
      id: 'web-growth',
      badge: 'Most Popular',
      recommended: true,
      name: 'Growth Website (CMS)',
      subtitle: 'For service SMBs, clinics, agencies & high-growth brands.',
      priceInr: '₹35,000',
      priceUsd: '$500',
      period: 'one-time',
      description: 'Comprehensive content-managed website with blog capabilities, lead generation funnels, and speed optimization.',
      features: [
        '8–15 custom designed responsive pages',
        'Headless or custom CMS for self-serve updates',
        'Lead capture funnels & event tracking (Meta / GA4)',
        'Blog / article publishing engine',
        'Advanced technical SEO & schema markup',
        'Security hardening & Lighthouse speed audit (95+ score)',
        '3 months free technical support & warranty',
        '2–3 iterative review cycles'
      ]
    },
    {
      id: 'web-premium',
      name: 'Premium Custom Web App',
      subtitle: 'For established brands requiring custom UX and backend integrations.',
      priceInr: '₹80,000',
      priceUsd: '$1,100',
      period: 'one-time',
      description: 'Bespoke Angular frontend application connected to robust backend endpoints, custom interactive calculators, and CRM pipelines.',
      features: [
        '15+ custom application pages & flows',
        'Standalone Angular 22 architecture',
        'CRM, payment gateway & email webhook integrations',
        'Role-based access & customer account portals',
        'Automated CI/CD deployment (AWS / DigitalOcean)',
        '6 months enterprise support SLA',
        'Single senior tech lead dedicated start to finish'
      ]
    }
  ];

  readonly softwareTiers: PricingTier[] = [
    {
      id: 'sw-mvp',
      name: 'MVP Launchpad',
      subtitle: 'For founders launching a validated product to early adopters.',
      priceInr: '₹1,50,000',
      priceUsd: '$2,000',
      period: 'one-time',
      description: 'Full-stack software product with rock-solid Spring Boot architecture, PostgreSQL persistence, and modern responsive UI.',
      features: [
        'Core user workflow & transactional database model',
        'Spring Boot 4 / Java 21 REST API endpoints',
        'Authentication & role-based access (JWT/Sessions)',
        'PostgreSQL with automated Flyway database migrations',
        'Angular web dashboard for administrative controls',
        '100% full source code ownership on completion',
        '30-day post-launch warranty & bug-fix SLA'
      ],
      exclusions: [
        'Custom multi-tenant isolated schemas',
        'Hardware IoT / barcode physical scanners'
      ]
    },
    {
      id: 'sw-saas',
      badge: 'High Value',
      recommended: true,
      name: 'Multi-Tenant SaaS Platform',
      subtitle: 'For SaaS businesses building recurring subscription software.',
      priceInr: '₹3,50,000',
      priceUsd: '$4,500',
      period: 'one-time',
      description: 'Enterprise multi-tenant product with billing integration, tenant isolation, team permissions, and analytics.',
      features: [
        'Strict tenant-isolated data partitioning',
        'Subscription tier billing (Stripe / Razorpay / UPI)',
        'Multi-seat user management & audit logs',
        'Transactional email & notification dispatchers',
        'Comprehensive super-admin operational console',
        'Docker containerization & cloud infrastructure setup',
        'Interactive project documentation & OpenAPI specs',
        '3 months dedicated maintenance & SLA support'
      ]
    },
    {
      id: 'sw-erp',
      name: 'Enterprise Custom ERP & Systems',
      subtitle: 'For manufacturing, retail chains, and logistics operations.',
      priceInr: '₹8,00,000',
      priceUsd: '$10,000',
      period: 'one-time',
      description: 'Mission-critical business software replacing legacy systems with real-time inventory, barcode POS, and reporting.',
      features: [
        'End-to-end custom business process modeling',
        'Physical barcode & ESC/POS receipt printer hardware support',
        'Real-time inventory ledger & stock movement tracking',
        'GST invoice generation & ledger reconciliation',
        'High-availability clustering & automated backup routines',
        'On-premise or hybrid cloud deployment',
        '6 months 24/7 incident response SLA'
      ]
    }
  ];

  readonly appTiers: PricingTier[] = [
    {
      id: 'app-mvp',
      name: 'Essential App (MVP)',
      subtitle: 'For startups validating mobile ideas on Android and iOS.',
      priceInr: '₹3,00,000',
      priceUsd: '$3,800',
      period: 'one-time',
      description: 'Cross-platform Flutter mobile application with core user authentication and cloud backend synchronization.',
      features: [
        '5–8 core user journey screens',
        'Single codebase for Android & iOS (Flutter)',
        'Firebase / Spring Boot backend integration',
        'User authentication & profile management',
        'Push notifications setup',
        'Google Play Store & Apple App Store submission assistance',
        '1–2 structured iteration rounds'
      ],
      exclusions: [
        'Complex offline data synchronization',
        'Custom payment gateway & wallet routing'
      ]
    },
    {
      id: 'app-business',
      badge: 'Most Popular',
      recommended: true,
      name: 'Business Mobile App',
      subtitle: 'For growing brands needing customer-facing booking or sales.',
      priceInr: '₹4,00,000',
      priceUsd: '$5,000',
      period: 'one-time',
      description: 'Full-featured customer application with real-time mapping, payment gateways, and accompanying web management console.',
      features: [
        '8–15 intuitive custom mobile screens',
        'Android & iOS native performance via Flutter',
        'Payment gateway integration (Razorpay / Stripe / UPI)',
        'GPS live location & interactive Google Maps integration',
        'Web admin portal for operational management',
        'Push notifications with customer segmentation',
        'In-app analytics & conversion tracking',
        '3 months post-launch technical warranty'
      ]
    },
    {
      id: 'app-enterprise',
      name: 'Advanced Enterprise App',
      subtitle: 'For scaled startups and field service fleets.',
      priceInr: '₹12,00,000',
      priceUsd: '$15,000',
      period: 'one-time',
      description: 'High-concurrency mobile ecosystem with offline-first caching, background location sync, and enterprise security.',
      features: [
        'Multi-platform deployment (Android, iOS, Web)',
        'Offline-first SQLite local caching & automatic sync',
        'Complex role-based access & security policies',
        'Integration with enterprise ERP / CRM backends',
        'Advanced performance profiling & automated CI/CD',
        'Dedicated senior mobile engineering lead',
        '6 months priority enterprise support SLA'
      ]
    }
  ];

  readonly retainerTiers: PricingTier[] = [
    {
      id: 'ret-devops',
      name: 'Cloud & DevOps SLA Retainer',
      subtitle: 'For teams that need 99.9% uptime, backup audits, and security updates.',
      priceInr: '₹35,000',
      priceUsd: '$450',
      period: '/ month',
      description: 'Proactive server management, automated vulnerability scanning, SSL rotations, and database backups.',
      features: [
        'Continuous uptime monitoring with 30-min incident alerts',
        'Automated daily database backups with verified restore drills',
        'Docker container & Kubernetes pod maintenance',
        'OS security patch application & SSL certificate renewal',
        'Monthly infrastructure cost optimization review',
        'Up to 15 hours of on-demand DevOps tasks included'
      ]
    },
    {
      id: 'ret-growth',
      badge: 'Best Value',
      recommended: true,
      name: 'Growth SEO & Technical Retainer',
      subtitle: 'For businesses wanting consistent inbound leads and ranking gains.',
      priceInr: '₹40,000',
      priceUsd: '$500',
      period: '/ month',
      description: 'Data-driven technical SEO, landing page conversion optimization, and core web vitals maintenance.',
      features: [
        'Targeted SEO keyword ranking tracking (up to 25 keywords)',
        'Technical crawl audit & broken link resolution',
        'Landing page CRO experiments & A/B testing',
        'High-intent content strategy & publishing guidance',
        'Fortnightly executive performance reports',
        'Direct Slack / WhatsApp channel with growth strategist'
      ]
    },
    {
      id: 'ret-pod',
      name: 'Dedicated Full-Stack Sprint Pod',
      subtitle: 'For funded companies needing ongoing velocity without hiring friction.',
      priceInr: '₹1,50,000',
      priceUsd: '$1,900',
      period: '/ month',
      description: 'Senior full-stack Java/Angular engineer working directly as an extension of your product team in bi-weekly sprints.',
      features: [
        '1 dedicated Senior Full-Stack Engineer (Spring Boot + Angular)',
        'Bi-weekly production sprint releases',
        'Daily standup attendance & direct Slack/Teams collaboration',
        'Continuous code reviews & architectural guidance',
        'Zero long-term lock-in (month-to-month flexibility)',
        '100% full IP assignment upon monthly billing'
      ]
    }
  ];

  readonly faqs = [
    {
      q: 'How does your 40/40/20 milestone billing model work?',
      a: 'We believe you should only pay for work you can verify. Projects are structured around 3 transparent milestones: 40% initial commitment at kick-off, 40% upon completion and demonstration of the core functional features on our staging environment, and the final 20% only when the software is fully deployed, tested, and handed over to you. For larger enterprise builds, we break payments into even smaller sprint-based tranches.'
    },
    {
      q: 'Are there any hidden costs after the quote is signed?',
      a: 'No, absolutely none. Our quotes are fixed and all-inclusive for the agreed scope of design, architecture, engineering, and testing. Third-party infrastructure costs—such as your cloud host (AWS/GCP), custom domain names, or payment gateway merchant transaction fees—are owned directly by you and billed at cost with complete transparency.'
    },
    {
      q: 'Can we start with an MVP Launchpad and expand later?',
      a: 'Yes, this is our most recommended approach for startups and growing businesses. We architect systems with clean modularity (Spring Boot REST microservices and Angular components) and document database schemas with Flyway migrations. This ensures your MVP can seamlessly scale into an enterprise-grade platform without having to rewrite code from scratch.'
    },
    {
      q: 'Do you provide formal contracts, GST invoices, and NDAs?',
      a: 'Yes to all three. Prior to any confidential discussions or code sharing, we execute a mutual Non-Disclosure Agreement (NDA). Every project begins with a legally binding Master Services Agreement (MSA) and Statement of Work (SOW) defining scope, timelines, and deliverables. We provide formal GST tax invoices with every milestone.'
    },
    {
      q: 'What happens if we want to change or add features mid-project?',
      a: 'Minor adjustments that fall within the scope are absorbed seamlessly. If you decide to add substantial new modules or third-party integrations, we discuss the impact openly and document a formal Change Order with a fixed timeline and cost adjustment. You retain complete control over what gets built and when.'
    },
    {
      q: 'Do you offer flexible payment plans for large enterprise projects?',
      a: 'Yes. For projects exceeding ₹5,00,000 (or $6,000 USD), we provide customized milestone schedules aligned with your sprint delivery cycles and cash flow. Contact us to discuss flexible payment schedules.'
    }
  ];
}
