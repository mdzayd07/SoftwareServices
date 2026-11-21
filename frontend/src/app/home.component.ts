import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'site-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero home-hero">
      <div class="hero-copy">
        <p class="eyebrow">JAVA · SPRING BOOT · ANGULAR</p>
        <p class="working-brand-label">NORTHLINE SOFTWARE <span>WORKING NAME</span></p>
        <h1>Build the web product your business needs next.</h1>
        <p class="intro">A Java full-stack services team for business applications, APIs, integrations, and product improvements.</p>
        <div class="hero-actions">
          <a class="button" routerLink="/contact">Discuss a project <span aria-hidden="true">↗</span></a>
          <a class="text-link" routerLink="/services">Explore services <span aria-hidden="true">→</span></a>
        </div>
        <p class="draft-callout">Working name, service offer, pricing, and capacity are draft assumptions for review.</p>
      </div>
      <aside class="hero-panel" aria-label="Draft engagement details">
        <div class="panel-topline"><span class="status-dot"></span> PROJECT SNAPSHOT <span class="panel-draft">DRAFT</span></div>
        <div class="panel-row"><span>Technology</span><strong>Java · Spring Boot · Angular</strong></div>
        <div class="panel-row"><span>Engagement</span><strong>Project or monthly support</strong></div>
        <div class="panel-row"><span>Planning capacity</span><strong>1 active engagement</strong></div>
        <div class="panel-note">Availability and team capacity must be confirmed before any commitment.</div>
        <div class="panel-decoration" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
      </aside>
    </section>

    <section class="content-section home-services">
      <div class="section-heading">
        <div><p class="eyebrow">SERVICES · PROPOSED</p><h2>From a clear first step to a reliable handover.</h2></div>
        <p>Candidate service areas from the PTR. Final scope and delivery capacity are still to be confirmed.</p>
      </div>
      <div class="service-grid">
        <article class="home-service-card"><span class="service-number">01</span><div class="service-icon api-icon" aria-hidden="true">&#123; &#125;</div><h3>Java &amp; Spring Boot</h3><p>Backend APIs, application services, and integration work.</p><a routerLink="/services/spring-boot-apis">View service <span aria-hidden="true">↗</span></a></article>
        <article class="home-service-card"><span class="service-number">02</span><div class="service-icon ui-icon" aria-hidden="true">▤</div><h3>Angular applications</h3><p>Responsive workflows and frontends for business applications.</p><a routerLink="/services/angular-frontend">View service <span aria-hidden="true">↗</span></a></article>
        <article class="home-service-card"><span class="service-number">03</span><div class="service-icon system-icon" aria-hidden="true">⌘</div><h3>Integration &amp; improvement</h3><p>Connect systems, modernize existing software, or plan the next change.</p><a routerLink="/services/system-integration">View service <span aria-hidden="true">↗</span></a></article>
      </div>
    </section>

    <section class="pricing-section">
      <div class="section-heading pricing-heading">
        <div><p class="eyebrow">PRICING · PLANNING ESTIMATE</p><h2>A useful starting point for budgeting.</h2></div>
        <p>Illustrative India-market pricing in INR. Final quotes depend on scope, team mix, and confirmed availability.</p>
      </div>
      <div class="pricing-grid">
        <article class="price-card">
          <p class="price-label">DISCOVERY SPRINT</p><p class="price-value">₹30k–₹50k</p><p class="price-unit">one-week planning engagement</p>
          <ul><li>Goals and constraints</li><li>Scope and technical options</li><li>Written next-step estimate</li></ul>
        </article>
        <article class="price-card featured-price">
          <p class="price-label">ENGINEERING SUPPORT</p><p class="price-value">₹1.5k–₹2.5k</p><p class="price-unit">per engineering hour</p>
          <ul><li>Java and Spring Boot</li><li>Angular frontend work</li><li>Integration and maintenance</li></ul>
        </article>
        <article class="price-card">
          <p class="price-label">MONTHLY DELIVERY BLOCK</p><p class="price-value">₹1.2L–₹2L</p><p class="price-unit">up to 80 hours per month</p>
          <ul><li>Planned monthly capacity</li><li>Prioritized backlog</li><li>Regular progress reviews</li></ul>
        </article>
      </div>
      <p class="pricing-footnote">Draft figures only; not a quote or confirmed offer. Taxes, third-party costs, and exact deliverables are not included. Confirm pricing and terms before publishing.</p>
    </section>

    <section class="capacity-section">
      <div class="capacity-mark" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="capacity-copy"><p class="eyebrow">CAPACITY · PLANNING ASSUMPTION</p><h2>One focused project slot at a time.</h2><p>The draft operating model reserves one active engagement, with a monthly support block capped at 80 hours. Real team size, start dates, and availability still need confirmation.</p></div>
      <div class="capacity-number"><strong>01</strong><span>active engagement<br>in this draft plan</span></div>
    </section>

    <section class="approach-section home-approach">
      <div><p class="eyebrow">HOW WE WORK · DRAFT</p><h2>Clear scope. Steady progress. Useful handover.</h2></div>
      <div class="approach-steps">
        <article><span>01</span><h3>Discover</h3><p>Clarify goals, constraints, and fit.</p></article>
        <article><span>02</span><h3>Plan</h3><p>Agree scope, milestones, and decisions.</p></article>
        <article><span>03</span><h3>Deliver</h3><p>Build in reviewable increments and document the result.</p></article>
      </div>
    </section>

    <section class="experience-strip">
      <div><p class="eyebrow">DOMAIN EXPERIENCE · PENDING CONFIRMATION</p><h2>Relevant team experience should be described carefully.</h2></div>
      <p>Fintech and banking-domain wording will be added only after each team member confirms what they can share. No client, employer, or confidential project details are included.</p>
      <a class="text-link" routerLink="/banking-domain-experience">Read our boundary <span aria-hidden="true">→</span></a>
    </section>

    <section class="final-cta">
      <p class="eyebrow">START WITH A CONVERSATION</p><h2>Tell us what you’re trying to build.</h2>
      <p>Contact details and the enquiry workflow are still being configured.</p>
      <a class="button" routerLink="/contact">Go to contact <span aria-hidden="true">↗</span></a>
    </section>
  `,
})
export class HomeComponent {}
