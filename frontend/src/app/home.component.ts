import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectEstimatorComponent } from './project-estimator.component';
import { caseStudyDrafts, packagedTiers, serviceDrafts } from './content-drafts';
import { SiteSettingsService } from './site-settings.service';

@Component({
  selector: 'site-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProjectEstimatorComponent],
  template: `
    <!-- High-Converting Cosmic Hero Section -->
    <section class="home-hero-section">
      <div class="hero home-hero">
        <div class="hero-copy">
          <div class="hero-top-badge">
            <span class="badge-dot" aria-hidden="true"></span>
            <span>ENTERPRISE FULL-STACK DEVELOPMENT · SENIOR ENGINEERING TEAM</span>
          </div>
          <h1 class="hero-main-title">
            Custom Software &amp; <span class="gradient-accent">Scalable SaaS</span> — Built to Deliver Business Results.
          </h1>
          <p class="intro">
            We engineer high-performance web applications, Java / Spring Boot APIs, and Angular portals with complete source code handover and 40/40/20 milestone billing.
          </p>

          <!-- Direct Hero Action Pill Buttons -->
          <div class="hero-actions">
            <a class="hero-pill-primary" href="#estimator">
              Calculate Project Cost &amp; Scope <span aria-hidden="true">↓</span>
            </a>
            <a class="hero-pill-whatsapp" [href]="settings.whatsappUrl" target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp 💬
            </a>
          </div>

          <!-- Hero Commercial / Trust Strip (3-Column Metric & Assurance Bar) -->
          <div class="hero-trust-strip">
            <div class="trust-strip-item">
              <div class="trust-strip-primary">
                <span class="trust-metric">100%</span>
                <span class="trust-title">Code &amp; IP Handover</span>
              </div>
              <p class="trust-sub">Full Git repo &amp; Docker scripts yours on final delivery</p>
            </div>
            <div class="trust-strip-item">
              <div class="trust-strip-primary">
                <span class="trust-metric">40/40/20</span>
                <span class="trust-title">Milestone Billing</span>
              </div>
              <p class="trust-sub">Pay only as verified staging increments are approved</p>
            </div>
            <div class="trust-strip-item">
              <div class="trust-strip-primary">
                <span class="trust-metric">&lt;24h</span>
                <span class="trust-title">Direct Architect SLA</span>
              </div>
              <p class="trust-sub">Zero sales rep middleman · Direct WhatsApp technical lead</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Engineering Capacity Snapshot Card -->
        <aside class="hero-panel" aria-label="Engineering Capacity Snapshot">
          <div class="panel-topline">
            <span class="status-dot"></span>
            <span>CAPACITY STATUS</span>
            <span class="panel-badge-avail">Q4 SLOTS OPEN</span>
          </div>
          
          <div class="panel-row">
            <span class="panel-label">Primary Stack</span>
            <div class="panel-stack-tags">
              <span class="tech-tag">Java 21</span>
              <span class="tech-tag">Spring Boot 4</span>
              <span class="tech-tag">Angular 22</span>
            </div>
          </div>

          <div class="panel-row">
            <span class="panel-label">Design Rigor</span>
            <strong class="panel-value">HLD &amp; LLD Blueprints First</strong>
          </div>
          
          <div class="panel-row">
            <span class="panel-label">Cloud &amp; DevOps</span>
            <div class="panel-stack-tags">
              <span class="tech-tag">Docker</span>
              <span class="tech-tag">AWS</span>
              <span class="tech-tag">PostgreSQL</span>
            </div>
          </div>
          
          <div class="panel-row">
            <span class="panel-label">Delivery Model</span>
            <strong class="panel-value">Fixed-Scope MVP · Monthly Pod</strong>
          </div>
          
          <div class="panel-row">
            <span class="panel-label">Typical Turnaround</span>
            <strong class="panel-value">3 to 6 Weeks to Production</strong>
          </div>
          
          <div class="panel-highlight-box">
            <p>🎯 <strong>Free 30-Minute Architecture Review:</strong> Discuss database schema, tech stack trade-offs, and fixed milestone pricing with our technical lead.</p>
          </div>
          <div class="panel-decoration" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
        </aside>
      </div>

      <!-- Signature Curved Divider Transition -->
      <div class="hero-curve-separator" aria-hidden="true">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,50 C400,5 1040,5 1440,50 L1440,70 L0,70 Z" fill="#0b1120"/>
        </svg>
      </div>
    </section>

    <!-- Interactive Project Scope & Cost Estimator Component -->
    <site-project-estimator></site-project-estimator>

    <!-- Core Services Overview Grid -->
    <section class="content-section home-services" id="services">
      <div class="section-heading">
        <div>
          <p class="eyebrow">SERVICES &amp; SPECIALTIES</p>
          <h2>End-to-End Software Engineering for Modern Businesses.</h2>
        </div>
        <p>From initial architecture blueprints to full-scale multi-tenant SaaS and hardware integrations.</p>
      </div>

      <div class="service-grid">
        @for (service of services; track service.slug) {
          <article class="service-card modern-service-card">
            <div class="card-header-row">
              <span class="card-category-tag">{{ service.category }}</span>
              <span class="card-est-badge">{{ service.timeline }}</span>
            </div>
            <h3>{{ service.title }}</h3>
            <p class="card-tagline">{{ service.tagline }}</p>
            <p class="card-problem">{{ service.problem }}</p>
            <ul class="card-feature-list">
              @for (feat of service.features.slice(0, 3); track feat) {
                <li><span class="check-icon">✓</span> {{ feat }}</li>
              }
            </ul>
            <div class="card-bottom-action">
              <span class="service-price-hint">From {{ service.estimatedBudget }}</span>
              <a [routerLink]="['/services', service.slug]" class="service-link">View Details <span aria-hidden="true">&rarr;</span></a>
            </div>
          </article>
        }
      </div>
    </section>

    <!-- Packaged Tiers & Pricing Models -->
    <section class="pricing-section" id="pricing">
      <div class="section-heading pricing-heading">
        <div>
          <p class="eyebrow">TRANSPARENT PACKAGES · NO HIDDEN COSTS</p>
          <h2>Predictable Pricing Built on Milestone Deliverables.</h2>
        </div>
        <p>Choose between fixed-scope delivery packages or flexible monthly engineering blocks. <a routerLink="/pricing" style="color: #38bdf8; font-weight: 600; text-decoration: underline;">See all web, mobile &amp; SaaS packages →</a></p>
      </div>

      <div class="pricing-grid">
        @for (tier of tiers; track tier.id) {
          <article class="price-card" [class.featured-price]="tier.featured">
            @if (tier.badge) {
              <div class="featured-badge">{{ tier.badge }}</div>
            }
            <p class="price-label">{{ tier.name }}</p>
            <p class="price-value">{{ tier.priceINR }}</p>
            <p class="price-unit">{{ tier.duration }} · 40/40/20 milestone billing</p>
            <p class="tier-tagline">{{ tier.tagline }}</p>

            <div class="tier-deliverables">
              <strong>Key Deliverables:</strong>
              <ul>
                @for (d of tier.deliverables; track d) {
                  <li>✓ {{ d }}</li>
                }
              </ul>
            </div>

            <a class="button tier-cta-btn" routerLink="/contact" [queryParams]="{ package: tier.id }">
              {{ tier.ctaText }} <span aria-hidden="true">↗</span>
            </a>
          </article>
        }
      </div>
      <p class="pricing-footnote">
        * Estimates in INR. All fixed projects include source code handover, deployment scripts, and a 30-day post-launch warranty.
      </p>
    </section>

    <!-- Engineering Craftsmanship & Architectural Rigor Section -->
    <section class="content-section engineering-craftsmanship-section">
      <div class="section-heading text-center-heading">
        <p class="eyebrow">SENIOR IT EXPERTISE · BUILT ON ARCHITECTURAL RIGOR</p>
        <h2>Why Our Engineering Background Sets Us Apart</h2>
        <p>Our developers bring a multidisciplinary mix of enterprise IT experience. We build with banking-grade precision, containerized Docker portability, and architectural blueprints—explained in plain, simple business terms.</p>
      </div>

      <div class="craftsmanship-grid">
        <!-- Pillar 1: Fintech & Core Banking Experience with Sprint Progress Widget -->
        <article class="craftsmanship-card">
          <div class="card-badge-row">
            <span class="craft-icon">🏦</span>
            <span class="craft-badge badge-blue">FINTECH &amp; CORE BANKING</span>
          </div>
          <h3>Bank-Grade Precision &amp; Ledger Integrity</h3>
          <p class="craft-desc">
            In core banking, a single unhandled concurrency bug or calculation rounding error is unacceptable. Our senior developers have engineered transaction reconciliation engines, payment clearing integrations (UPI, IMPS, NEFT), and immutable ledger audit trails processing over 1,000,000 daily records.
          </p>

          <!-- Interactive-looking Sprint Progress Mini Widget -->
          <div class="bento-sprint-widget">
            <div class="sprint-widget-top">
              <span class="sprint-tag"><span class="pulse-dot"></span> Sprint 03 • Current (Week 5–6)</span>
              <span class="sprint-pct">87% Complete</span>
            </div>
            <div class="sprint-progress-bar">
              <div class="sprint-progress-fill" style="width: 87%;"></div>
            </div>
            <div class="sprint-tasks-list">
              <div class="sprint-task done">
                <span class="task-chk">✓</span>
                <span class="task-text">HLD / LLD Architecture Blueprint &amp; DB Schema Approved</span>
              </div>
              <div class="sprint-task done">
                <span class="task-chk">✓</span>
                <span class="task-text">Spring Boot 4 Transaction &amp; Reconciliation Engine Built</span>
              </div>
              <div class="sprint-task in-progress">
                <span class="task-arrow">→</span>
                <span class="task-text">Staging UAT Deployment &amp; Milestone 2 Verification</span>
              </div>
            </div>
          </div>

          <div class="craft-points">
            <div class="point-item">✓ <strong>ACID Transaction Boundaries:</strong> No duplicate charges or corrupted cart totals.</div>
            <div class="point-item">✓ <strong>Cryptographic Audit Trails:</strong> Every financial action is permanently traceable.</div>
            <div class="point-item">✓ <strong>Enterprise Security:</strong> Stateless JWT, OAuth2, and strict role-based access (RBAC).</div>
          </div>
          <div class="plain-lang-box">
            <span class="plain-label">💡 In Plain Language:</span>
            <p>If our architecture can securely balance millions of banking transactions, your business data, inventory, and payments are in the safest hands possible.</p>
          </div>
        </article>

        <!-- Pillar 2: High-Quality HLD & LLD Architecture Design with Timeline Pill Stack -->
        <article class="craftsmanship-card">
          <div class="card-badge-row">
            <span class="craft-icon">📐</span>
            <span class="craft-badge badge-purple">ARCHITECTURE BEFORE CODE</span>
          </div>
          <h3>High-Quality HLD &amp; LLD Blueprints</h3>
          <p class="craft-desc">
            Amateur freelancers jump blindly into coding and rewrite everything when the app crashes under load. We design before we build—just like certified architects preparing complete engineering blueprints before construction begins.
          </p>

          <!-- Horizontal Week-by-Week Timeline Pill Stack Widget -->
          <div class="bento-timeline-widget">
            <span class="timeline-widget-label">DELIVERY ROADMAP · SPRINT ITERATIONS</span>
            <div class="timeline-pills-row">
              <div class="timeline-pill completed">
                <span class="wk-label">Wk 1</span>
                <span class="wk-title">Discovery</span>
                <span class="wk-status">✓ Blueprint</span>
              </div>
              <div class="timeline-pill active">
                <span class="wk-label">Wk 2</span>
                <span class="wk-title">DB &amp; APIs</span>
                <span class="wk-status">⚡ In Sprint</span>
              </div>
              <div class="timeline-pill upcoming">
                <span class="wk-label">Wk 3–5</span>
                <span class="wk-title">UI Portals</span>
                <span class="wk-status">Milestone 2</span>
              </div>
              <div class="timeline-pill upcoming">
                <span class="wk-label">Wk 6</span>
                <span class="wk-title">Launch</span>
                <span class="wk-status">IP Transfer</span>
              </div>
            </div>
          </div>

          <div class="design-split">
            <div class="design-col">
              <h4>HLD (High-Level Design)</h4>
              <p>The big-picture system map: how client apps, microservices, databases, payment gateways, and cloud firewalls communicate securely.</p>
            </div>
            <div class="design-col">
              <h4>LLD (Low-Level Design)</h4>
              <p>The exact recipe: relational database schemas, API request/response formats, validation constraints, and error recovery handlers.</p>
            </div>
          </div>
          <div class="plain-lang-box">
            <span class="plain-label">💡 In Plain Language:</span>
            <p>You review and approve the exact architectural blueprint before coding starts. Zero surprises, zero budget waste, and complete documentation you own forever.</p>
          </div>
        </article>

        <!-- Pillar 3: Docker & Cloud Containerization -->
        <article class="craftsmanship-card">
          <div class="card-badge-row">
            <span class="craft-icon">🐳</span>
            <span class="craft-badge badge-green">PORTABILITY &amp; DEVOPS</span>
          </div>
          <h3>Docker Containerization from Day One</h3>
          <p class="craft-desc">
            We eliminate the classic excuse of "it worked on my laptop but broke on your server." Every web app, API, and database migration is packaged inside lightweight, production-hardened Docker containers with automated CI/CD deployment pipelines.
          </p>
          <div class="craft-points">
            <div class="point-item">✓ <strong>Zero Cloud Lock-In:</strong> Deploy on AWS, Google Cloud, DigitalOcean, or private VPS.</div>
            <div class="point-item">✓ <strong>1-Command Deployments:</strong> Push software updates seamlessly with zero downtime.</div>
            <div class="point-item">✓ <strong>Instant Disaster Recovery:</strong> Automated daily backups and container snapshots restore in minutes.</div>
          </div>
          <div class="plain-lang-box">
            <span class="plain-label">💡 In Plain Language:</span>
            <p>Your software is completely portable, reliable, and ready to scale anywhere without expensive third-party cloud consulting bills.</p>
          </div>
        </article>
      </div>

      <!-- Bottom Simple Language Assurance Banner with Mini Chat / Support Preview -->
      <div class="plain-language-banner">
        <div class="banner-left">
          <span class="banner-icon-badge">🤝</span>
          <div>
            <h3>We Speak Plain Business Language, Not Confusing Tech Jargon</h3>
            <p>You don't need a computer science degree to build software with us. We translate complex engineering decisions into clear business impacts: cost, security, speed, and return on investment.</p>
          </div>
          
          <!-- Mini Chat / Support Preview Widget -->
          <div class="bento-chat-widget">
            <div class="chat-widget-header">
              <span class="chat-user-avatar">👨‍💼</span>
              <div class="chat-header-info">
                <strong>Direct Architect WhatsApp Channel</strong>
                <small>WhatsApp Business · Active Now</small>
              </div>
              <span class="chat-online-badge">Online 🟢</span>
            </div>
            <div class="chat-dialog-area">
              <div class="chat-bubble user-bubble">
                <p>Can we support offline table billing when restaurant internet drops?</p>
                <span class="bubble-time">10:42 AM</span>
              </div>
              <div class="chat-bubble lead-bubble">
                <p>Yes. We built an IndexedDB offline queue that synchronizes automatically on reconnection, with local ESC/POS thermal printing. Staging link is ready for review.</p>
                <span class="bubble-time">10:44 AM · Delivered <span class="read-ticks">✓✓</span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="banner-right">
          <a routerLink="/contact" class="button banner-cta">Discuss Your Project Blueprint ↗</a>
        </div>
      </div>
    </section>

    <!-- Why Choose Us / Value Proposition Pillars -->
    <section class="content-section why-choose-home-section">
      <div class="section-heading text-center-heading">
        <p class="eyebrow">WHY WORK WITH US · THE NORTHLINE ADVANTAGE</p>
        <h2>Why Founders &amp; Enterprise Leaders Choose Northline</h2>
        <p>We combine senior engineering craftsmanship with zero agency bureaucracy and complete code ownership.</p>
      </div>

      <div class="why-choose-pillars-grid">
        <div class="why-pillar-card">
          <div class="pillar-icon">🏦</div>
          <h3>Fintech &amp; Banking Disciplined</h3>
          <p>Our senior engineers have built mission-critical banking ledgers and transaction clearing engines. Zero calculation errors, zero data corruption.</p>
        </div>

        <div class="why-pillar-card">
          <div class="pillar-icon">📐</div>
          <h3>HLD &amp; LLD Blueprints First</h3>
          <p>We draft comprehensive system architecture (HLD) and database/API schemas (LLD) before coding begins. You review and approve the blueprint upfront.</p>
        </div>

        <div class="why-pillar-card">
          <div class="pillar-icon">🐳</div>
          <h3>Docker Containerized from Day 1</h3>
          <p>Every service and database migration runs in lightweight Docker containers. Deploy seamlessly to AWS, GCP, or private servers with one command.</p>
        </div>

        <div class="why-pillar-card">
          <div class="pillar-icon">🛡️</div>
          <h3>100% Code &amp; IP Ownership</h3>
          <p>Every line of code, Dockerfile, and database migration belongs to you upon delivery. No recurring vendor lock-in or proprietary traps.</p>
        </div>

        <div class="why-pillar-card">
          <div class="pillar-icon">💼</div>
          <h3>40/40/20 Milestone Billing</h3>
          <p>You only release payments after reviewing and approving working software increments deployed to your private staging environment.</p>
        </div>

        <div class="why-pillar-card">
          <div class="pillar-icon">💬</div>
          <h3>Plain Language &amp; Direct WhatsApp</h3>
          <p>No confusing technical jargon. We explain trade-offs in simple business terms: cost, speed, and reliability—with direct WhatsApp chat with your lead architect.</p>
        </div>
      </div>
    </section>

    <!-- Proven Project Case Studies -->
    <section class="content-section case-studies-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">PROVEN PRODUCTION WORKS</p>
          <h2>Real-World Systems Engineered for High Performance.</h2>
        </div>
        <p>A selection of our deployed systems. <a routerLink="/portfolio" style="color: #38bdf8; font-weight: 600; text-decoration: underline;">View all 6 case studies &amp; outcomes →</a></p>
      </div>

      <div class="case-study-grid">
        @for (study of caseStudies; track study.slug) {
          <article class="case-study-card">
            <div class="case-study-meta">
              <span class="industry-tag">{{ study.industry }}</span>
              <span class="metric-badge">{{ study.metric }}</span>
            </div>
            <h3>{{ study.title }}</h3>
            <p class="case-study-summary">{{ study.summary }}</p>
            
            <div class="case-study-outcomes">
              <strong>Measurable Outcomes:</strong>
              <ul>
                @for (outcome of study.keyOutcomes; track outcome) {
                  <li>✓ {{ outcome }}</li>
                }
              </ul>
            </div>

            <div class="case-study-stack">
              @for (tech of study.stack; track tech) {
                <span class="stack-badge">{{ tech }}</span>
              }
            </div>

            <div class="case-study-actions">
              <a [routerLink]="['/contact']" [queryParams]="{ service: study.slug }" class="button cs-quick-btn">
                Build a Similar System ↗
              </a>
              <a routerLink="/portfolio" class="cs-view-more">View Case Study →</a>
            </div>
          </article>
        }
      </div>
    </section>

    <!-- Structured 4-Step Milestone Process -->
    <section class="approach-section home-approach">
      <div class="section-heading">
        <div>
          <p class="eyebrow">OUR 4-STEP DELIVERY PROCESS</p>
          <h2>How We Work: Transparent, Milestone-Driven Delivery.</h2>
        </div>
        <p>Zero risk of runaway budgets. You review and approve software increments every week.</p>
      </div>

      <div class="approach-steps">
        <article>
          <span class="step-num">01</span>
          <h3>1. Discovery &amp; Blueprint</h3>
          <p>We map your user journeys, write the API schema, design the database ERD, and agree a fixed milestone quote.</p>
        </article>
        <article>
          <span class="step-num">02</span>
          <h3>2. Milestone Sprints</h3>
          <p>We build in reviewable 2-week iterations. You test working screens and API responses on staging environments.</p>
        </article>
        <article>
          <span class="step-num">03</span>
          <h3>3. Production Launch</h3>
          <p>Automated database migrations, SSL setup, and Dockerized deployment on your AWS or VPS cloud infrastructure.</p>
        </article>
        <article>
          <span class="step-num">04</span>
          <h3>4. Handover &amp; Warranty</h3>
          <p>Full Git repository and IP transfer, complete documentation, and a 30-day post-launch support SLA.</p>
        </article>
      </div>
    </section>

    <!-- Final High-Converting Call to Action -->
    <section class="final-cta">
      <p class="eyebrow">READY TO BUILD?</p>
      <h2>Let’s Turn Your Software Requirements Into a Working Product.</h2>
      <p>Schedule a free 30-minute technical roadmap call or send us your project overview. We review and respond within 1 business day.</p>
      <div class="final-cta-actions">
        <a class="button primary-cta" routerLink="/contact">Get Free Project Quote <span aria-hidden="true">↗</span></a>
        <a class="button wa-cta" [href]="settings.whatsappUrl" target="_blank" rel="noopener noreferrer">Chat Directly on WhatsApp 💬</a>
      </div>
      <p class="final-cta-note">Mutual NDA signed before sharing specifications on request · No obligation</p>
    </section>
  `,
  styles: [`
    /* Cosmic Hero Wrapper */
    .home-hero-section {
      position: relative;
      background: radial-gradient(circle at 35% 20%, #1e3a8a 0%, #0d1b33 55%, #070d17 100%);
      padding-top: 2rem;
      overflow: hidden;
    }

    .home-hero {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      align-items: center;
      gap: 3.5rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem max(5vw, 20px) 4.5rem;
      position: relative;
      z-index: 3;
    }

    .hero-main-title {
      font-size: clamp(2.3rem, 4.5vw, 3.5rem);
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.03em;
      line-height: 1.15;
      margin: 0 0 1.25rem 0;
    }

    .gradient-accent {
      background: linear-gradient(135deg, #60a5fa 0%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: inline-block;
    }

    .hero-top-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      background: rgba(30, 41, 59, 0.75);
      border: 1px solid rgba(56, 189, 248, 0.28);
      padding: 0.4rem 1.1rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      color: #cbd5e1;
      margin-bottom: 1.5rem;
      backdrop-filter: blur(8px);
    }

    .badge-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #38bdf8;
      box-shadow: 0 0 8px #38bdf8;
    }

    /* Hero Action Pill Buttons */
    .hero-actions {
      display: flex;
      align-items: center;
      gap: 1.1rem;
      flex-wrap: wrap;
      margin: 2rem 0;
    }

    .hero-pill-primary {
      background: #2563eb;
      color: #ffffff !important;
      font-weight: 700;
      font-size: 1rem;
      padding: 0.9rem 2.2rem;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 4px 18px rgba(37, 99, 235, 0.45);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .hero-pill-primary:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(37, 99, 235, 0.55);
    }

    .hero-pill-whatsapp {
      background: #16a34a;
      color: #ffffff !important;
      font-weight: 700;
      font-size: 1rem;
      padding: 0.9rem 2rem;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 4px 16px rgba(22, 163, 74, 0.4);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .hero-pill-whatsapp:hover {
      background: #15803d;
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(22, 163, 74, 0.55);
    }

    /* Hero Commercial / Trust Strip (3-Column Metric & Assurance Bar) */
    .hero-trust-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-top: 2rem;
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      padding: 1.35rem 1.75rem;
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
    }

    .trust-strip-item {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      position: relative;
    }

    .trust-strip-item:not(:last-child)::after {
      content: '';
      position: absolute;
      right: -0.75rem;
      top: 15%;
      height: 70%;
      width: 1px;
      background: rgba(255, 255, 255, 0.1);
    }

    .trust-strip-primary {
      display: flex;
      align-items: baseline;
      gap: 0.6rem;
      flex-wrap: wrap;
    }

    .trust-metric {
      font-size: 1.35rem;
      font-weight: 900;
      color: #38bdf8;
      letter-spacing: -0.02em;
    }

    .trust-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
    }

    .trust-sub {
      color: #94a3b8;
      font-size: 0.8rem;
      line-height: 1.45;
      margin: 0;
    }

    @media (max-width: 768px) {
      .hero-trust-strip {
        grid-template-columns: 1fr;
        gap: 1.25rem;
        padding: 1.25rem;
      }
      .trust-strip-item:not(:last-child)::after {
        display: none;
      }
    }

    /* Right Spec Card */
    .hero-panel {
      background: rgba(30, 41, 59, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 20px;
      padding: 1.75rem 1.6rem;
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(14px);
      position: relative;
      overflow: hidden;
    }

    .panel-topline {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 1.5rem;
      font-size: 0.75rem;
      font-weight: 800;
      color: #cbd5e1;
      letter-spacing: 0.1em;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 10px #10b981;
    }

    .panel-badge-avail {
      font-size: 0.72rem;
      font-weight: 700;
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(52, 211, 153, 0.35);
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      margin-left: auto;
    }

    .panel-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      padding: 0.8rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 0.88rem;
    }

    .panel-label {
      color: #94a3b8;
      font-weight: 600;
      flex-shrink: 0;
      font-size: 0.84rem;
    }

    .panel-stack-tags {
      display: flex;
      gap: 0.35rem;
      flex-wrap: nowrap;
      justify-content: flex-end;
    }

    .tech-tag {
      background: rgba(37, 99, 235, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.25);
      color: #93c5fd;
      padding: 0.18rem 0.5rem;
      border-radius: 6px;
      font-size: 0.76rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .panel-value {
      color: #f8fafc;
      font-weight: 700;
      text-align: right;
      font-size: 0.88rem;
    }

    .panel-highlight-box {
      margin-top: 1.5rem;
      background: rgba(37, 99, 235, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 12px;
      padding: 1rem 1.15rem;
    }

    .panel-highlight-box p {
      color: #cbd5e1;
      font-size: 0.86rem;
      line-height: 1.5;
      margin: 0;
    }

    /* Curved Bottom Separator */
    .hero-curve-separator {
      position: relative;
      margin-top: -1px;
      width: 100%;
      height: 60px;
      overflow: hidden;
      pointer-events: none;
    }

    .hero-curve-separator svg {
      display: block;
      width: 100%;
      height: 100%;
    }
    .modern-service-card {
      display: flex;
      flex-direction: column;
    }
    .card-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .card-category-tag {
      font-size: 0.78rem;
      font-weight: 700;
      color: #60a5fa;
      letter-spacing: 0.04em;
    }
    .card-est-badge {
      font-size: 0.75rem;
      color: #94a3b8;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    .card-tagline {
      color: #cbd5e1;
      font-weight: 500;
      font-size: 0.95rem;
      margin: 0.25rem 0 0.75rem 0;
    }
    .card-problem {
      color: #94a3b8;
      font-size: 0.88rem;
      line-height: 1.5;
      margin-bottom: 1.25rem;
    }
    .card-feature-list {
      list-style: none;
      padding: 0;
      margin: 0 0 1.5rem 0;
      flex-grow: 1;
    }
    .card-feature-list li {
      font-size: 0.85rem;
      color: #cbd5e1;
      margin-bottom: 0.5rem;
      display: flex;
      gap: 0.5rem;
      align-items: flex-start;
    }
    .check-icon {
      color: #10b981;
      font-weight: bold;
    }
    .card-bottom-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .service-price-hint {
      font-size: 0.85rem;
      color: #38bdf8;
      font-weight: 600;
    }
    .service-link {
      font-size: 0.9rem;
      color: #60a5fa;
      text-decoration: none;
      font-weight: 600;
    }
    .service-link:hover {
      text-decoration: underline;
    }
    .tier-tagline {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-bottom: 1.25rem;
    }
    .tier-deliverables {
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }
    .tier-deliverables strong {
      display: block;
      color: #e2e8f0;
      font-size: 0.88rem;
      margin-bottom: 0.5rem;
    }
    .tier-deliverables ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .tier-deliverables li {
      color: #cbd5e1;
      font-size: 0.85rem;
      margin-bottom: 0.4rem;
    }
    .tier-cta-btn {
      width: 100%;
      text-align: center;
      margin-top: auto;
    }
    .pricing-footnote {
      max-width: 1200px;
      margin: 1.5rem auto 0 auto;
      text-align: center;
      color: #94a3b8;
      font-size: 0.85rem;
    }
    .case-study-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .case-study-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .case-study-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .industry-tag {
      font-size: 0.78rem;
      font-weight: 700;
      color: #60a5fa;
      letter-spacing: 0.04em;
    }
    .metric-badge {
      font-size: 0.8rem;
      font-weight: 700;
      color: #34d399;
      background: rgba(16, 185, 129, 0.12);
      padding: 0.3rem 0.6rem;
      border-radius: 6px;
    }
    .case-study-card h3 {
      font-size: 1.25rem;
      margin: 0 0 0.75rem 0;
      color: #fff;
    }
    .case-study-summary {
      color: #94a3b8;
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }
    .case-study-outcomes strong {
      display: block;
      color: #e2e8f0;
      font-size: 0.88rem;
      margin-bottom: 0.5rem;
    }
    .case-study-outcomes ul {
      list-style: none;
      padding: 0;
      margin: 0 0 1.25rem 0;
    }
    .case-study-outcomes li {
      color: #cbd5e1;
      font-size: 0.85rem;
      margin-bottom: 0.4rem;
    }
    .case-study-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .case-study-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-top: 1.25rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    .cs-quick-btn {
      font-size: 0.85rem;
      font-weight: 700;
      padding: 0.5rem 0.9rem;
    }
    .cs-view-more {
      font-size: 0.85rem;
      color: #38bdf8;
      font-weight: 600;
      text-decoration: none;
    }
    .cs-view-more:hover {
      text-decoration: underline;
    }

    /* Engineering Craftsmanship & Architectural Rigor */
    .engineering-craftsmanship-section {
      background: #070d17;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 5rem max(5vw, 20px);
    }
    .craftsmanship-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto 3rem auto;
    }
    .craftsmanship-card {
      background: rgba(30, 41, 59, 0.55);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 2rem 1.75rem;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .craftsmanship-card:hover {
      transform: translateY(-3px);
      border-color: rgba(56, 189, 248, 0.35);
    }
    .card-badge-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }
    .craft-icon {
      font-size: 1.8rem;
    }
    .craft-badge {
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
    }
    .badge-blue {
      background: rgba(37, 99, 235, 0.2);
      color: #93c5fd;
      border: 1px solid rgba(59, 130, 246, 0.4);
    }
    .badge-purple {
      background: rgba(168, 85, 247, 0.2);
      color: #d8b4fe;
      border: 1px solid rgba(168, 85, 247, 0.4);
    }
    .badge-green {
      background: rgba(16, 185, 129, 0.2);
      color: #6ee7b7;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }
    .craftsmanship-card h3 {
      font-size: 1.25rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 0.85rem 0;
      line-height: 1.3;
    }
    .craft-desc {
      font-size: 0.9rem;
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }
    .craft-points {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      font-size: 0.84rem;
      color: #cbd5e1;
    }
    .point-item strong {
      color: #f1f5f9;
    }

    /* Bento Grid: Sprint Progress Mini Widget */
    .bento-sprint-widget {
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(56, 189, 248, 0.22);
      border-radius: 12px;
      padding: 1rem 1.15rem;
      margin-bottom: 1.35rem;
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
    }
    .sprint-widget-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.65rem;
    }
    .sprint-tag {
      font-size: 0.76rem;
      font-weight: 700;
      color: #38bdf8;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
      animation: pulse-glow 2s infinite ease-in-out;
    }
    .sprint-pct {
      font-size: 0.74rem;
      font-weight: 800;
      color: #34d399;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 2px 8px;
      border-radius: 9999px;
    }
    .sprint-progress-bar {
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      overflow: hidden;
      margin-bottom: 0.85rem;
    }
    .sprint-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #1d70f5, #10b981);
      border-radius: 9999px;
    }
    .sprint-tasks-list {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }
    .sprint-task {
      display: flex;
      align-items: center;
      gap: 0.55rem;
      font-size: 0.78rem;
      line-height: 1.35;
    }
    .task-chk {
      color: #10b981;
      font-weight: 900;
      flex-shrink: 0;
    }
    .task-arrow {
      color: #38bdf8;
      font-weight: 900;
      flex-shrink: 0;
    }
    .sprint-task.done .task-text {
      color: #94a3b8;
    }
    .sprint-task.in-progress .task-text {
      color: #f1f5f9;
      font-weight: 600;
    }

    /* Bento Grid: Horizontal Week-by-Week Timeline Pill Stack */
    .bento-timeline-widget {
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(168, 85, 247, 0.25);
      border-radius: 12px;
      padding: 1rem 1.15rem;
      margin-bottom: 1.35rem;
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
    }
    .timeline-widget-label {
      font-size: 0.72rem;
      font-weight: 800;
      color: #c084fc;
      letter-spacing: 0.08em;
      display: block;
      margin-bottom: 0.75rem;
    }
    .timeline-pills-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.5rem;
    }
    .timeline-pill {
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 0.55rem 0.45rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .timeline-pill.completed {
      border-color: rgba(16, 185, 129, 0.35);
      background: rgba(16, 185, 129, 0.08);
    }
    .timeline-pill.completed .wk-status {
      color: #34d399;
      font-weight: 700;
    }
    .timeline-pill.active {
      border-color: rgba(29, 112, 245, 0.45);
      background: rgba(29, 112, 245, 0.12);
    }
    .timeline-pill.active .wk-status {
      color: #38bdf8;
      font-weight: 700;
    }
    .wk-label {
      font-size: 0.68rem;
      font-weight: 800;
      color: #94a3b8;
      text-transform: uppercase;
    }
    .wk-title {
      font-size: 0.75rem;
      font-weight: 700;
      color: #f8fafc;
    }
    .wk-status {
      font-size: 0.65rem;
      color: #64748b;
    }

    /* Bento Grid: Mini Chat / Support Preview Widget */
    .bento-chat-widget {
      width: 100%;
      margin-top: 1.25rem;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
    }
    .chat-widget-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: rgba(30, 41, 59, 0.7);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .chat-user-avatar {
      font-size: 1.35rem;
    }
    .chat-header-info strong {
      display: block;
      font-size: 0.84rem;
      color: #f8fafc;
      font-weight: 700;
    }
    .chat-header-info small {
      color: #38bdf8;
      font-size: 0.74rem;
    }
    .chat-online-badge {
      margin-left: auto;
      font-size: 0.72rem;
      color: #34d399;
      font-weight: 700;
    }
    .chat-dialog-area {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .chat-bubble {
      max-width: 88%;
      padding: 0.7rem 0.95rem;
      border-radius: 12px;
      font-size: 0.84rem;
      line-height: 1.45;
    }
    .user-bubble {
      background: rgba(51, 65, 85, 0.7);
      color: #f1f5f9;
      align-self: flex-start;
      border-bottom-left-radius: 2px;
    }
    .lead-bubble {
      background: linear-gradient(135deg, #1d70f5 0%, #0284c7 100%);
      color: #ffffff;
      align-self: flex-end;
      border-bottom-right-radius: 2px;
      box-shadow: 0 4px 14px rgba(29, 112, 245, 0.3);
    }
    .lead-bubble p,
    .user-bubble p {
      margin: 0;
      color: inherit;
    }
    .bubble-time {
      display: block;
      font-size: 0.68rem;
      margin-top: 4px;
      opacity: 0.8;
      text-align: right;
    }
    .read-ticks {
      color: #93c5fd;
      font-weight: 900;
      margin-left: 2px;
    }
    .design-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .design-col {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 8px;
      padding: 0.75rem 0.85rem;
    }
    .design-col h4 {
      font-size: 0.82rem;
      font-weight: 700;
      color: #c084fc;
      margin: 0 0 0.3rem 0;
    }
    .design-col p {
      font-size: 0.78rem;
      color: #94a3b8;
      line-height: 1.45;
      margin: 0;
    }
    .plain-lang-box {
      margin-top: auto;
      background: rgba(37, 99, 235, 0.08);
      border-left: 3px solid #38bdf8;
      border-radius: 0 8px 8px 0;
      padding: 0.85rem 1rem;
    }
    .plain-label {
      font-size: 0.75rem;
      font-weight: 800;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 0.25rem;
    }
    .plain-lang-box p {
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.5;
      margin: 0;
      font-style: italic;
    }
    .plain-language-banner {
      max-width: 1200px;
      margin: 0 auto;
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 16px;
      padding: 1.75rem 2.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      flex-wrap: wrap;
    }
    .banner-left {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      flex: 1;
      min-width: 280px;
    }
    .banner-icon-badge {
      font-size: 2.2rem;
      flex-shrink: 0;
    }
    .banner-left h3 {
      font-size: 1.2rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 0.35rem 0;
    }
    .banner-left p {
      font-size: 0.9rem;
      color: #94a3b8;
      line-height: 1.5;
      margin: 0;
    }
    .banner-cta {
      background: #2563eb;
      color: #ffffff !important;
      font-weight: 700;
      padding: 0.85rem 1.8rem;
      border-radius: 9999px;
      white-space: nowrap;
      text-decoration: none;
    }
    .banner-cta:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
    }

    /* Why Choose Us Pillars */
    .why-choose-home-section {
      background: #0b1120;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding: 4.5rem 1.5rem;
    }
    .text-center-heading {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 3rem auto;
    }
    .text-center-heading h2 {
      font-size: 2.2rem;
      font-weight: 800;
      color: #f8fafc;
      margin-bottom: 0.5rem;
    }
    .text-center-heading p {
      color: #94a3b8;
      font-size: 1.05rem;
    }
    .why-choose-pillars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .why-pillar-card {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 1.75rem;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .why-pillar-card:hover {
      transform: translateY(-3px);
      border-color: rgba(56, 189, 248, 0.4);
    }
    .pillar-icon {
      font-size: 2rem;
      margin-bottom: 0.75rem;
    }
    .why-pillar-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 0.5rem 0;
    }
    .why-pillar-card p {
      font-size: 0.9rem;
      color: #94a3b8;
      line-height: 1.6;
      margin: 0;
    }
    .stack-badge {
      font-size: 0.75rem;
      background: rgba(255, 255, 255, 0.06);
      color: #cbd5e1;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    .step-num {
      font-size: 1.75rem;
      font-weight: 800;
      color: #38bdf8;
      display: block;
      margin-bottom: 0.5rem;
    }
    .final-cta-actions {
      display: flex;
      justify-content: center;
      gap: 1.25rem;
      flex-wrap: wrap;
      margin-top: 1.75rem;
    }
    .final-cta-note {
      color: #94a3b8;
      font-size: 0.85rem;
      margin-top: 1.25rem;
    }
    @media (max-width: 960px) {
      .craftsmanship-grid {
        grid-template-columns: 1fr;
      }
      .plain-language-banner {
        flex-direction: column;
        align-items: flex-start;
      }
      .banner-cta {
        width: 100%;
        text-align: center;
      }
    }
    @media (max-width: 900px) {
      .home-hero {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    }
    @media (max-width: 640px) {
      .hero-guarantees-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  readonly settings = inject(SiteSettingsService);
  readonly services = serviceDrafts;
  readonly tiers = packagedTiers;
  readonly caseStudies = caseStudyDrafts;
}
