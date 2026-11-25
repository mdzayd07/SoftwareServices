import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { insightDrafts, serviceDrafts, teamProfileDrafts } from './content-drafts';

interface PublicPageData {
  title: string;
  eyebrow: string;
  description: string;
  items?: string[];
}

@Component({
  selector: 'site-public-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <p class="eyebrow">{{ page.eyebrow }}</p>
      <h1>{{ page.title }}</h1>
      <p class="intro">{{ page.description }}</p>
    </section>

    <!-- About & Team Profile View -->
    @if (page.title === 'About the team') {
      <section class="page-content detail-copy">
        <div class="about-copy">
          <p class="eyebrow">ENGINEERING CRAFTSMANSHIP</p>
          <h2>Software Engineering Built on Architectural Rigor.</h2>
          <p>
            <strong>Northline Software</strong> is an engineering-first software services firm specializing in high-throughput Java / Spring Boot microservices, modern Angular 22 web platforms, multi-tenant SaaS architectures, and hardware POS integrations.
          </p>
          <p>
            We operate with a simple conviction: business owners and technical founders deserve direct access to senior architects without agency overhead, junior bait-and-switch staffing, or proprietary code lock-in. Every client engagement is structured around our 40/40/20 milestone delivery model and includes complete source code ownership.
          </p>
        </div>

        <!-- Plain Language Core Values -->
        <div class="about-pillars-grid">
          <div class="about-pillar">
            <span class="pillar-emoji">🏦</span>
            <h3>Fintech &amp; Banking Rigor</h3>
            <p>Engineers with core banking backgrounds who treat every transaction, double-entry ledger, and payment clearing event with zero tolerance for calculation error.</p>
          </div>
          <div class="about-pillar">
            <span class="pillar-emoji">📐</span>
            <h3>HLD &amp; LLD Blueprints</h3>
            <p>Comprehensive system architecture maps (HLD) and database schemas/APIs (LLD) designed and approved before writing code. Zero costly rewrites.</p>
          </div>
          <div class="about-pillar">
            <span class="pillar-emoji">🐳</span>
            <h3>Docker Portability</h3>
            <p>Production-hardened Docker containers for backend, frontend, and databases. Deploy smoothly to AWS, GCP, or private servers with one command.</p>
          </div>
          <div class="about-pillar">
            <span class="pillar-emoji">💡</span>
            <h3>Plain Business Language</h3>
            <p>We eliminate gatekeeping tech jargon and explain every engineering decision in clear business terms: budget, timeline, security, and ROI.</p>
          </div>
        </div>

        <div class="section-heading" style="margin-top: 3.5rem;">
          <div>
            <p class="eyebrow">LEADERSHIP &amp; ARCHITECTS</p>
            <h2>Senior Engineering Leads</h2>
          </div>
          <p>Hands-on technical specialists who architect, build, and deploy your software.</p>
        </div>

        <div class="team-profile-grid">
          @for (profile of teamProfiles; track profile.role) {
            <article class="team-profile-card">
              <span class="profile-placeholder">{{ profile.slot }}</span>
              <h2>{{ profile.role }}</h2>
              <p>{{ profile.bioDraft }}</p>
              
              <h3>Core Technical Proficiencies</h3>
              <ul>
                @for (skill of profile.skillDraft; track skill) {
                  <li>{{ skill }}</li>
                }
              </ul>

              <h3>Domain Experience</h3>
              <p>{{ profile.experienceDraft }}</p>
            </article>
          }
        </div>
      </section>
    }

    <!-- Banking & Enterprise Domain Experience View -->
    @if (page.title === 'Banking domain experience') {
      <section class="page-content detail-copy">
        <div class="section-heading">
          <div>
            <p class="eyebrow">ENTERPRISE DOMAIN EXPERIENCE · FINTECH &amp; BANKING</p>
            <h2>Mission-Critical Workflows, Core Banking &amp; High-Throughput Fintech</h2>
          </div>
          <p>High-integrity architectures built for regulatory compliance, zero data loss, and seamless Docker scalability.</p>
        </div>

        <div class="detail-copy-grid">
          <article>
            <h2>🏦 Transactional Precision &amp; Ledger Integrity</h2>
            <p>In financial systems, concurrency errors and calculation drift cost millions. We architect strict ACID transactional boundaries, double-entry bookkeeping ledgers, and automated payment clearing integrations (UPI, IMPS, NEFT) capable of handling high transaction spikes without lock contention.</p>
            <div class="plain-lang-box">
              <span class="plain-label">💡 In Plain Language:</span>
              <p>Every rupee and inventory unit is balanced to the exact decimal. Even if your internet drops or thousands of customers pay at the exact same second, your numbers will never drift.</p>
            </div>
          </article>

          <article>
            <h2>📐 High-Level (HLD) &amp; Low-Level (LLD) Design Blueprints</h2>
            <p>Before writing code, our certified architects produce comprehensive High-Level Design (HLD) maps (system boundaries, microservices, cloud security) and Low-Level Design (LLD) specifications (database ERDs, API schemas, error recovery contracts). Clients review and approve the blueprint before sprint kickoff.</p>
            <div class="plain-lang-box">
              <span class="plain-label">💡 In Plain Language:</span>
              <p>We build an architectural blueprint first, just like building a house. You see the complete floor plan, electrical map, and plumbing schema before construction starts—meaning zero expensive rewrites later.</p>
            </div>
          </article>

          <article>
            <h2>🐳 Docker Containerization &amp; DevOps Pipelines</h2>
            <p>Every service, backend worker, and database migration is containerized in Docker with automated CI/CD deployment pipelines. Enjoy zero cloud vendor lock-in, seamless one-command deployments, and automated daily backups on AWS or private VPS infrastructure.</p>
            <div class="plain-lang-box">
              <span class="plain-label">💡 In Plain Language:</span>
              <p>No more "it worked on my laptop but broke on your server." Your application is sealed in a standard container that runs identically on any server in the world, saving huge cloud maintenance costs.</p>
            </div>
          </article>

          <article>
            <h2>🔒 Traceability &amp; Immutable Audit Logs</h2>
            <p>Complete traceability for every user and administrative action. Immutable audit tables, stateless JWT session tokens, encrypted payload transfers (AES-256 / TLS 1.3), and granular role-based access control (RBAC) ensure full regulatory readiness.</p>
            <div class="plain-lang-box">
              <span class="plain-label">💡 In Plain Language:</span>
              <p>You can see who changed what, when, and from where. If a customer or auditor asks for proof, you can produce complete, tamper-proof logs in seconds.</p>
            </div>
          </article>

          <article>
            <h2>⚡ High Concurrency &amp; Database Tuning</h2>
            <p>Optimized HikariCP connection pooling, non-blocking asynchronous event dispatchers, and Flyway version-controlled PostgreSQL schemas capable of processing millions of batch records without database lock contention.</p>
            <div class="plain-lang-box">
              <span class="plain-label">💡 In Plain Language:</span>
              <p>Your website won't slow down to a crawl or freeze when your marketing campaign brings a surge of new customers. Pages load in under 200 milliseconds.</p>
            </div>
          </article>

          <article>
            <h2>🤝 Plain-Language Communication &amp; Direct Access</h2>
            <p>We eliminate technical confusion. You work directly with senior architects who translate complex software engineering into plain business impacts: cost, reliability, speed, and business outcomes.</p>
            <div class="plain-lang-box">
              <span class="plain-label">💡 In Plain Language:</span>
              <p>You speak directly to the lead engineer building your software on WhatsApp. No account manager telephone games, no confusing jargon, and clear answers to every question.</p>
            </div>
          </article>
        </div>

        <div class="domain-boundary">
          <strong>Enterprise Assurance:</strong> Every enterprise engagement begins with an executed Mutual Non-Disclosure Agreement (NDA), signed Statement of Work, and rigorous staging milestone review before production deployment.
        </div>
      </section>
    }

    <!-- Services Catalog View -->
    @if (page.title === 'Services') {
      <section class="page-content">
        <div class="services-header-row">
          <div>
            <p class="eyebrow">FULL-STACK SOLUTIONS</p>
            <h2>Specialized Engineering Offerings</h2>
          </div>
          <a class="button" routerLink="/pricing" fragment="estimator">Launch Cost Estimator ↗</a>
        </div>

        <div class="service-grid">
          @for (service of services; track service.slug) {
            <article class="service-card">
              <div class="card-header-row">
                <span class="card-index">{{ service.category }}</span>
                <span class="budget-tag">{{ service.estimatedBudget }}</span>
              </div>
              <h2>{{ service.title }}</h2>
              <p class="service-tagline-text"><strong>{{ service.tagline }}</strong></p>
              <p>{{ service.problem }}</p>
              
              <ul class="deliverables-preview">
                @for (d of service.deliverables.slice(0, 3); track d) {
                  <li>{{ d }}</li>
                }
              </ul>

              <div class="card-footer-row">
                <span class="timeline-text">⏱️ {{ service.timeline }}</span>
                <a [routerLink]="['/services', service.slug]">Explore Service &rarr;</a>
              </div>
            </article>
          }
        </div>
      </section>
    }

    <!-- Insights Catalog View -->
    @if (page.title === 'Insights') {
      <section class="page-content">
        <div class="services-header-row">
          <div>
            <p class="eyebrow">ENGINEERING ARTICLES</p>
            <h2>Technical Insights &amp; Architectural Practices</h2>
          </div>
        </div>

        <div class="service-grid">
          @for (article of articles; track article.slug) {
            <article class="service-card">
              <span class="card-index">{{ article.topic }}</span>
              <h2>{{ article.title }}</h2>
              <p>{{ article.excerpt }}</p>
              <div class="card-footer-row">
                <a [routerLink]="['/insights', article.slug]">Read Article &rarr;</a>
              </div>
            </article>
          }
        </div>
      </section>
    }

    <!-- Privacy Notice -->
    @if (page.title === 'Privacy notice') {
      <section class="page-content legal-draft">
        <p class="eyebrow">PRIVACY POLICY</p>
        <h2>Commitment to Data Privacy &amp; Security</h2>
        <p>This privacy policy outlines how Northline Software collects, handles, and protects information submitted through our website and project enquiry forms.</p>

        <h2>1. Information Collected</h2>
        <p>When you request a project consultation, we collect your name, contact phone/WhatsApp number, work email address, organization name, and high-level project specifications. We do not solicit nor require confidential credentials or payment data through public forms.</p>

        <h2>2. Use of Information</h2>
        <p>Information submitted is used solely by our engineering team to review technical requirements, prepare architecture estimates, and communicate milestone proposals. We never sell, lease, or share client contact information with third-party marketing brokers.</p>

        <h2>3. Data Retention &amp; Security</h2>
        <p>All enquiry records are stored within encrypted PostgreSQL databases with restricted role-based administrative access. Client records are automatically scrubbed following project completion or upon written request.</p>

        <h2>4. Contact Us</h2>
        <p>If you have any questions regarding data privacy or wish to request data deletion, contact our lead engineer directly at <a href="mailto:mdzain2545@gmail.com" style="color: #38bdf8;">mdzain2545@gmail.com</a>.</p>
      </section>
    }

    <!-- Terms of Service -->
    @if (page.title === 'Website terms') {
      <section class="page-content legal-draft">
        <p class="eyebrow">TERMS OF SERVICE</p>
        <h2>Website Terms &amp; Conditions</h2>
        <p>Welcome to Northline Software. By accessing this website or utilizing our cost estimation tools, you agree to comply with the following operational terms.</p>

        <h2>1. Service Scope &amp; Estimates</h2>
        <p>All pricing figures, ballpark timeline estimates, and calculator projections presented on this website are indicative. Official project commitments are governed by a signed Master Services Agreement (MSA) and Statement of Work (SOW).</p>

        <h2>2. Intellectual Property Rights</h2>
        <p>Upon receipt of milestone payments as defined in our client contracts, 100% of all custom software code, database migrations, configuration scripts, and documentation developed for the client belong entirely to the client.</p>

        <h2>3. Confidentiality &amp; NDAs</h2>
        <p>We treat all client specifications, workflows, and PRDs with strict confidentiality. Mutual Non-Disclosure Agreements are executed on Day 1 upon request.</p>
      </section>
    }
  `,
  styles: [`
    .services-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
      max-width: 1200px;
      margin: 0 auto 2.5rem auto;
    }

    .about-pillars-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      margin: 2.5rem 0 3.5rem 0;
    }

    @media (max-width: 1024px) {
      .about-pillars-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .about-pillars-grid {
        grid-template-columns: 1fr;
      }
    }

    .about-pillar {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 1.75rem;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .about-pillar:hover {
      transform: translateY(-3px);
      border-color: rgba(56, 189, 248, 0.35);
    }

    .about-pillar .pillar-emoji {
      font-size: 2.2rem;
      display: block;
      margin-bottom: 0.8rem;
    }

    .about-pillar h3 {
      font-size: 1.15rem;
      color: #f1f5f9;
      margin: 0 0 0.5rem 0;
      font-weight: 700;
    }

    .about-pillar p {
      font-size: 0.88rem;
      color: #94a3b8;
      line-height: 1.55;
      margin: 0;
    }

    .plain-lang-box {
      margin-top: 1.25rem;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(52, 211, 153, 0.25);
      border-radius: 10px;
      padding: 0.85rem 1rem;
    }

    .plain-label {
      display: block;
      color: #34d399;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 0.35rem;
    }

    .plain-lang-box p {
      font-size: 0.85rem;
      color: #cbd5e1;
      line-height: 1.5;
      margin: 0;
    }
  `]
})
export class PublicPageComponent implements OnInit {
  readonly page: PublicPageData;
  readonly services = serviceDrafts;
  readonly teamProfiles = teamProfileDrafts;
  readonly articles = insightDrafts;

  constructor(route: ActivatedRoute, title: Title, meta: Meta) {
    this.page = route.snapshot.data as PublicPageData;
    title.setTitle(`${this.page.title} | Northline Software`);
    meta.updateTag({ name: 'description', content: this.page.description });
  }

  ngOnInit(): void {}
}
