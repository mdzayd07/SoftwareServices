import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteSettingsService } from './site-settings.service';
import { caseStudyDrafts, CaseStudyDraft } from './content-drafts';

@Component({
  selector: 'site-portfolio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Portfolio Hero -->
    <section class="portfolio-hero">
      <div class="hero-container">
        <p class="eyebrow">OUR PRODUCTION WORKS · REAL CASE STUDIES</p>
        <h1>Software Engineered to Solve Real Business Bottlenecks.</h1>
        <p class="hero-intro">
          Explore production systems we have architected and deployed: multi-tenant SaaS products, barcode inventory systems, high-volume banking portals, and mobile field apps. Every project is backed by our 40/40/20 milestone billing and 100% source code handover.
        </p>

        <!-- Metrics Strip -->
        <div class="portfolio-metrics-grid">
          <div class="metric-card">
            <span class="metric-val">100%</span>
            <span class="metric-sub">Source Code Handover</span>
          </div>
          <div class="metric-card">
            <span class="metric-val">40/40/20</span>
            <span class="metric-sub">Milestone Billing</span>
          </div>
          <div class="metric-card">
            <span class="metric-val">99.9%</span>
            <span class="metric-sub">Production Uptime</span>
          </div>
          <div class="metric-card">
            <span class="metric-val">&lt;24h</span>
            <span class="metric-sub">Direct Engineer SLA</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Comparison Matrix Section -->
    <section class="why-choose-section">
      <div class="why-choose-container">
        <div class="section-heading text-center">
          <p class="eyebrow">THE NORTHLINE ADVANTAGE</p>
          <h2>Why Clients Choose Us Over Freelancers and Big Agencies</h2>
          <p>We eliminate agency markups, bait-and-switch staffing, and code ownership traps.</p>
        </div>

        <div class="comparison-table-wrapper">
          <table class="comparison-table" role="table">
            <thead>
              <tr>
                <th scope="col" class="comp-col-feature">What Matters to You</th>
                <th scope="col" class="comp-col-other">Freelancers</th>
                <th scope="col" class="comp-col-other">Traditional Big Agencies</th>
                <th scope="col" class="comp-col-us highlight-head">⭐ Northline Software</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="feature-title">
                  <strong>Engineering Team</strong>
                  <small>Who actually writes and reviews your code?</small>
                </td>
                <td class="other-cell">Single person; unpredictable quality and availability.</td>
                <td class="other-cell">Senior sales pitches, but junior interns build the product behind the scenes.</td>
                <td class="us-cell">
                  <strong>Senior Full-Stack Engineers Only</strong>
                  <small>Hands-on Java 21 &amp; Angular 22 architects start to finish.</small>
                </td>
              </tr>
              <tr>
                <td class="feature-title">
                  <strong>Source Code &amp; IP Ownership</strong>
                  <small>Do you own 100% of the repository and database?</small>
                </td>
                <td class="other-cell">Disputed ownership or messy unversioned zip archives.</td>
                <td class="other-cell">Proprietary licensing lock-in or expensive buyout fees.</td>
                <td class="us-cell">
                  <strong>100% Code Handover on Delivery</strong>
                  <small>Full Git history, Dockerfiles, and Flyway migrations belong to you.</small>
                </td>
              </tr>
              <tr>
                <td class="feature-title">
                  <strong>Payment &amp; Financial Risk</strong>
                  <small>How is your budget protected against failure?</small>
                </td>
                <td class="other-cell">Heavy upfront deposits with no refund mechanism.</td>
                <td class="other-cell">Fixed monthly billings regardless of sprint velocity.</td>
                <td class="us-cell">
                  <strong>40 / 40 / 20 Milestone Billing</strong>
                  <small>Pay only after reviewing working software on your staging server.</small>
                </td>
              </tr>
              <tr>
                <td class="feature-title">
                  <strong>Hardware &amp; Device Integration</strong>
                  <small>Can they integrate physical POS and scanners?</small>
                </td>
                <td class="other-cell">Web-only; no experience with physical peripherals.</td>
                <td class="other-cell">High billable rates for custom device integration.</td>
                <td class="us-cell">
                  <strong>Deep Hardware POS &amp; Barcode Mastery</strong>
                  <small>Proven integration with Zebra scanners, thermal ESC/POS printers, and IoT.</small>
                </td>
              </tr>
              <tr>
                <td class="feature-title">
                  <strong>Confidentiality &amp; Legal Protection</strong>
                  <small>Is your proprietary business logic safe?</small>
                </td>
                <td class="other-cell">Informal promises; rarely legally enforceable.</td>
                <td class="other-cell">Bureaucratic legal reviews taking weeks to execute.</td>
                <td class="us-cell">
                  <strong>Mutual NDA Signed on Day 1</strong>
                  <small>Full confidentiality executed before sharing detailed specs.</small>
                </td>
              </tr>
              <tr>
                <td class="feature-title">
                  <strong>Post-Launch Technical Support</strong>
                  <small>What happens when a critical issue arises?</small>
                </td>
                <td class="other-cell">Often disappears after final payment is made.</td>
                <td class="other-cell">Tier-1 ticketing queues with 48–72 hour delays.</td>
                <td class="us-cell">
                  <strong>30-Day Warranty + Direct WhatsApp Access</strong>
                  <small>Immediate bug resolution and direct contact with your tech lead.</small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Case Studies Filter & Showcase Section -->
    <section class="portfolio-showcase-section">
      <div class="showcase-container">
        <div class="section-heading text-center">
          <p class="eyebrow">PORTFOLIO HIGHLIGHTS</p>
          <h2>Featured Systems Delivered &amp; In Production</h2>
          <p>Real challenges, tailored technical architectures, and proven operational results.</p>
        </div>

        <!-- Filter Pills with Counts -->
        <div class="portfolio-filter-pills" role="tablist" aria-label="Project categories">
          <button
            type="button"
            [class.active]="selectedCategory === 'all'"
            (click)="selectedCategory = 'all'">
            All Systems <span class="pill-count">{{ caseStudies.length }}</span>
          </button>
          <button
            type="button"
            [class.active]="selectedCategory === 'saas'"
            (click)="selectedCategory = 'saas'">
            SaaS &amp; Cloud <span class="pill-count">2</span>
          </button>
          <button
            type="button"
            [class.active]="selectedCategory === 'pos'"
            (click)="selectedCategory = 'pos'">
            Barcode &amp; POS <span class="pill-count">1</span>
          </button>
          <button
            type="button"
            [class.active]="selectedCategory === 'fintech'"
            (click)="selectedCategory = 'fintech'">
            Fintech &amp; Banking <span class="pill-count">1</span>
          </button>
          <button
            type="button"
            [class.active]="selectedCategory === 'mobile'"
            (click)="selectedCategory = 'mobile'">
            Mobile Apps <span class="pill-count">1</span>
          </button>
          <button
            type="button"
            [class.active]="selectedCategory === 'custom'"
            (click)="selectedCategory = 'custom'">
            Enterprise ERP <span class="pill-count">1</span>
          </button>
        </div>

        <!-- Case Studies List -->
        <div class="case-studies-cards-list">
          @for (study of filteredStudies; track study.slug) {
            <article class="case-study-showcase-card">
              <div class="card-top-stripe"></div>
              
              <!-- Micro-UI Visual Preview (~140-160px Tall Realistic Status Box) -->
              <div class="card-micro-preview" [ngSwitch]="study.slug">
                
                <!-- 1. Restaurant POS SaaS -->
                <div *ngSwitchCase="'restaurant-pos-saas'" class="micro-preview-inner pos-preview">
                  <div class="micro-top-bar">
                    <span class="micro-sys-title"><span class="dot-live"></span> Live KDS &amp; Table Dispatch Console</span>
                    <span class="micro-chip chip-green">ESC/POS Thermal: Connected ✓</span>
                  </div>
                  <div class="micro-grid-2x2">
                    <div class="micro-stat-pill pill-amber">
                      <span class="pill-head">Table 01 · Dine-In</span>
                      <strong>₹2,480 <span class="tag-sub">(3 Items · KOT Sent)</span></strong>
                    </div>
                    <div class="micro-stat-pill pill-green">
                      <span class="pill-head">Table 02 · Takeaway</span>
                      <strong>₹650 <span class="tag-sub">(UPI Paid ✓ · Ready)</span></strong>
                    </div>
                    <div class="micro-stat-pill pill-blue">
                      <span class="pill-head">Table 03 · 4 Pax</span>
                      <strong>Occupied <span class="tag-sub">(Kitchen Prep ⏱️ 6m)</span></strong>
                    </div>
                    <div class="micro-stat-pill pill-slate">
                      <span class="pill-head">Table 04</span>
                      <strong>Available <span class="tag-sub">(Billed &amp; Sanitized ✓)</span></strong>
                    </div>
                  </div>
                </div>

                <!-- 2. Logistics & Warehouse Barcode -->
                <div *ngSwitchCase="'logistics-inventory-system'" class="micro-preview-inner warehouse-preview">
                  <div class="micro-top-bar">
                    <span class="micro-sys-title"><span class="dot-live"></span> Zebra HID USB Scanner Engine</span>
                    <span class="micro-chip chip-cyan">Port: COM-3 · 50ms Latency</span>
                  </div>
                  <div class="micro-scanner-row">
                    <div class="scanner-stream">
                      <span class="barcode-graphic">||| | |||| | ||| |||| |</span>
                      <code>SKU-9824-TX01</code>
                      <span class="scan-badge">Scan Verified ✓</span>
                    </div>
                  </div>
                  <div class="micro-grid-2x2">
                    <div class="micro-stat-pill pill-slate">
                      <span class="pill-head">Storage Location</span>
                      <strong>Rack B-12 <span class="tag-sub">(Hub 04 · Hyderabad)</span></strong>
                    </div>
                    <div class="micro-stat-pill pill-green">
                      <span class="pill-head">Stock Audit</span>
                      <strong>420 Units <span class="tag-sub">(99.8% Match ✓)</span></strong>
                    </div>
                  </div>
                </div>

                <!-- 3. Fintech Core Banking Reconciliation -->
                <div *ngSwitchCase="'fintech-reconciliation-portal'" class="micro-preview-inner fintech-preview">
                  <div class="micro-top-bar">
                    <span class="micro-sys-title"><span class="dot-live"></span> Batch Clearing &amp; Ledger Reconciliation</span>
                    <span class="micro-chip chip-green">1,240,000 Txns Balanced ✓</span>
                  </div>
                  <div class="micro-progress-container">
                    <div class="progress-labels">
                      <span>Batch #89201 · Spring Concurrency (42m elapsed)</span>
                      <strong>100% Reconciled</strong>
                    </div>
                    <div class="micro-progress-bar"><div class="bar-fill" style="width: 100%;"></div></div>
                  </div>
                  <div class="micro-chips-row">
                    <span class="status-chip chip-green">UPI: 0 Errors</span>
                    <span class="status-chip chip-green">NEFT/IMPS: Cleared</span>
                    <span class="status-chip chip-blue">Audit Hash: Verified 🔒</span>
                  </div>
                </div>

                <!-- 4. Field Service Mobile Portal -->
                <div *ngSwitchCase="'field-service-app'" class="micro-preview-inner mobile-preview">
                  <div class="micro-top-bar">
                    <span class="micro-sys-title"><span class="dot-live"></span> Offline-First Technician Dispatch</span>
                    <span class="micro-chip chip-amber">IndexedDB: 12 Actions Queued</span>
                  </div>
                  <div class="micro-grid-2x2">
                    <div class="micro-stat-pill pill-blue">
                      <span class="pill-head">Active Ticket</span>
                      <strong>WO-4412 <span class="tag-sub">(High Priority Transformer)</span></strong>
                    </div>
                    <div class="micro-stat-pill pill-green">
                      <span class="pill-head">Agent Status</span>
                      <strong>En Route 🛵 <span class="tag-sub">(2.4 km ETA 8m)</span></strong>
                    </div>
                    <div class="micro-stat-pill pill-slate">
                      <span class="pill-head">Client Sig</span>
                      <strong>Captured ✍️ <span class="tag-sub">(Geo-Stamped)</span></strong>
                    </div>
                    <div class="micro-stat-pill pill-green">
                      <span class="pill-head">Network Drop</span>
                      <strong>Auto-Retry Active ✓ <span class="tag-sub">(Zero Data Loss)</span></strong>
                    </div>
                  </div>
                </div>

                <!-- 5. B2B SaaS Procurement & Tender Platform -->
                <div *ngSwitchCase="'b2b-saas-procurement'" class="micro-preview-inner saas-preview">
                  <div class="micro-top-bar">
                    <span class="micro-sys-title"><span class="dot-live"></span> Multi-Tenant Reverse Tender Engine</span>
                    <span class="micro-chip chip-purple">Tenant: Acme Industrial Group</span>
                  </div>
                  <div class="micro-grid-2x2">
                    <div class="micro-stat-pill pill-slate">
                      <span class="pill-head">RFP Identifier</span>
                      <strong>RFQ-2026-08 <span class="tag-sub">(Valves &amp; Flanges)</span></strong>
                    </div>
                    <div class="micro-stat-pill pill-green">
                      <span class="pill-head">Verified Bids</span>
                      <strong>3 Received <span class="tag-sub">(L1 Quote: ₹4.20L)</span></strong>
                    </div>
                    <div class="micro-stat-pill pill-blue">
                      <span class="pill-head">Savings</span>
                      <strong>18.4% Below Cap <span class="tag-sub">(₹94,000 Saved)</span></strong>
                    </div>
                    <div class="micro-stat-pill pill-amber">
                      <span class="pill-head">Evaluation</span>
                      <strong>Auto-Scored ✓ <span class="tag-sub">(PO Ready)</span></strong>
                    </div>
                  </div>
                </div>

                <!-- 6. Textile Manufacturing ERP -->
                <div *ngSwitchCase="'textile-erp-manufacturing'" class="micro-preview-inner erp-preview">
                  <div class="micro-top-bar">
                    <span class="micro-sys-title"><span class="dot-live"></span> Loom Batch Production Scheduler</span>
                    <span class="micro-chip chip-green">Flyway DB v2 · Unit 02 Live</span>
                  </div>
                  <div class="micro-progress-container">
                    <div class="progress-labels">
                      <span>Batch #TX-901 · 2,400 Metres Organic Cotton</span>
                      <strong>94% Woven</strong>
                    </div>
                    <div class="micro-progress-bar"><div class="bar-fill" style="width: 94%;"></div></div>
                  </div>
                  <div class="micro-chips-row">
                    <span class="status-chip chip-green">Loom Line: 12 Active</span>
                    <span class="status-chip chip-amber">Dyeing Stage: Scheduled 🧪</span>
                    <span class="status-chip chip-green">Quality: 99.2% Grade-A ✓</span>
                  </div>
                </div>
              </div>
              
              <div class="card-main-content">
                <div class="card-header-row">
                  <div class="header-tags">
                    <span class="industry-badge">{{ study.industry }}</span>
                    <span class="client-badge">{{ study.clientType }}</span>
                  </div>
                  <div class="metric-callout">
                    <span class="metric-spark">⚡</span>
                    <strong>{{ study.metric }}</strong>
                  </div>
                </div>

                <h3 class="study-title">{{ study.title }}</h3>
                <p class="study-summary">{{ study.summary }}</p>

                <!-- Problem / Solution Dual Grid -->
                <div class="problem-solution-grid">
                  <div class="ps-box problem-box">
                    <span class="ps-label">The Challenge</span>
                    <p>{{ study.problem }}</p>
                  </div>
                  <div class="ps-box solution-box">
                    <span class="ps-label">Our Solution</span>
                    <p>{{ study.solution }}</p>
                  </div>
                </div>

                <!-- Measurable Outcomes -->
                <div class="outcomes-section">
                  <span class="section-mini-title">Key Measurable Outcomes:</span>
                  <ul class="outcomes-list">
                    @for (outcome of study.keyOutcomes; track outcome) {
                      <li><span class="chk">✓</span> {{ outcome }}</li>
                    }
                  </ul>
                </div>

                <!-- Client Testimonial (if present) -->
                @if (study.quote) {
                  <div class="client-quote-box">
                    <p class="quote-text">“{{ study.quote.text }}”</p>
                    <div class="quote-author">
                      <strong>{{ study.quote.author }}</strong> · <span>{{ study.quote.designation }}</span>
                    </div>
                  </div>
                }

                <!-- Tech Stack Tags & Actions -->
                <div class="card-footer-row">
                  <div class="tech-stack-pills">
                    @for (t of study.stack; track t) {
                      <span class="tech-pill">{{ t }}</span>
                    }
                  </div>

                  <div class="split-card-footer">
                    <a
                      [routerLink]="['/contact']"
                      [queryParams]="{ service: study.slug }"
                      class="button build-similar-btn">
                      Build a System Like This ↗
                    </a>
                    <a
                      [href]="getStudyWhatsApp(study.title)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="secondary-chat-btn">
                      Discuss on WhatsApp 💬
                    </a>
                  </div>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Bottom Consultation CTA -->
    <section class="portfolio-cta-banner">
      <div class="cta-inner">
        <h2>Have a Similar Software or Product Challenge?</h2>
        <p>Book a free 30-minute technical roadmap call. We’ll review your existing operational workflows or PRD, suggest architecture improvements, and provide a fixed milestone estimate.</p>
        <div class="cta-actions">
          <a routerLink="/contact" class="button cta-primary">Schedule Free Technical Consultation ↗</a>
          <a [href]="settings.whatsappUrl" target="_blank" rel="noopener noreferrer" class="button cta-wa">
            Chat on WhatsApp With Engineering Lead 💬
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .portfolio-hero {
      background: radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.15), transparent 70%), #0f172a;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 4rem 1.5rem 3.5rem 1.5rem;
      text-align: center;
    }
    .hero-container {
      max-width: 900px;
      margin: 0 auto;
    }
    .portfolio-hero h1 {
      font-size: 2.5rem;
      font-weight: 800;
      color: #f8fafc;
      margin: 0.5rem 0 1rem 0;
      line-height: 1.25;
    }
    .hero-intro {
      font-size: 1.12rem;
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 2.5rem;
    }
    .portfolio-metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.25rem;
    }
    .metric-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 1.25rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;
    }
    .metric-val {
      font-size: 1.8rem;
      font-weight: 800;
      color: #38bdf8;
    }
    .metric-sub {
      font-size: 0.85rem;
      color: #cbd5e1;
      font-weight: 500;
    }

    /* Why Choose Us Section */
    .why-choose-section {
      background: #0b1120;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 4.5rem 1.5rem;
    }
    .why-choose-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .text-center {
      text-align: center;
      margin-bottom: 3rem;
    }
    .text-center h2 {
      font-size: 2.2rem;
      font-weight: 800;
      color: #f8fafc;
      margin-bottom: 0.5rem;
    }
    .text-center p {
      color: #94a3b8;
      font-size: 1.1rem;
    }
    .comparison-table-wrapper {
      overflow-x: auto;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      background: #0f172a;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
    }
    .comparison-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.95rem;
    }
    .comparison-table th {
      padding: 1.25rem 1.5rem;
      background: #1e293b;
      font-size: 0.95rem;
      font-weight: 700;
      color: #cbd5e1;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .highlight-head {
      background: #1e3a8a !important;
      color: #38bdf8 !important;
      font-weight: 800;
    }
    .comparison-table td {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      vertical-align: top;
      line-height: 1.5;
    }
    .feature-title strong {
      display: block;
      color: #f8fafc;
      font-size: 1rem;
      margin-bottom: 0.2rem;
    }
    .feature-title small {
      color: #94a3b8;
      font-size: 0.82rem;
    }
    .other-cell {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    .us-cell {
      background: rgba(30, 58, 138, 0.25);
      border-left: 2px solid #3b82f6;
      border-right: 2px solid #3b82f6;
      color: #f1f5f9;
    }
    .us-cell strong {
      display: block;
      color: #38bdf8;
      font-weight: 700;
      margin-bottom: 0.2rem;
    }
    .us-cell small {
      color: #cbd5e1;
      font-size: 0.85rem;
    }

    /* Showcase Section */
    .portfolio-showcase-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4.5rem 1.5rem;
    }
    /* Filter Pills with Counts matching tech2software styling */
    .portfolio-filter-pills {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.65rem;
      margin-bottom: 3rem;
    }
    .portfolio-filter-pills button {
      background: #0f172a;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.55rem 1.15rem;
      border-radius: 9999px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .portfolio-filter-pills button:hover {
      color: #ffffff;
      border-color: rgba(56, 189, 248, 0.4);
      background: rgba(30, 41, 59, 0.8);
    }
    .portfolio-filter-pills button.active {
      background: #1d70f5;
      color: #ffffff;
      border-color: #1d70f5;
      box-shadow: 0 4px 14px rgba(29, 112, 245, 0.35);
    }
    .pill-count {
      background: rgba(255, 255, 255, 0.15);
      font-size: 0.72rem;
      font-weight: 800;
      padding: 1px 7px;
      border-radius: 9999px;
    }
    .portfolio-filter-pills button.active .pill-count {
      background: rgba(255, 255, 255, 0.25);
      color: #ffffff;
    }

    .case-studies-cards-list {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    .case-study-showcase-card {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .case-study-showcase-card:hover {
      border-color: rgba(56, 189, 248, 0.4);
      transform: translateY(-2px);
    }
    .card-top-stripe {
      height: 4px;
      background: linear-gradient(90deg, #3b82f6, #38bdf8, #10b981);
    }

    /* Micro-UI Visual Previews (~140-160px Tall Realistic Status Box) */
    .card-micro-preview {
      background: #090e17;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 1.15rem 1.5rem;
      min-height: 145px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .micro-preview-inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }
    .micro-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .micro-sys-title {
      font-size: 0.78rem;
      font-weight: 700;
      color: #94a3b8;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .dot-live {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
      animation: pulse-glow 2s infinite ease-in-out;
    }
    .micro-chip {
      font-size: 0.74rem;
      font-weight: 700;
      padding: 2px 10px;
      border-radius: 9999px;
      border: 1px solid transparent;
    }
    .chip-green {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border-color: rgba(16, 185, 129, 0.3);
    }
    .chip-cyan {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border-color: rgba(56, 189, 248, 0.3);
    }
    .chip-amber {
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
      border-color: rgba(245, 158, 11, 0.3);
    }
    .chip-purple {
      background: rgba(168, 85, 247, 0.15);
      color: #d8b4fe;
      border-color: rgba(168, 85, 247, 0.3);
    }
    .chip-blue {
      background: rgba(37, 99, 235, 0.15);
      color: #93c5fd;
      border-color: rgba(37, 99, 235, 0.3);
    }
    .micro-grid-2x2 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.65rem;
    }
    @media (max-width: 900px) {
      .micro-grid-2x2 {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .micro-stat-pill {
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 0.55rem 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .pill-head {
      font-size: 0.68rem;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
    }
    .micro-stat-pill strong {
      font-size: 0.84rem;
      color: #f8fafc;
      font-weight: 700;
    }
    .tag-sub {
      font-size: 0.72rem;
      font-weight: 500;
      opacity: 0.85;
      margin-left: 2px;
    }
    .pill-amber {
      border-left: 3px solid #f59e0b;
    }
    .pill-green {
      border-left: 3px solid #10b981;
    }
    .pill-blue {
      border-left: 3px solid #1d70f5;
    }
    .pill-slate {
      border-left: 3px solid #64748b;
    }
    .micro-scanner-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .scanner-stream {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 6px;
      padding: 0.4rem 0.85rem;
      font-family: monospace;
    }
    .barcode-graphic {
      color: #38bdf8;
      letter-spacing: 1px;
      font-weight: 900;
    }
    .scanner-stream code {
      color: #f1f5f9;
      font-size: 0.84rem;
      font-weight: 700;
    }
    .scan-badge {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 4px;
    }
    .micro-progress-container {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }
    .progress-labels {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.78rem;
      color: #cbd5e1;
    }
    .progress-labels strong {
      color: #34d399;
      font-weight: 800;
    }
    .micro-progress-bar {
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #1d70f5, #10b981);
      border-radius: 9999px;
    }
    .micro-chips-row {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      flex-wrap: wrap;
    }
    .status-chip {
      font-size: 0.74rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 6px;
      border: 1px solid transparent;
    }
    .card-main-content {
      padding: 2.2rem;
    }
    .card-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .header-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .industry-badge {
      background: rgba(56, 189, 248, 0.12);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.25);
      font-size: 0.8rem;
      font-weight: 700;
      padding: 0.3rem 0.75rem;
      border-radius: 20px;
    }
    .client-badge {
      background: rgba(255, 255, 255, 0.05);
      color: #cbd5e1;
      border: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 0.8rem;
      padding: 0.3rem 0.75rem;
      border-radius: 20px;
    }
    .metric-callout {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
      font-size: 0.95rem;
      font-weight: 700;
      padding: 0.4rem 0.9rem;
      border-radius: 20px;
    }
    .study-title {
      font-size: 1.65rem;
      font-weight: 800;
      color: #f8fafc;
      margin: 0 0 0.75rem 0;
      line-height: 1.3;
    }
    .study-summary {
      color: #cbd5e1;
      font-size: 1.05rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .problem-solution-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }
    .ps-box {
      border-radius: 10px;
      padding: 1.25rem;
    }
    .problem-box {
      background: rgba(239, 68, 68, 0.07);
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
    .solution-box {
      background: rgba(37, 99, 235, 0.08);
      border: 1px solid rgba(37, 99, 235, 0.25);
    }
    .ps-label {
      font-size: 0.78rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 0.4rem;
    }
    .problem-box .ps-label { color: #f87171; }
    .solution-box .ps-label { color: #60a5fa; }
    .ps-box p {
      font-size: 0.92rem;
      color: #e2e8f0;
      line-height: 1.5;
      margin: 0;
    }

    .outcomes-section {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
    }
    .section-mini-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: #38bdf8;
      display: block;
      margin-bottom: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .outcomes-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .outcomes-list li {
      font-size: 0.92rem;
      color: #f1f5f9;
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      line-height: 1.4;
    }
    .outcomes-list .chk {
      color: #10b981;
      font-weight: 800;
      flex-shrink: 0;
    }

    .client-quote-box {
      background: rgba(30, 41, 59, 0.6);
      border-left: 3px solid #38bdf8;
      padding: 1rem 1.25rem;
      border-radius: 0 8px 8px 0;
      margin-bottom: 1.5rem;
    }
    .quote-text {
      font-style: italic;
      color: #e2e8f0;
      font-size: 0.92rem;
      line-height: 1.5;
      margin: 0 0 0.5rem 0;
    }
    .quote-author {
      font-size: 0.82rem;
      color: #94a3b8;
    }
    .quote-author strong {
      color: #f8fafc;
    }

    .card-footer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.25rem;
      padding-top: 1.25rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .tech-stack-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }
    .tech-pill {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
      font-size: 0.78rem;
      font-weight: 600;
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
    }
    .split-card-footer {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .build-similar-btn {
      background: #1d70f5 !important;
      color: #ffffff !important;
      padding: 0.65rem 1.35rem;
      font-size: 0.88rem;
      font-weight: 700;
      border-radius: 9999px;
      box-shadow: 0 4px 14px rgba(29, 112, 245, 0.35);
      transition: all 0.2s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
    }
    .build-similar-btn:hover {
      background: #1557c0 !important;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(29, 112, 245, 0.45);
    }
    .secondary-chat-btn {
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399 !important;
      font-size: 0.88rem;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      padding: 0.6rem 1.15rem;
      border-radius: 9999px;
      transition: all 0.2s ease;
    }
    .secondary-chat-btn:hover {
      background: rgba(16, 185, 129, 0.22);
      border-color: #34d399;
      transform: translateY(-1px);
    }

    /* Consultation Banner */
    .portfolio-cta-banner {
      background: linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%);
      padding: 4.5rem 1.5rem;
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
      .portfolio-hero h1 { font-size: 2rem; }
      .problem-solution-grid { grid-template-columns: 1fr; }
      .card-footer-row { flex-direction: column; align-items: flex-start; }
      .study-actions { width: 100%; justify-content: flex-start; }
      .card-main-content { padding: 1.5rem; }
    }
  `]
})
export class PortfolioComponent {
  readonly settings = inject(SiteSettingsService);
  readonly caseStudies: readonly CaseStudyDraft[] = caseStudyDrafts;

  selectedCategory: string = 'all';

  get filteredStudies(): readonly CaseStudyDraft[] {
    if (this.selectedCategory === 'all') return this.caseStudies;
    return this.caseStudies.filter(s => s.category === this.selectedCategory);
  }

  getStudyWhatsApp(title: string): string {
    const text = encodeURIComponent(`Hi, I saw your case study for "${title}" on your portfolio. We are planning a similar project and would like to discuss architecture and scope.`);
    return `https://wa.me/917013631398?text=${text}`;
  }
}
