import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SiteSettingsService } from './site-settings.service';

@Component({
  selector: 'site-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <!-- Top Announcement & Capacity Ticker Strip -->
    <div class="top-status-bar">
      <div class="top-status-inner">
        <div class="status-ticker">
          <span class="ticker-pulse"></span>
          <span class="ticker-text">⚡ Q4 Slots Open · Active Engineering Pods Available</span>
        </div>
        <div class="top-actions">
          <a [href]="settings.whatsappUrl" target="_blank" rel="noopener noreferrer" class="top-link">💬 WhatsApp Direct</a>
          <span class="top-sep">·</span>
          <a [href]="'tel:' + settings.phone.replaceAll(' ', '')" class="top-link">📞 {{ settings.phone }}</a>
        </div>
      </div>
    </div>

    <header class="site-header">
      <div class="header-inner">
        <a class="brand" routerLink="/" (click)="closeMobileMenu()" aria-label="Northline Software home">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="brandLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#2563eb" />
                  <stop offset="100%" stop-color="#0284c7" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="17" fill="url(#brandLogoGrad)" />
              <rect x="16" y="21" width="7" height="22" rx="3.5" fill="#ffffff" fill-opacity="0.8" />
              <rect x="28.5" y="14" width="7" height="36" rx="3.5" fill="#ffffff" />
              <rect x="41" y="18.5" width="7" height="27" rx="3.5" fill="#ffffff" fill-opacity="0.9" />
            </svg>
          </span>
          <span class="brand-copy">
            <strong>Northline</strong>
            <small>SOFTWARE &amp; SAAS</small>
          </span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav" id="main-navigation" aria-label="Main navigation">
          <a routerLink="/services" routerLinkActive="active-link">Services</a>
          <a routerLink="/portfolio" routerLinkActive="active-link">Works</a>
          <a routerLink="/pricing" routerLinkActive="active-link">Pricing</a>
          <a routerLink="/pricing" fragment="estimator">Cost Estimator</a>
          <a routerLink="/banking-domain-experience" routerLinkActive="active-link">Domain Experience</a>
          <a routerLink="/about" routerLinkActive="active-link">About</a>
          <a routerLink="/insights" routerLinkActive="active-link">Insights</a>
          <a routerLink="/contact" class="nav-contact-pill">Contact Us</a>
          <a class="nav-cta" routerLink="/contact">Book Free Consultation ↗</a>
        </nav>

        <!-- Mobile Hamburger Button -->
        <button
          type="button"
          class="mobile-toggle-btn"
          (click)="toggleMobileMenu()"
          [attr.aria-expanded]="isMobileMenuOpen"
          aria-label="Toggle navigation menu">
          @if (isMobileMenuOpen) {
            <span>✕</span>
          } @else {
            <span>☰</span>
          }
        </button>
      </div>

      <!-- Mobile Navigation Drawer -->
      @if (isMobileMenuOpen) {
        <div class="mobile-nav-drawer" role="navigation" aria-label="Mobile navigation">
          <a routerLink="/services" (click)="closeMobileMenu()">Services Catalog</a>
          <a routerLink="/portfolio" (click)="closeMobileMenu()">Production Works &amp; Case Studies</a>
          <a routerLink="/pricing" (click)="closeMobileMenu()">Pricing &amp; Milestone Packages</a>
          <a routerLink="/pricing" fragment="estimator" (click)="closeMobileMenu()">Project Cost Estimator</a>
          <a routerLink="/banking-domain-experience" (click)="closeMobileMenu()">Domain Experience</a>
          <a routerLink="/about" (click)="closeMobileMenu()">About Our Team</a>
          <a routerLink="/insights" (click)="closeMobileMenu()">Technical Insights</a>
          <a routerLink="/contact" (click)="closeMobileMenu()">Contact Us</a>
          <div class="mobile-drawer-cta">
            <a class="button cta-full" routerLink="/contact" (click)="closeMobileMenu()">Book Free Consultation ↗</a>
            <a class="button wa-full" [href]="settings.whatsappUrl" target="_blank" rel="noopener noreferrer">Chat on WhatsApp 💬</a>
          </div>
        </div>
      }
    </header>

    <main><router-outlet /></main>

    <!-- Floating WhatsApp Instant Enquiry Action -->
    <a class="whatsapp-float" [href]="settings.whatsappUrl" target="_blank" rel="noopener noreferrer" aria-label="Chat directly with our engineering lead on WhatsApp">
      <span class="wa-tooltip" aria-hidden="true">Chat with us on WhatsApp 💬</span>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path fill="currentColor" d="M16 .8A15 15 0 0 0 3.1 23.5L1 31l7.7-2A15.1 15.1 0 1 0 16 .8Zm0 27.4a12.3 12.3 0 0 1-6.3-1.7l-.5-.3-4.6 1.2 1.2-4.5-.3-.5A12.3 12.3 0 1 1 16 28.2Zm6.8-9.2c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1.1.5-.4.4-1.4 1.3-1.4 3.2s1.4 3.6 1.6 3.8c.2.3 2.8 4.2 6.8 5.8.9.4 1.6.6 2.1.7.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5Z"/>
      </svg>
    </a>

    <!-- Comprehensive Footer -->
    <footer class="site-footer">
      <div class="footer-top-grid">
        <div class="footer-brand-col">
          <div class="brand-copy">
            <strong>Northline Software</strong>
            <small>Senior Java &amp; Angular Engineering Team</small>
          </div>
          <p class="footer-desc">
            Custom enterprise software, Spring Boot microservices, multi-tenant SaaS platforms, and hardware POS integrations. 100% full source code ownership with 40/40/20 milestone-based delivery.
          </p>
          <div class="footer-contact-info">
            <a [href]="'mailto:' + settings.email">{{ settings.email }}</a>
            <a [href]="'tel:' + settings.phone.replaceAll(' ', '')">{{ settings.phone }}</a>
          </div>
        </div>

        <div class="footer-col">
          <strong>Core Services</strong>
          <a routerLink="/services/custom-software-development">Custom Software Development</a>
          <a routerLink="/services/saas-development">SaaS Product Engineering</a>
          <a routerLink="/services/spring-boot-apis">Java &amp; Spring Boot APIs</a>
          <a routerLink="/services/angular-frontend">Angular Web Applications</a>
          <a routerLink="/services/system-hardware-integration">Barcode &amp; POS Integration</a>
          <a routerLink="/services/cloud-devops-deployment">Cloud Hosting &amp; DevOps SLA</a>
        </div>

        <div class="footer-col">
          <strong>Planning &amp; Tools</strong>
          <a routerLink="/portfolio">Production Works &amp; Case Studies</a>
          <a routerLink="/pricing">Pricing &amp; Packages</a>
          <a routerLink="/pricing" fragment="estimator">Project Scope &amp; Cost Estimator</a>
          <a routerLink="/banking-domain-experience">Banking &amp; Enterprise Experience</a>
          <a routerLink="/insights">Technical Articles &amp; Insights</a>
          <a routerLink="/about">About Our Delivery Team</a>
        </div>

        <div class="footer-col">
          <strong>Delivery Guarantees</strong>
          <span>🛡️ 100% Code &amp; IP Ownership</span>
          <span>💼 40/40/20 Milestone Billing</span>
          <span>🔒 Mutual NDA on Request</span>
          <span>⚡ 30-Day Post-Launch SLA</span>
          <a routerLink="/admin/sign-in" class="admin-link">Staff Admin Portal &rarr;</a>
        </div>
      </div>

      <div class="footer-bottom-row">
        <div class="footer-note">
          <span>&copy; Northline Software · Enterprise full-stack software engineering. All rights reserved.</span>
        </div>
        <nav aria-label="Legal links" class="footer-legal-links">
          <a routerLink="/privacy">Privacy Notice</a>
          <a routerLink="/terms">Terms of Service</a>
          <a routerLink="/contact">Contact &amp; Quotes</a>
        </nav>
      </div>
    </footer>
  `,
  styles: [`
    .mobile-nav-drawer {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 76px;
      left: 0;
      right: 0;
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      padding: 1.5rem 2rem;
      gap: 0.5rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
      z-index: 99;
    }
    .mobile-nav-drawer a {
      color: #1e293b;
      text-decoration: none;
      font-size: 1.05rem;
      font-weight: 600;
      padding: 0.65rem 0;
      border-bottom: 1px solid #f1f5f9;
      transition: color 0.2s ease;
    }
    .mobile-nav-drawer a:hover {
      color: #2563eb;
    }
    .mobile-drawer-cta {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }
    .cta-full {
      width: 100%;
      text-align: center;
    }
    .wa-full {
      width: 100%;
      text-align: center;
      background: #16a34a !important;
      color: #ffffff !important;
    }

    .wa-tooltip {
      position: absolute;
      right: 68px;
      background: #1e293b;
      color: #f8fafc;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 0.45rem 0.85rem;
      border-radius: 8px;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      opacity: 0;
      transform: translateX(10px);
      transition: all 0.25s ease;
    }
    .whatsapp-float:hover .wa-tooltip {
      opacity: 1;
      transform: translateX(0);
    }
    .footer-top-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1fr;
      gap: 2.5rem;
      padding-bottom: 2.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      margin-bottom: 1.5rem;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }
    .footer-desc {
      color: #94a3b8;
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0.75rem 0 1.25rem 0;
    }
    .footer-contact-info {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .footer-contact-info a {
      color: #38bdf8;
      text-decoration: none;
      font-size: 0.9rem;
    }
    .footer-contact-info a:hover {
      text-decoration: underline;
    }
    .footer-col {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }
    .footer-col strong {
      color: #f8fafc;
      font-size: 0.95rem;
      margin-bottom: 0.25rem;
    }
    .footer-col a {
      color: #94a3b8;
      text-decoration: none;
      font-size: 0.88rem;
      transition: color 0.2s ease;
    }
    .footer-col a:hover {
      color: #38bdf8;
    }
    .footer-col span {
      color: #cbd5e1;
      font-size: 0.85rem;
    }
    .admin-link {
      margin-top: 0.5rem;
      color: #38bdf8 !important;
      font-weight: 600;
    }
    .footer-bottom-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
      color: #64748b;
      font-size: 0.85rem;
    }
    .footer-legal-links {
      display: flex;
      gap: 1.25rem;
    }
    .footer-legal-links a {
      color: #94a3b8;
      text-decoration: none;
      font-size: 0.85rem;
    }
    .footer-legal-links a:hover {
      color: #f1f5f9;
    }
    @media (max-width: 900px) {
      .footer-top-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 600px) {
      .footer-top-grid {
        grid-template-columns: 1fr;
      }
      .footer-bottom-row {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class AppComponent {
  readonly settings = inject(SiteSettingsService);
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
