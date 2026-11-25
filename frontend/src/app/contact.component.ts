import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SiteSettingsService } from './site-settings.service';

@Component({
  selector: 'site-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <!-- Cosmic Midnight Blue Hero Section with Curved Separator -->
    <section class="contact-hero">
      <div class="hero-content-wrapper">
        <!-- Breadcrumb -->
        <nav class="hero-breadcrumb" aria-label="Breadcrumb">
          <a routerLink="/">Home</a>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">Contact Us</span>
        </nav>

        <!-- Eyebrow Pill Badge -->
        <div class="hero-eyebrow-pill">
          <span class="blue-dot" aria-hidden="true"></span>
          <span>GET IN TOUCH</span>
        </div>

        <!-- Main Headline with Gradient Text Accent -->
        <h1 class="hero-title">
          Let's Build Something <span class="gradient-accent">Great Together</span>
        </h1>

        <!-- Subtitle -->
        <p class="hero-subtitle">
          Tell us about your project and we'll get back to you within 24 hours. Free consultation — no commitment required.
        </p>

        <!-- Hero Action Pill Buttons -->
        <div class="hero-cta-group">
          <a [href]="settings.whatsappUrl" target="_blank" rel="noopener noreferrer" class="pill-btn-whatsapp">
            Chat on WhatsApp
          </a>
          <a [href]="'tel:' + settings.phone.replaceAll(' ', '')" class="pill-btn-call">
            Call Us Now →
          </a>
        </div>
      </div>
    </section>

    <!-- Light Theme Main Body Section -->
    <section class="contact-body-section">
      <div class="contact-body-container">
        <!-- Asymmetric Two-Column Grid: Left Channels, Right Form Card -->
        <div class="contact-split-grid">
          
          <!-- Left Column: Contact Channels matching tech2software.com -->
          <aside class="contact-channels-column" aria-label="Direct contact channels">
            <div class="cp-cards">
              <!-- Card 1: Email -->
              <a [href]="'mailto:' + settings.email" class="cp-card">
                <div class="cp-icon blue" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div class="cp-info">
                  <span class="cp-label">EMAIL US</span>
                  <span class="cp-value">{{ settings.email }}</span>
                  <span class="cp-sub">We reply within 24 hours.</span>
                </div>
              </a>

              <!-- Card 2: Call Us -->
              <a [href]="'tel:' + settings.phone.replaceAll(' ', '')" class="cp-card">
                <div class="cp-icon green" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div class="cp-info">
                  <span class="cp-label">CALL US</span>
                  <span class="cp-value">{{ settings.phone }}</span>
                  <span class="cp-sub">Mon–Sat: 9:00 AM – 7:00 PM</span>
                </div>
              </a>

              <!-- Card 3: WhatsApp -->
              <a [href]="settings.whatsappUrl" target="_blank" rel="noopener noreferrer" class="cp-card cp-card-wa">
                <div class="cp-icon wa" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2M12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C16.58 3.67 20.28 7.37 20.28 11.91C20.28 16.46 16.58 20.15 12.04 20.15M16.57 14.33C16.32 14.2 15.1 13.61 14.88 13.52C14.65 13.44 14.49 13.4 14.32 13.65C14.16 13.9 13.69 14.45 13.55 14.61C13.41 14.77 13.27 14.79 13.02 14.66C12.78 14.54 11.99 14.28 11.06 13.45C10.33 12.8 9.84 12 9.7 11.75C9.56 11.5 9.68 11.37 9.81 11.24C9.92 11.13 10.05 10.96 10.18 10.81C10.3 10.66 10.34 10.55 10.42 10.39C10.5 10.22 10.46 10.08 10.4 9.96C10.34 9.84 9.85 8.63 9.64 8.14C9.44 7.66 9.24 7.72 9.09 7.71H8.62C8.46 7.71 8.19 7.77 7.96 8.02C7.73 8.27 7.09 8.87 7.09 10.09C7.09 11.31 7.98 12.49 8.1 12.65C8.22 12.82 9.86 15.34 12.37 16.42C12.97 16.68 13.43 16.83 13.8 16.95C14.4 17.14 14.94 17.11 15.37 17.05C15.86 16.98 16.87 16.44 17.08 15.85C17.28 15.27 17.28 14.77 17.22 14.66C17.16 14.56 17.01 14.48 16.77 14.36"/>
                  </svg>
                </div>
                <div class="cp-info">
                  <span class="cp-label">WHATSAPP</span>
                  <span class="cp-value">{{ settings.phone }}</span>
                  <span class="cp-sub">Fastest way to reach us</span>
                </div>
              </a>

              <!-- Card 4: Visit Us / Office -->
              <div class="cp-card">
                <div class="cp-icon pink" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div class="cp-info">
                  <span class="cp-label">VISIT US</span>
                  <span class="cp-value">Hi-Tech City, Hyderabad &amp; Bengaluru</span>
                  <span class="cp-sub">By appointment only · Corporate &amp; GST Invoicing</span>
                </div>
              </div>

              <!-- Card 5: Working Hours -->
              <div class="cp-card">
                <div class="cp-icon orange" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div class="cp-info">
                  <span class="cp-label">WORKING HOURS</span>
                  <span class="cp-value">Mon–Sat: 9:00 AM – 7:00 PM</span>
                  <span class="cp-sub">Closed on Sundays</span>
                </div>
              </div>
            </div>

            <!-- Social Action Row & Map Container -->
            <div class="cp-social-row">
              <a [href]="settings.whatsappUrl" target="_blank" rel="noopener noreferrer" class="cp-soc-btn">
                <span>💬</span> WhatsApp Direct
              </a>
              <a [href]="'tel:' + settings.phone.replaceAll(' ', '')" class="cp-soc-btn">
                <span>📞</span> Quick Call
              </a>
            </div>

            <!-- Map Card matching tech2software -->
            <div class="cp-map-box">
              <div class="map-inner-placeholder">
                <span class="map-pin-icon">📍</span>
                <span class="map-loc-name">Hi-Tech City Technology Corridor</span>
                <span class="map-loc-city">Hyderabad &amp; Bengaluru, India</span>
                <a href="https://maps.google.com/?q=Hi-Tech+City+Hyderabad" target="_blank" rel="noopener noreferrer" class="map-open-link">
                  Open in Maps ↗
                </a>
              </div>
            </div>
          </aside>

          <!-- Right Column: Main Contact Form Card matching tech2software -->
          <main class="contact-form-column">
            @if (sent) {
              <div class="form-card form-success-card" role="status" tabindex="-1">
                <div class="success-icon-badge">🎉</div>
                <h2>Thank You for Reaching Out!</h2>
                <p>Your enquiry has been received and assigned to our senior technical lead. We will review your project requirements and get back to you within 24 hours.</p>
                <div class="success-wa-row">
                  <a [href]="settings.whatsappUrl" target="_blank" rel="noopener noreferrer" class="pill-btn-whatsapp">
                    Need immediate answers? Continue on WhatsApp 💬
                  </a>
                </div>
              </div>
            } @else {
              <div class="form-card">
                <div class="form-card-header">
                  <h2>Send Us a Message</h2>
                  <p>Fill in the form below and our team will get back to you within 24 hours.</p>
                </div>

                <!-- WhatsApp Solid Emerald Gradient Banner matching tech2software -->
                <a [href]="settings.whatsappUrl" target="_blank" rel="noopener noreferrer" class="prefer-wa-banner">
                  <div class="wa-banner-flex">
                    <span class="wa-banner-bubble">💬</span>
                    <div class="wa-banner-text-block">
                      <span class="wa-banner-title">Prefer WhatsApp?</span>
                      <span class="wa-banner-sub">Tap to start a conversation instantly →</span>
                    </div>
                  </div>
                </a>

                <form [formGroup]="form" (ngSubmit)="submit()" (submit)="$event.preventDefault()" novalidate>
                  <div class="form-row">
                    <div class="form-group">
                      <label for="name">Full Name <span class="required">*</span></label>
                      <input id="name" formControlName="name" autocomplete="name" maxlength="100" placeholder="John Doe" required />
                      <small class="error-msg">{{ error('name') }}</small>
                    </div>

                    <div class="form-group">
                      <label for="phone">Phone / WhatsApp <span class="required">*</span></label>
                      <input id="phone" type="tel" formControlName="phone" autocomplete="tel" inputmode="tel" maxlength="40" placeholder="+91 98765 43210" required />
                      <small class="error-msg">{{ error('phone') }}</small>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label for="email">Email Address <span class="required">*</span></label>
                      <input id="email" type="email" formControlName="email" autocomplete="email" maxlength="254" placeholder="john@example.com" required />
                      <small class="error-msg">{{ error('email') }}</small>
                    </div>

                    <div class="form-group">
                      <label for="projectType">Service Interested In <span class="required">*</span></label>
                      <select id="projectType" formControlName="projectType" required>
                        <option value="" disabled>Select a service...</option>
                        <option value="custom_software">Custom Software &amp; ERP Development</option>
                        <option value="saas_product">SaaS Product &amp; Cloud Platform</option>
                        <option value="spring_boot_api">Java &amp; Spring Boot Backend APIs</option>
                        <option value="angular_frontend">Angular Enterprise Web Application</option>
                        <option value="system_pos">Barcode &amp; Hardware POS Integration</option>
                        <option value="cloud_devops">Cloud Hosting, Docker &amp; DevOps SLA</option>
                        <option value="discovery_sprint">Architecture Discovery &amp; Scope Review</option>
                        <option value="dedicated_pod">Dedicated Monthly Engineering Pod</option>
                        <option value="other">Other / General Consultation</option>
                      </select>
                      <small class="error-msg">{{ error('projectType') }}</small>
                    </div>
                  </div>

                  <div class="form-row full-width-row">
                    <div class="form-group full-width">
                      <label for="budgetRange">Estimated Budget <span class="optional">(optional)</span></label>
                      <select id="budgetRange" formControlName="budgetRange">
                        <option value="">Select budget range...</option>
                        <option value="under_50k">Under ₹50,000 (Starter)</option>
                        <option value="50k_to_150k">₹50,000 – ₹1,50,000 (Growth MVP)</option>
                        <option value="150k_to_400k">₹1,50,000 – ₹4,00,000 (Custom Build / SaaS MVP)</option>
                        <option value="400k_to_1000k">₹4,00,000 – ₹10,00,000 (Enterprise Scale)</option>
                        <option value="1000k_plus">₹10,00,000+ (High-Scale Distributed Platform)</option>
                        <option value="monthly_retainer">Monthly Retainer / Dedicated Pod</option>
                        <option value="undecided">Not sure yet / Prefer consultation</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group full-width">
                    <label for="message">Tell Us About Your Project <span class="required">*</span></label>
                    <textarea
                      id="message"
                      formControlName="message"
                      rows="5"
                      minlength="5"
                      maxlength="5000"
                      placeholder="Describe your project, goals, and any specific requirements..."
                      required></textarea>
                    <small class="error-msg">{{ error('message') }}</small>
                  </div>

                  <div class="consent-row">
                    <label class="checkbox-label">
                      <input type="checkbox" formControlName="consentToContact" />
                      <span>I agree to be contacted regarding this project enquiry. Mutual NDA signed before detailed specifications on request. <span class="required">*</span></span>
                    </label>
                  </div>

                  <!-- Honeypot -->
                  <input
                    type="text"
                    formControlName="website"
                    tabindex="-1"
                    autocomplete="off"
                    aria-hidden="true"
                    style="position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0;" />

                  @if (errorMessage) {
                    <div class="form-error-alert" role="alert">
                      {{ errorMessage }}
                    </div>
                  }

                  <div class="form-submit-row">
                    <button class="t2-send-btn" type="submit" [disabled]="submitting">
                      {{ submitting ? 'Sending Message…' : 'Send Message' }}
                    </button>
                    <p class="direct-email-footnote">
                      Or email us directly at <a [href]="'mailto:' + settings.email">{{ settings.email }}</a>
                    </p>
                  </div>
                </form>
              </div>
            }
          </main>
        </div>

        <!-- Micro-FAQ Accordion Section on Light Background -->
        <div class="contact-faq-wrapper">
          <div class="faq-intro">
            <p class="faq-eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2>Common Questions Before Reaching Out</h2>
          </div>

          <div class="faq-grid">
            <div class="faq-card">
              <h3>⏱️ How quickly do you respond?</h3>
              <p>We review and respond to all project inquiries within 24 hours on business days. If you require immediate answers or want to discuss a live issue, WhatsApp is our fastest channel.</p>
            </div>

            <div class="faq-card">
              <h3>💰 Do you provide free quotes and architecture consultations?</h3>
              <p>Yes. All initial project consultations, architecture reviews, and milestone quotes are 100% free with zero obligation to proceed.</p>
            </div>

            <div class="faq-card">
              <h3>🌍 Do you work with clients outside India?</h3>
              <p>Absolutely. We partner with founders and enterprise companies globally across North America, the UK, Europe, Australia, and the Middle East, managing delivery via scheduled video calls, bi-weekly demos, and transparent Git repositories.</p>
            </div>

            <div class="faq-card">
              <h3>📝 What information should I share for the most accurate quote?</h3>
              <p>Briefly outline your core workflows, target users, required integrations (e.g. payment gateways, POS hardware, or CRM), expected launch timeline, and ballpark budget. If you have an existing wireframe or PRD, you can share it directly during our consultation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Dark Trust Strip -->
    <section class="contact-trust-strip">
      <div class="strip-item">🛡️ Secure Cloud Infrastructure</div>
      <div class="strip-item">🔒 Mutual NDA Friendly</div>
      <div class="strip-item">⚡ Enterprise Ready Delivery</div>
      <div class="strip-item">🧾 GST &amp; Corporate Invoicing Available</div>
    </section>
  `,
  styles: [`
    /* =========================================================================
       1. Cosmic Midnight Hero Section
       ========================================================================= */
    .contact-hero {
      position: relative;
      background: linear-gradient(135deg, #0a1628 0%, #0d2447 40%, #0f3060 100%);
      padding: 5rem 1.5rem 6.5rem 1.5rem;
      text-align: center;
      overflow: hidden;
    }

    .contact-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(29, 112, 245, 0.22) 0%, transparent 65%);
      pointer-events: none;
    }

    .contact-hero::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: #f8fafd;
      clip-path: ellipse(55% 100% at 50% 100%);
      z-index: 2;
    }

    .hero-content-wrapper {
      max-width: 900px;
      margin: 0 auto;
      position: relative;
      z-index: 3;
    }

    /* Breadcrumbs */
    .hero-breadcrumb {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 0.88rem;
      color: #94a3b8;
      margin-bottom: 1.25rem;
    }

    .hero-breadcrumb a {
      color: #cbd5e1;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .hero-breadcrumb a:hover {
      color: #38bdf8;
    }

    .breadcrumb-separator {
      color: #64748b;
      font-size: 0.85rem;
    }

    .breadcrumb-current {
      color: #f8fafc;
      font-weight: 600;
    }

    /* Eyebrow Pill Badge */
    .hero-eyebrow-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(56, 189, 248, 0.28);
      border-radius: 9999px;
      padding: 0.4rem 1.15rem;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: #cbd5e1;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
    }

    .blue-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #38bdf8;
      box-shadow: 0 0 8px #38bdf8;
      display: inline-block;
    }

    /* Headline with Gradient */
    .hero-title {
      font-size: clamp(2.2rem, 4.5vw, 3.4rem);
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.03em;
      line-height: 1.18;
      margin: 0 auto 1.25rem auto;
      max-width: 920px;
    }

    .gradient-accent {
      background: linear-gradient(135deg, #60a5fa 0%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: inline-block;
    }

    /* Subtitle */
    .hero-subtitle {
      font-size: clamp(1rem, 1.8vw, 1.18rem);
      color: #cbd5e1;
      max-width: 680px;
      margin: 0 auto 2.25rem auto;
      line-height: 1.6;
    }

    /* Dual Action Pill Buttons */
    .hero-cta-group {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.1rem;
      flex-wrap: wrap;
    }

    .pill-btn-whatsapp {
      background: #2563eb;
      color: #ffffff !important;
      font-weight: 700;
      font-size: 1rem;
      padding: 0.85rem 2.2rem;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 4px 18px rgba(37, 99, 235, 0.45);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .pill-btn-whatsapp:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 8px 26px rgba(37, 99, 235, 0.55);
    }

    .pill-btn-call {
      background: rgba(15, 23, 42, 0.6);
      color: #f8fafc !important;
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      font-weight: 600;
      font-size: 1rem;
      padding: 0.85rem 2.2rem;
      border-radius: 9999px;
      text-decoration: none;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(8px);
    }

    .pill-btn-call:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.45);
      transform: translateY(-2px);
    }

    /* =========================================================================
       2. Light Theme Body Section
       ========================================================================= */
    .contact-body-section {
      background: #f8fafd;
      padding: 3rem 1.5rem 5rem 1.5rem;
      color: #0f172a;
    }

    .contact-body-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Asymmetric 2-Column Grid */
    .contact-split-grid {
      display: grid;
      grid-template-columns: 360px 1fr;
      gap: 2.25rem;
      align-items: start;
      margin-bottom: 4rem;
    }

    /* Left Column: Direct Channels */
    .contact-channels-column {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .cp-cards {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .cp-card {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      padding: 18px 20px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      text-decoration: none;
      color: #0f172a;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
    }

    .cp-card:hover {
      border-color: #2563eb;
      box-shadow: 0 6px 18px rgba(37, 99, 235, 0.12);
      transform: translateX(4px);
    }

    .cp-card-wa {
      border-color: rgba(37, 211, 102, 0.4);
    }

    .cp-card-wa:hover {
      border-color: #22c55e;
      box-shadow: 0 6px 18px rgba(34, 197, 94, 0.15);
    }

    .cp-icon {
      width: 48px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cp-icon svg {
      width: 22px;
      height: 22px;
    }

    .cp-icon.blue   { background: linear-gradient(135deg, #046bd2, #0ea5e9); color: #ffffff; }
    .cp-icon.green  { background: linear-gradient(135deg, #16a34a, #22c55e); color: #ffffff; }
    .cp-icon.wa     { background: linear-gradient(135deg, #25d366, #128c7e); color: #ffffff; }
    .cp-icon.pink   { background: linear-gradient(135deg, #ec4899, #db2777); color: #ffffff; }
    .cp-icon.orange { background: linear-gradient(135deg, #f97316, #ea580c); color: #ffffff; }

    .cp-info {
      display: flex;
      flex-direction: column;
    }

    .cp-label {
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 3px;
    }

    .cp-value {
      font-size: 1rem;
      font-weight: 700;
      color: #0f172a;
      display: block;
    }

    .cp-sub {
      font-size: 0.82rem;
      color: #64748b;
      margin-top: 2px;
    }

    /* Social Row below Cards */
    .cp-social-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 2px;
    }

    .cp-soc-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border: 1.5px solid #e2e8f0;
      border-radius: 9999px;
      font-size: 0.88rem;
      font-weight: 700;
      color: #0f172a;
      background: #ffffff;
      text-decoration: none;
      transition: all 0.2s ease;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.03);
    }

    .cp-soc-btn:hover {
      border-color: #2563eb;
      color: #2563eb;
      background: #eff6ff;
      transform: translateY(-1px);
    }

    /* Map Box matching tech2software */
    .cp-map-box {
      margin-top: 6px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 22px;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
      background-image: radial-gradient(#cbd5e1 1.2px, transparent 1.2px);
      background-size: 16px 16px;
      background-color: #f8fafc;
    }

    .map-inner-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 12px 6px;
    }

    .map-pin-icon {
      font-size: 2rem;
      margin-bottom: 6px;
    }

    .map-loc-name {
      font-weight: 800;
      font-size: 0.98rem;
      color: #0f172a;
      margin-bottom: 2px;
    }

    .map-loc-city {
      font-size: 0.82rem;
      color: #64748b;
      margin-bottom: 14px;
    }

    .map-open-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: #ffffff;
      border: 1.5px solid #2563eb;
      border-radius: 9999px;
      font-size: 0.82rem;
      font-weight: 700;
      color: #2563eb;
      text-decoration: none;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
      transition: all 0.2s ease;
    }

    .map-open-link:hover {
      background: #2563eb;
      color: #ffffff;
      transform: translateY(-1px);
    }

    /* Right Column: Main Form Card */
    .contact-form-column {
      width: 100%;
    }

    .form-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 22px;
      padding: 2.5rem;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    }

    .form-card-header {
      margin-bottom: 1.5rem;
    }

    .form-card-header h2 {
      font-size: 1.8rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 0.4rem 0;
    }

    .form-card-header p {
      color: #64748b;
      font-size: 0.95rem;
      margin: 0;
    }

    /* WhatsApp Banner Shortcut matching tech2software */
    .prefer-wa-banner {
      display: block;
      background: linear-gradient(135deg, #059669 0%, #10b981 100%);
      border-radius: 12px;
      padding: 14px 20px;
      margin-bottom: 2rem;
      text-decoration: none;
      box-shadow: 0 4px 16px rgba(16, 185, 129, 0.25);
      transition: all 0.2s ease;
    }

    .prefer-wa-banner:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
    }

    .wa-banner-flex {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .wa-banner-bubble {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .wa-banner-text-block {
      display: flex;
      flex-direction: column;
    }

    .wa-banner-title {
      font-weight: 800;
      font-size: 1rem;
      color: #ffffff;
    }

    .wa-banner-sub {
      font-size: 0.86rem;
      color: rgba(255, 255, 255, 0.92);
      margin-top: 2px;
    }

    /* Form Grid & Inputs */
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      margin-bottom: 1.25rem;
    }

    .form-row.full-width-row {
      grid-template-columns: 1fr;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group.full-width {
      margin-bottom: 1.25rem;
    }

    .form-group label {
      font-size: 0.88rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.4rem;
    }

    .required {
      color: #e11d48;
    }

    .optional {
      color: #94a3b8;
      font-weight: normal;
      font-size: 0.8rem;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-radius: 10px;
      color: #0f172a;
      padding: 0.8rem 1rem;
      font-size: 0.95rem;
      font-family: inherit;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      background: #ffffff;
      border-color: #2563eb;
      box-shadow: 0 0 0 3.5px rgba(37, 99, 235, 0.15);
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
      color: #94a3b8;
    }

    .error-msg {
      color: #e11d48;
      font-size: 0.8rem;
      margin-top: 0.25rem;
      min-height: 1.1rem;
    }

    .consent-row {
      margin-bottom: 1.5rem;
    }

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: 0.65rem;
      font-size: 0.85rem;
      color: #475569;
      line-height: 1.4;
      cursor: pointer;
    }

    .checkbox-label input {
      margin-top: 0.2rem;
      accent-color: #2563eb;
    }

    .form-error-alert {
      background: #fff1f2;
      border: 1px solid #fecdd3;
      color: #be123c;
      padding: 0.85rem 1.1rem;
      border-radius: 10px;
      font-size: 0.9rem;
      margin-bottom: 1.25rem;
    }

    .form-submit-row {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }

    .t2-send-btn {
      width: 100%;
      background: #1d70f5;
      color: #ffffff;
      font-weight: 700;
      font-size: 1.05rem;
      padding: 1.05rem;
      border-radius: 50px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 18px rgba(29, 112, 245, 0.35);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .t2-send-btn:hover:not(:disabled) {
      background: #155bc9;
      transform: translateY(-2px);
      box-shadow: 0 8px 26px rgba(29, 112, 245, 0.45);
    }

    .t2-send-btn:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }

    .direct-email-footnote {
      text-align: center;
      font-size: 0.88rem;
      color: #64748b;
      margin: 0.5rem 0 0 0;
    }

    .direct-email-footnote a {
      color: #2563eb;
      font-weight: 700;
      text-decoration: underline;
    }

    /* Success State Card */
    .form-success-card {
      text-align: center;
      padding: 3.5rem 2rem;
    }

    .success-icon-badge {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .form-success-card h2 {
      font-size: 2rem;
      color: #0f172a;
      margin-bottom: 0.6rem;
    }

    .form-success-card p {
      color: #475569;
      max-width: 600px;
      margin: 0 auto 2rem auto;
      line-height: 1.6;
    }

    .success-wa-row {
      display: flex;
      justify-content: center;
    }

    /* =========================================================================
       3. Micro-FAQ Accordion Section
       ========================================================================= */
    .contact-faq-wrapper {
      margin-top: 2rem;
      padding-top: 3.5rem;
      border-top: 1px solid #e2e8f0;
    }

    .faq-intro {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .faq-eyebrow {
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: #2563eb;
      text-transform: uppercase;
      margin-bottom: 0.4rem;
    }

    .faq-intro h2 {
      font-size: 1.85rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }

    .faq-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .faq-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 1.5rem 1.75rem;
      box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
    }

    .faq-card h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
    }

    .faq-card p {
      font-size: 0.9rem;
      color: #64748b;
      line-height: 1.6;
      margin: 0;
    }

    /* =========================================================================
       4. Bottom Dark Trust Strip
       ========================================================================= */
    .contact-trust-strip {
      background: #0f172a;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 1.6rem 1.5rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      font-size: 0.88rem;
      color: #94a3b8;
      font-weight: 500;
    }

    /* =========================================================================
       Responsive Adjustments
       ========================================================================= */
    @media (max-width: 960px) {
      .contact-split-grid {
        grid-template-columns: 1fr;
      }
      .contact-channels-column {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      }
    }

    @media (max-width: 768px) {
      .contact-hero {
        padding: 3rem 1rem 5.5rem 1rem;
      }
      .hero-title {
        font-size: clamp(1.65rem, 7vw, 2.2rem) !important;
        line-height: 1.22;
        word-break: break-word;
      }
      .hero-subtitle {
        font-size: 0.95rem;
        padding: 0 0.5rem;
      }
      .hero-cta-group {
        flex-direction: column;
        width: 100%;
        gap: 0.75rem;
      }
      .pill-btn-whatsapp,
      .pill-btn-call {
        width: 100%;
        box-sizing: border-box;
      }
      .contact-body-section {
        padding: 2rem 1rem 4rem 1rem;
      }
      .contact-channels-column {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .form-row {
        grid-template-columns: 1fr;
      }
      .faq-grid {
        grid-template-columns: 1fr;
      }
      .form-card {
        padding: 1.5rem 1.15rem;
      }
      .contact-trust-strip {
        flex-direction: column;
        gap: 0.75rem;
        text-align: center;
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  readonly settings = inject(SiteSettingsService);
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(40)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    organization: ['', Validators.maxLength(150)],
    projectType: ['', Validators.required],
    budgetRange: [''],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
    consentToContact: [false, Validators.requiredTrue],
    website: ['']
  });

  submitting = false;
  sent = false;
  errorMessage = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['service']) {
        const slug = params['service'];
        const matched = this.mapSlugToProjectType(slug);
        if (matched) {
          this.form.patchValue({
            projectType: matched,
            message: `Hi, I am interested in discussing a project for ${slug.replace(/-/g, ' ')}. Please share details on timeline, architecture, and quote.`
          });
        }
      }
      if (params['package']) {
        const pkg = params['package'];
        this.form.patchValue({
          message: `Hi, I would like to discuss the "${pkg}" package for our software requirements.`
        });
      }
    });
  }

  private mapSlugToProjectType(slug: string): string {
    if (slug.includes('saas')) return 'saas_product';
    if (slug.includes('spring-boot')) return 'spring_boot_api';
    if (slug.includes('angular') || slug.includes('web')) return 'angular_frontend';
    if (slug.includes('mobile') || slug.includes('app')) return 'mobile_app';
    if (slug.includes('hardware') || slug.includes('integration') || slug.includes('pos')) return 'system_pos';
    if (slug.includes('cloud') || slug.includes('devops')) return 'cloud_devops';
    if (slug.includes('discovery')) return 'discovery_sprint';
    return 'custom_software';
  }

  error(field: string): string {
    const control = this.form.get(field);
    if (!control?.touched || !control.invalid) return '';
    if (control.hasError('required') || control.hasError('requiredTrue')) return 'This field is required.';
    if (control.hasError('email')) return 'Enter a valid email address.';
    if (control.hasError('minlength')) return `Enter at least ${control.getError('minlength').requiredLength} characters.`;
    return 'Please check this field.';
  }

  submit(): void {
    this.form.markAllAsTouched();
    this.errorMessage = '';
    if (this.form.invalid || this.submitting) return;
    this.submitting = true;

    const val = this.form.getRawValue();

    const payload = {
      name: val.name,
      email: val.email,
      phone: val.phone,
      organization: val.organization,
      projectType: val.projectType,
      timeline: 'Standard',
      budgetRange: val.budgetRange,
      message: val.message,
      consentToContact: val.consentToContact,
      sourcePath: window.location.pathname,
      website: val.website
    };

    this.http.post('/api/v1/leads', payload).subscribe({
      next: () => {
        this.sent = true;
        this.submitting = false;
      },
      error: (error) => {
        this.errorMessage = error.status === 429
          ? 'Too many attempts. Please wait a few minutes or contact us directly on WhatsApp.'
          : 'We could not send your enquiry just now. Please try again or chat with us directly on WhatsApp.';
        this.submitting = false;
      }
    });
  }
}
