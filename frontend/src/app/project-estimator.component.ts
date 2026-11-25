import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SiteSettingsService } from './site-settings.service';

interface ProjectTypeOption {
  id: string;
  name: string;
  description: string;
  baseMin: number;
  baseMax: number;
  baseWeeks: string;
  icon: string;
}

interface FeatureModuleOption {
  id: string;
  name: string;
  cost: number;
  icon: string;
}

@Component({
  selector: 'site-project-estimator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="estimator-container" id="estimator">
      <div class="estimator-header">
        <p class="eyebrow">INSTANT PROJECT ESTIMATOR · TRANSPARENT SCOPE</p>
        <h2>Calculate Your Project Cost &amp; Delivery Timeline</h2>
        <p class="estimator-subtitle">
          Select your requirements below to get an instant scope calculation. No surprise fees — milestone billing (40/40/20) with 100% code ownership.
        </p>
      </div>

      <!-- Step Navigation Indicator -->
      <div class="estimator-stepper" role="tablist" aria-label="Estimator steps">
        <button type="button" class="step-btn" [class.active]="currentStep === 1" [class.completed]="currentStep > 1" (click)="goToStep(1)">
          <span class="step-circle">1</span>
          <span class="step-text">Platform</span>
        </button>
        <span class="step-line" [class.filled]="currentStep > 1" aria-hidden="true"></span>
        <button type="button" class="step-btn" [class.active]="currentStep === 2" [class.completed]="currentStep > 2" (click)="goToStep(2)" [disabled]="currentStep < 2 && !selectedType">
          <span class="step-circle">2</span>
          <span class="step-text">Capabilities</span>
        </button>
        <span class="step-line" [class.filled]="currentStep > 2" aria-hidden="true"></span>
        <button type="button" class="step-btn" [class.active]="currentStep === 3" [class.completed]="currentStep > 3" (click)="goToStep(3)" [disabled]="currentStep < 3">
          <span class="step-circle">3</span>
          <span class="step-text">Timeline</span>
        </button>
        <span class="step-line" [class.filled]="currentStep > 3" aria-hidden="true"></span>
        <button type="button" class="step-btn" [class.active]="currentStep === 4" (click)="goToStep(4)" [disabled]="currentStep < 4">
          <span class="step-circle">4</span>
          <span class="step-text">Estimate &amp; Scope</span>
        </button>
      </div>

      <!-- Step 1: Platform Selection -->
      @if (currentStep === 1) {
        <section class="estimator-step-content" aria-labelledby="step1-heading">
          <h3 id="step1-heading" class="step-title">Step 1: What type of software do you want to build?</h3>
          <div class="options-grid">
            @for (opt of projectTypes; track opt.id) {
              <div class="option-card" [class.selected]="selectedType?.id === opt.id" (click)="selectType(opt)" (keydown.enter)="selectType(opt)" tabindex="0" role="button">
                <span class="option-icon" aria-hidden="true">{{ opt.icon }}</span>
                <h4>{{ opt.name }}</h4>
                <p>{{ opt.description }}</p>
                <div class="card-footer-tag">From ₹{{ (opt.baseMin / 100000).toFixed(1) }}L</div>
              </div>
            }
          </div>
          <div class="step-nav-actions">
            <div></div>
            <button class="button next-btn" type="button" (click)="nextStep()" [disabled]="!selectedType">
              Continue to Capabilities &rarr;
            </button>
          </div>
        </section>
      }

      <!-- Step 2: Capabilities / Modules -->
      @if (currentStep === 2) {
        <section class="estimator-step-content" aria-labelledby="step2-heading">
          <h3 id="step2-heading" class="step-title">Step 2: Which key features does your application require?</h3>
          <p class="step-hint">Select all that apply. You can customize details later during our technical discovery.</p>
          <div class="options-grid features-grid">
            @for (feature of availableFeatures; track feature.id) {
              <div class="feature-card" [class.selected]="isFeatureSelected(feature.id)" (click)="toggleFeature(feature)" (keydown.enter)="toggleFeature(feature)" tabindex="0" role="checkbox" [attr.aria-checked]="isFeatureSelected(feature.id)">
                <div class="feature-checkbox" aria-hidden="true">
                  @if (isFeatureSelected(feature.id)) {
                    <span>✓</span>
                  }
                </div>
                <div class="feature-copy">
                  <span class="feature-icon">{{ feature.icon }}</span>
                  <strong>{{ feature.name }}</strong>
                </div>
              </div>
            }
          </div>
          <div class="step-nav-actions">
            <button class="text-link" type="button" (click)="prevStep()">&larr; Back to Platform</button>
            <button class="button next-btn" type="button" (click)="nextStep()">
              Continue to Timeline &rarr;
            </button>
          </div>
        </section>
      }

      <!-- Step 3: Timeline & Scope Priority -->
      @if (currentStep === 3) {
        <section class="estimator-step-content" aria-labelledby="step3-heading">
          <h3 id="step3-heading" class="step-title">Step 3: What is your preferred delivery timeline?</h3>
          <div class="options-grid timeline-grid">
            @for (tl of timelineOptions; track tl.id) {
              <div class="option-card timeline-card" [class.selected]="selectedTimeline === tl.id" (click)="selectTimeline(tl.id)" (keydown.enter)="selectTimeline(tl.id)" tabindex="0" role="button">
                <span class="option-icon" aria-hidden="true">{{ tl.icon }}</span>
                <h4>{{ tl.title }}</h4>
                <p>{{ tl.desc }}</p>
                <div class="card-footer-tag">{{ tl.badge }}</div>
              </div>
            }
          </div>
          <div class="step-nav-actions">
            <button class="text-link" type="button" (click)="prevStep()">&larr; Back to Capabilities</button>
            <button class="button next-btn" type="button" (click)="calculateAndProceed()">
              View Estimate &amp; Summary &rarr;
            </button>
          </div>
        </section>
      }

      <!-- Step 4: Instant Calculation & Scope Unlock Form -->
      @if (currentStep === 4) {
        <section class="estimator-step-content" aria-labelledby="step4-heading">
          <div class="estimate-result-banner">
            <div class="estimate-figures">
              <span class="estimate-label">CALCULATED PROJECT ESTIMATE</span>
              <div class="estimate-price">{{ calculatedEstimateText }}</div>
              <p class="estimate-timeline">Estimated Timeline: <strong>{{ calculatedWeeks }}</strong> · Java 21 / Spring Boot &amp; Angular 22</p>
            </div>
            <div class="estimate-trust-badges">
              <div class="trust-pill"><span>🛡️</span> 100% Code Ownership</div>
              <div class="trust-pill"><span>💼</span> 40/40/20 Milestone Billing</div>
              <div class="trust-pill"><span>🔒</span> Mutual NDA on Request</div>
              <div class="trust-pill"><span>⚡</span> 30-Day Post-Launch SLA</div>
            </div>
          </div>

          <div class="estimate-scope-summary">
            <h4>Included Scope &amp; Modules:</h4>
            <div class="modules-tag-list">
              <span class="module-tag type-tag">📦 {{ selectedType?.name }}</span>
              @for (feat of selectedFeatures; track feat.id) {
                <span class="module-tag">✓ {{ feat.name }}</span>
              }
              <span class="module-tag">✓ Complete Source Code Handover</span>
              <span class="module-tag">✓ Database Migrations &amp; Deploy Script</span>
            </div>
          </div>

          @if (submitted) {
            <div class="estimator-success" role="status">
              <div class="success-icon">🎉</div>
              <h3>Your Project Scope &amp; Estimate Have Been Sent!</h3>
              <p>We received your specifications. Our senior engineering lead will review your requirements and reach out within 1 business day.</p>
              <div class="success-actions">
                <a [href]="whatsAppEstimatedUrl" target="_blank" rel="noopener noreferrer" class="button wa-button">
                  <span>Chat on WhatsApp with this Estimate 💬</span>
                </a>
                <button type="button" class="plain-button" (click)="resetEstimator()">Estimate Another Project</button>
              </div>
            </div>
          } @else {
            <div class="estimator-form-wrapper">
              <div class="form-intro">
                <h4>Unlock Detailed Scope Breakdown &amp; Schedule Discovery Call</h4>
                <p>Provide your contact details to save this estimate and schedule a free 30-minute technical roadmap call.</p>
              </div>

              <form (ngSubmit)="submitEstimateLead()" #leadForm="ngForm" novalidate>
                <div class="estimator-form-grid">
                  <label>
                    Full Name <span class="required">*</span>
                    <input type="text" [(ngModel)]="leadName" name="leadName" required minlength="2" placeholder="e.g. Rahul Sharma" autocomplete="name">
                  </label>
                  <label>
                    Phone / WhatsApp <span class="required">*</span>
                    <input type="tel" [(ngModel)]="leadPhone" name="leadPhone" required placeholder="e.g. +91 98765 43210" autocomplete="tel">
                  </label>
                  <label>
                    Work Email <span class="required">*</span>
                    <input type="email" [(ngModel)]="leadEmail" name="leadEmail" required email placeholder="e.g. rahul@company.com" autocomplete="email">
                  </label>
                  <label>
                    Company / Organization <span class="optional">(optional)</span>
                    <input type="text" [(ngModel)]="leadOrg" name="leadOrg" placeholder="e.g. Northline Tech Pvt Ltd">
                  </label>
                </div>

                <label class="full-field">
                  Additional Notes or Specific Requirements <span class="optional">(optional)</span>
                  <textarea rows="3" [(ngModel)]="leadNotes" name="leadNotes" placeholder="Any specific integrations, existing codebase constraints, or deadlines you want us to know about?"></textarea>
                </label>

                <label class="consent-label">
                  <input type="checkbox" [(ngModel)]="consentGiven" name="consentGiven" required>
                  <span>I agree to be contacted regarding this project estimate. We respect your privacy and never spam.</span>
                </label>

                @if (submitError) {
                  <p class="form-error" role="alert">{{ submitError }}</p>
                }

                <div class="form-submit-row">
                  <button type="submit" class="button submit-estimate-btn" [disabled]="submitting || !leadName || !leadEmail || !leadPhone || !consentGiven">
                    {{ submitting ? 'Submitting Estimate…' : 'Get Full Scope Breakdown & Quote ↗' }}
                  </button>
                  <a [href]="whatsAppEstimatedUrl" target="_blank" rel="noopener noreferrer" class="wa-quick-link">
                    Or discuss immediately on WhatsApp &rarr;
                  </a>
                </div>
              </form>
            </div>
          }
        </section>
      }
    </div>
  `,
  styles: [`
    .estimator-container {
      background: var(--surface, #111625);
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
      border-radius: 16px;
      padding: 2.5rem 2rem;
      max-width: 1200px;
      width: 100%;
      margin: 3rem auto;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
    }
    .estimator-header {
      text-align: center;
      max-width: 760px;
      margin: 0 auto 2.5rem auto;
    }
    .estimator-header h2 {
      font-size: 2rem;
      margin: 0.5rem 0 1rem 0;
      color: #fff;
    }
    .estimator-subtitle {
      color: var(--text-muted, #94a3b8);
      font-size: 1.05rem;
      line-height: 1.6;
    }
    .estimator-stepper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2.5rem;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .step-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-muted, #94a3b8);
      font-size: 0.95rem;
      font-weight: 500;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      transition: all 0.2s ease;
    }
    .step-btn.active {
      color: #fff;
      background: rgba(59, 130, 246, 0.15);
    }
    .step-btn.completed {
      color: #60a5fa;
    }
    .step-circle {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      font-weight: 700;
    }
    .step-btn.active .step-circle {
      background: #3b82f6;
      color: #fff;
    }
    .step-btn.completed .step-circle {
      background: #10b981;
      color: #fff;
    }
    .step-line {
      width: 32px;
      height: 2px;
      background: rgba(255, 255, 255, 0.1);
    }
    .step-line.filled {
      background: #3b82f6;
    }
    .step-title {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
      color: #f1f5f9;
    }
    .step-hint {
      color: var(--text-muted, #94a3b8);
      margin-top: -0.75rem;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
    }
    .options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2rem;
    }
    .option-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 1.5rem;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      transition: all 0.2s ease;
      position: relative;
    }
    .option-card:hover {
      border-color: rgba(59, 130, 246, 0.5);
      background: rgba(59, 130, 246, 0.04);
      transform: translateY(-2px);
    }
    .option-card.selected {
      border-color: #3b82f6;
      background: rgba(59, 130, 246, 0.08);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    }
    .option-icon {
      font-size: 2rem;
      margin-bottom: 0.75rem;
    }
    .option-card h4 {
      margin: 0 0 0.5rem 0;
      font-size: 1.15rem;
      color: #fff;
    }
    .option-card p {
      color: var(--text-muted, #94a3b8);
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 1rem;
      flex-grow: 1;
    }
    .card-footer-tag {
      font-size: 0.8rem;
      font-weight: 600;
      color: #60a5fa;
      background: rgba(59, 130, 246, 0.1);
      padding: 0.3rem 0.6rem;
      border-radius: 6px;
      align-self: flex-start;
    }
    .features-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
    .feature-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 1.2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .feature-card:hover {
      border-color: rgba(59, 130, 246, 0.4);
    }
    .feature-card.selected {
      border-color: #3b82f6;
      background: rgba(59, 130, 246, 0.09);
    }
    .feature-checkbox {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #fff;
      font-size: 0.85rem;
    }
    .feature-card.selected .feature-checkbox {
      background: #3b82f6;
      border-color: #3b82f6;
    }
    .feature-copy {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      color: #f1f5f9;
      font-size: 0.95rem;
    }
    .step-nav-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .next-btn {
      min-width: 200px;
    }
    /* Step 4 Styles */
    .estimate-result-banner {
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95));
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 14px;
      padding: 2rem;
      margin-bottom: 2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 1.5rem;
    }
    .estimate-figures {
      flex: 1 1 320px;
    }
    .estimate-label {
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #94a3b8;
    }
    .estimate-price {
      font-size: 2.4rem;
      font-weight: 800;
      color: #38bdf8;
      margin: 0.4rem 0;
    }
    .estimate-timeline {
      color: #cbd5e1;
      font-size: 1rem;
      margin: 0;
    }
    .estimate-trust-badges {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
      flex: 1 1 300px;
    }
    .trust-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.6rem 0.9rem;
      border-radius: 8px;
      font-size: 0.85rem;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .estimate-scope-summary {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      padding: 1.25rem 1.5rem;
      margin-bottom: 2rem;
    }
    .estimate-scope-summary h4 {
      margin: 0 0 0.75rem 0;
      font-size: 1rem;
      color: #cbd5e1;
    }
    .modules-tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
    .module-tag {
      background: rgba(255, 255, 255, 0.06);
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      font-size: 0.85rem;
      color: #cbd5e1;
    }
    .module-tag.type-tag {
      background: rgba(59, 130, 246, 0.2);
      color: #93c5fd;
      font-weight: 600;
    }
    .estimator-form-wrapper {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 2rem;
    }
    .form-intro h4 {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      color: #fff;
    }
    .form-intro p {
      color: #94a3b8;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
    }
    .estimator-form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.25rem;
      margin-bottom: 1.25rem;
    }
    .estimator-form-grid label, .full-field {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      color: #cbd5e1;
      font-size: 0.9rem;
      font-weight: 500;
    }
    .full-field {
      margin-bottom: 1.25rem;
    }
    .estimator-form-grid input, .full-field textarea {
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #fff;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.95rem;
      font-family: inherit;
      transition: border-color 0.2s ease;
    }
    .estimator-form-grid input:focus, .full-field textarea:focus {
      outline: none;
      border-color: #3b82f6;
    }
    .required {
      color: #f87171;
    }
    .optional {
      color: #64748b;
      font-weight: normal;
      font-size: 0.8rem;
    }
    .consent-label {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      color: #94a3b8;
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
      cursor: pointer;
    }
    .consent-label input {
      margin-top: 0.2rem;
    }
    .form-submit-row {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .submit-estimate-btn {
      padding: 0.85rem 1.75rem;
      font-size: 1.05rem;
    }
    .wa-quick-link {
      color: #22c55e;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: color 0.2s ease;
    }
    .wa-quick-link:hover {
      text-decoration: underline;
    }
    .estimator-success {
      text-align: center;
      padding: 3rem 1.5rem;
      background: rgba(16, 185, 129, 0.05);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 12px;
    }
    .success-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .estimator-success h3 {
      font-size: 1.75rem;
      color: #10b981;
      margin-bottom: 0.75rem;
    }
    .estimator-success p {
      color: #cbd5e1;
      max-width: 600px;
      margin: 0 auto 2rem auto;
      font-size: 1rem;
      line-height: 1.6;
    }
    .success-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .wa-button {
      background: #16a34a !important;
      color: #fff !important;
    }
    .wa-button:hover {
      background: #15803d !important;
    }
    @media (max-width: 640px) {
      .estimator-container {
        padding: 1.5rem 1rem;
      }
      .estimate-result-banner {
        flex-direction: column;
        align-items: flex-start;
      }
      .estimate-trust-badges {
        grid-template-columns: 1fr;
        width: 100%;
      }
    }
  `]
})
export class ProjectEstimatorComponent {
  private readonly http = inject(HttpClient);
  readonly settings = inject(SiteSettingsService);

  currentStep = 1;

  readonly projectTypes: ProjectTypeOption[] = [
    {
      id: 'custom_web_app',
      name: 'Custom Web Application',
      description: 'Internal operations, workflow tools, portal, or ERP system built for your company.',
      baseMin: 150000,
      baseMax: 250000,
      baseWeeks: '4–6 Weeks',
      icon: '💻'
    },
    {
      id: 'saas_product',
      name: 'SaaS Cloud Platform',
      description: 'Multi-tenant product with subscription billing, tiers, and operator consoles.',
      baseMin: 250000,
      baseMax: 450000,
      baseWeeks: '6–10 Weeks',
      icon: '🚀'
    },
    {
      id: 'backend_api',
      name: 'Spring Boot REST API',
      description: 'High-performance Java backend, database schema, security, and microservices.',
      baseMin: 100000,
      baseMax: 180000,
      baseWeeks: '3–5 Weeks',
      icon: '⚙️'
    },
    {
      id: 'angular_frontend',
      name: 'Angular Enterprise Frontend',
      description: 'Responsive, accessible web application with SSR, forms, and API integrations.',
      baseMin: 100000,
      baseMax: 180000,
      baseWeeks: '3–5 Weeks',
      icon: '🎨'
    },
    {
      id: 'pos_integration',
      name: 'POS & Hardware Integration',
      description: 'Barcode scanning, thermal receipt printing, payment terminals & inventory sync.',
      baseMin: 80000,
      baseMax: 160000,
      baseWeeks: '2–4 Weeks',
      icon: '📟'
    }
  ];

  readonly availableFeatures: FeatureModuleOption[] = [
    { id: 'auth_rbac', name: 'User Auth & Role-Based Access (RBAC)', cost: 25000, icon: '🔐' },
    { id: 'billing_gst', name: 'Billing, Invoicing & GST Automation', cost: 40000, icon: '🧾' },
    { id: 'payments', name: 'Payment Gateway (Razorpay / Stripe)', cost: 30000, icon: '💳' },
    { id: 'barcode_pos', name: 'Barcode Scanner / POS Hardware Integration', cost: 35000, icon: '🏷️' },
    { id: 'analytics', name: 'Analytics Dashboard & Data Export', cost: 30000, icon: '📊' },
    { id: 'notifications', name: 'Email & WhatsApp Notification Dispatch', cost: 25000, icon: '🔔' },
    { id: 'devops_aws', name: 'Docker & AWS / VPS Cloud Deployment', cost: 30000, icon: '☁️' }
  ];

  readonly timelineOptions = [
    {
      id: 'rapid_mvp',
      title: 'Rapid MVP Launchpad',
      desc: 'Focus on core workflows to launch fast and onboard initial users.',
      badge: '3–5 Weeks Delivery',
      icon: '⚡',
      multiplier: 1.0
    },
    {
      id: 'full_platform',
      title: 'Comprehensive Product Build',
      desc: 'Full feature set, advanced reporting, thorough QA and production hardening.',
      badge: '6–10 Weeks Delivery',
      icon: '🏗️',
      multiplier: 1.2
    },
    {
      id: 'flexible',
      title: 'Flexible Milestone Pace',
      desc: 'Iterative sprints shaped around your team availability and roadmap.',
      badge: 'Milestone-Based',
      icon: '🗓️',
      multiplier: 1.0
    }
  ];

  selectedType: ProjectTypeOption | null = this.projectTypes[0];
  selectedFeatures: FeatureModuleOption[] = [this.availableFeatures[0], this.availableFeatures[1]];
  selectedTimeline = 'rapid_mvp';

  calculatedMin = 180000;
  calculatedMax = 280000;
  calculatedWeeks = '4–6 Weeks';
  calculatedEstimateText = '₹1.8L – ₹2.8L';

  leadName = '';
  leadPhone = '';
  leadEmail = '';
  leadOrg = '';
  leadNotes = '';
  consentGiven = true;

  submitting = false;
  submitted = false;
  submitError = '';

  selectType(opt: ProjectTypeOption): void {
    this.selectedType = opt;
  }

  isFeatureSelected(id: string): boolean {
    return this.selectedFeatures.some(f => f.id === id);
  }

  toggleFeature(feature: FeatureModuleOption): void {
    if (this.isFeatureSelected(feature.id)) {
      this.selectedFeatures = this.selectedFeatures.filter(f => f.id !== feature.id);
    } else {
      this.selectedFeatures = [...this.selectedFeatures, feature];
    }
  }

  selectTimeline(id: string): void {
    this.selectedTimeline = id;
  }

  goToStep(step: number): void {
    this.currentStep = step;
    if (step === 4) {
      this.recalculate();
    }
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.goToStep(this.currentStep + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1);
    }
  }

  calculateAndProceed(): void {
    this.recalculate();
    this.currentStep = 4;
  }

  recalculate(): void {
    const baseMin = this.selectedType ? this.selectedType.baseMin : 150000;
    const baseMax = this.selectedType ? this.selectedType.baseMax : 250000;

    const featuresCost = this.selectedFeatures.reduce((acc, curr) => acc + curr.cost, 0);
    const selectedTl = this.timelineOptions.find(t => t.id === this.selectedTimeline);
    const mult = selectedTl ? selectedTl.multiplier : 1.0;

    this.calculatedMin = Math.round((baseMin + featuresCost) * mult);
    this.calculatedMax = Math.round((baseMax + featuresCost * 1.25) * mult);

    const minL = (this.calculatedMin / 100000).toFixed(1);
    const maxL = (this.calculatedMax / 100000).toFixed(1);
    this.calculatedEstimateText = `₹${minL}L – ₹${maxL}L`;

    if (this.selectedTimeline === 'rapid_mvp') {
      this.calculatedWeeks = '3–5 Weeks';
    } else if (this.selectedTimeline === 'full_platform') {
      this.calculatedWeeks = '6–10 Weeks';
    } else {
      this.calculatedWeeks = '4–8 Weeks';
    }
  }

  get whatsAppEstimatedUrl(): string {
    const typeName = this.selectedType?.name || 'Software Project';
    const featureList = this.selectedFeatures.map(f => f.name).join(', ') || 'Core workflows';
    const text = encodeURIComponent(
      `Hi, I calculated an estimate for a ${typeName}.\n` +
      `Features: ${featureList}\n` +
      `Estimated budget: ${this.calculatedEstimateText} (${this.calculatedWeeks}).\n` +
      `My name is ${this.leadName || 'a visitor'}. Please share next steps.`
    );
    return `https://wa.me/917013631398?text=${text}`;
  }

  submitEstimateLead(): void {
    if (!this.leadName || !this.leadPhone || !this.leadEmail || !this.consentGiven || this.submitting) {
      return;
    }
    this.submitting = true;
    this.submitError = '';

    const featureNames = this.selectedFeatures.map(f => f.name).join(', ');
    const fullMessage =
      `[Instant Estimator Lead]\n` +
      `Platform: ${this.selectedType?.name}\n` +
      `Phone/WhatsApp: ${this.leadPhone}\n` +
      `Estimated Budget: ${this.calculatedEstimateText} (${this.calculatedWeeks})\n` +
      `Selected Features: ${featureNames}\n` +
      (this.leadNotes ? `Additional Notes: ${this.leadNotes}` : '');

    const payload = {
      name: this.leadName.trim(),
      email: this.leadEmail.trim().toLowerCase(),
      phone: this.leadPhone.trim(),
      organization: this.leadOrg ? this.leadOrg.trim() : null,
      projectType: this.selectedType?.id || 'custom_software',
      timeline: this.calculatedWeeks,
      budgetRange: this.calculatedEstimateText,
      message: fullMessage,
      consentToContact: true,
      sourcePath: window.location.pathname || '/estimator'
    };

    this.http.post('/api/v1/leads', payload).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
      },
      error: () => {
        this.submitting = false;
        this.submitError = 'Could not save your estimate. Please message us directly on WhatsApp or try again.';
      }
    });
  }

  resetEstimator(): void {
    this.currentStep = 1;
    this.submitted = false;
    this.leadName = '';
    this.leadPhone = '';
    this.leadEmail = '';
    this.leadOrg = '';
    this.leadNotes = '';
  }
}
