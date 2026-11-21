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
      <p class="placeholder-note">Draft page — business owner approval is required before publication.</p>
    </section>
    @if (page.title === 'About the team' || page.title === 'Banking domain experience') {
      <section class="page-content detail-copy team-draft-section">
        <p class="section-label">DRAFT TEAM ROLE PROFILES · REPLACE WITH APPROVED MEMBER DETAILS</p>
        <p class="team-intro">These sample role profiles show the kinds of skills and experience the site can describe. Names and personal histories must be completed with each team member.</p>
        <div class="team-profile-grid">
          @for (profile of teamProfiles; track profile.role) {
            <article class="team-profile-card"><p class="profile-placeholder">{{ profile.slot }}</p><h2>{{ profile.role }}</h2><p>{{ profile.bioDraft }}</p><h3>Proposed skills to verify</h3><ul>@for (skill of profile.skillDraft; track skill) { <li>{{ skill }}</li> }</ul><h3>Domain experience wording to verify</h3><p>{{ profile.experienceDraft }}</p></article>
          }
        </div>
        <p class="domain-boundary">These are editable example profile slots, not claims about real staff or team size. Confirm each person’s name, role, skills, experience, and permission to share before publication.</p>
      </section>
    }
    @if (page.title === 'Banking domain experience') {
      <section class="page-content detail-copy">
        <p class="section-label">GENERAL DELIVERY CONSIDERATIONS · TEAM EXPERIENCE PENDING CONFIRMATION</p>
        <div class="detail-copy-grid">
          <article><h2>Workflows and access</h2><p>For transaction-oriented applications, teams commonly map the user journey, data ownership, validation rules, and role-based access before implementation. The actual requirements depend on each project.</p></article>
          <article><h2>Traceability and change</h2><p>Audit trails, clear integration boundaries, operational visibility, and controlled changes can help teams reason about important workflows. Their design must follow the client’s requirements and existing controls.</p></article>
          <article><h2>Project boundaries</h2><p>Any relevant team experience must be verified and approved by the people concerned. Past work remains confidential and is described only at a general level.</p></article>
        </div>
        <p class="domain-boundary">This page describes topics a project may need to consider. It does not claim a verified team track record, bank endorsement, security certification, or regulatory approval.</p>
      </section>
    }
    @if (page.title === 'About the team') {
      <section class="page-content detail-copy">
        <p class="section-label">ABOUT THIS PROPOSED SERVICES TEAM</p>
        <div class="about-copy"><h2>Software delivery, described plainly.</h2><p><strong>Northline Software</strong> is the current working name for a proposed software services team focused on Java, Spring Boot, and Angular work for business applications. It is not a verified registered or legal name.</p><p><strong>Legal business entity:</strong> Add the registered name and legal structure after confirming the business registration. This field is intentionally left for the owner.</p><p>The proposed delivery approach is to clarify the goal and constraints, agree the scope, share progress in reviewable increments, and leave useful handover notes. Services and capacity shown on this preview are planning assumptions, not commitments.</p><p>The profile cards below are role and copy drafts to help collect team details. They are not a confirmed roster or headcount. Replace each slot with an approved name, biography, and verified skills before publishing.</p></div>
      </section>
    }
    @if (page.title === 'Privacy notice') {
      <section class="page-content legal-draft">
        <p class="section-label">PRIVACY DRAFT · OWNER AND LEGAL REVIEW REQUIRED</p>
        <p>This draft explains the information the current enquiry feature is designed to handle. The responsible legal entity and applicable privacy jurisdiction have not yet been confirmed, so this is not a final privacy notice.</p>
        <h2>Information submitted through the enquiry form</h2>
        <p>The form asks for a name, email address, project type, and project overview. Organization, timing, and budget are optional. It also records contact consent and the page the enquiry came from. Please do not send passwords, payment details, account numbers, customer records, or confidential employer or client information.</p>
        <h2>How the information is used</h2>
        <p>Enquiry details are intended to be stored in the application database so the team can review and respond. If an email provider is configured, the application attempts to notify the administrator. A notification failure does not remove the stored enquiry. The current draft does not include analytics tracking.</p>
        <h2>Access and retention</h2>
        <p>When the backend is configured, the admin inbox is restricted to an administrator account. The implementation has a configurable 90-day deletion setting for enquiries. Confirm the retention period, backup expiry, and administrator access process before using this site with real enquiries.</p>
        <h2>Contact and third-party links</h2>
        <p>For privacy questions, contact <a href="mailto:mdzain2545@gmail.com">mdzain2545@gmail.com</a>. The WhatsApp button opens WhatsApp; information sent there is handled through that service and is not submitted through this website’s enquiry form.</p>
        <h2>Details still to confirm</h2>
        <ul><li>Legal entity/controller name and applicable jurisdiction</li><li>Hosting, database, email, and other service providers and their locations</li><li>Final retention period, deletion process, and backup expiry</li><li>Applicable privacy rights, lawful basis, and request handling</li></ul>
      </section>
    }
    @if (page.title === 'Website terms') {
      <section class="page-content legal-draft">
        <p class="section-label">WEBSITE TERMS DRAFT · OWNER AND LEGAL REVIEW REQUIRED</p>
        <p>This is a provisional outline for the website. It is not a contract for software services and should not be used as final legal terms until the business entity and jurisdiction are confirmed and the text is reviewed.</p>
        <h2>Website information</h2>
        <p>The site describes proposed software services and shares general technical information. Service descriptions, name, pricing, capacity, and availability shown in this preview are drafts. A specific engagement would require a separate written agreement defining scope, fees, responsibilities, delivery, and acceptance.</p>
        <h2>Enquiries</h2>
        <p>Submitting an enquiry asks the team to contact you about that request. It does not by itself create a client relationship or guarantee that work will be accepted. Do not submit credentials, payment information, customer records, or confidential material.</p>
        <h2>External services</h2>
        <p>Links such as WhatsApp and email open services operated outside this website. Their availability and handling of information are governed by those providers’ terms and privacy practices.</p>
        <h2>Items requiring review</h2>
        <ul><li>Correct contracting entity and governing jurisdiction</li><li>Intellectual property, permitted use, and third-party content terms</li><li>Liability, warranties, dispute handling, and service-specific contract terms</li><li>Contact address and effective date for final terms</li></ul>
      </section>
    }
    @if (page.title === 'Insights' && articles.length) {
      <section class="page-content"><p class="section-label">ORIGINAL STARTER ARTICLES · REVIEW BEFORE PUBLICATION</p><div class="service-grid">@for (article of articles; track article.slug) { <article class="service-card"><p class="card-index">{{ article.isDraft ? 'EDITORIAL DRAFT · ' : '' }}{{ article.topic }}</p><h2>{{ article.title }}</h2><p>{{ article.excerpt }}</p><a [routerLink]="['/insights', article.slug]">{{ article.isDraft ? 'Read draft' : 'Read article' }} <span aria-hidden="true">→</span></a></article> }</div></section>
    }
    @if (page.title === 'Insights' && !articles.length) {
      <section class="page-content empty-state">
        <h2>No approved articles yet</h2>
        <p>Articles will appear here after original content has been reviewed and approved.</p>
      </section>
    }
    @if (page.title === 'Services' && publishedServices.length) {
      <section class="page-content"><p class="section-label">CURRENT PUBLISHED SERVICES</p><div class="service-grid">@for (service of publishedServices; track service.slug) { <article class="service-card"><span class="card-index">{{ service.category }}</span><h2>{{ service.title }}</h2><p>{{ service.summary }}</p><a [routerLink]="['/services', service.slug]">Explore service <span aria-hidden="true">→</span></a></article> }</div></section>
    }
    @if (page.title === 'Services' && !publishedServices.length) {
      <section class="page-content">
        <p class="section-label">PROPOSED CATEGORIES FROM THE PTR — PENDING CONFIRMATION</p>
        <div class="service-grid">
          @for (service of services; track service.slug) {
            <article class="service-card">
              <span class="card-index">{{ service.slug }}</span>
              <h2>{{ service.title }}</h2>
              <p>{{ service.problem }}</p>
              <a [routerLink]="['/services', service.slug]">View draft details <span aria-hidden="true">→</span></a>
            </article>
          }
        </div>
      </section>
    }
    @if (page.title === 'Contact') {
      <section class="page-content empty-state">
        <h2>Enquiry form not connected yet</h2>
        <p>The contact destination and lead-handling workflow are pending confirmation and implementation. No information can be submitted from this draft page.</p>
      </section>
    }
  `,
})
export class PublicPageComponent implements OnInit {
  readonly page: PublicPageData;
  readonly services = serviceDrafts;
  readonly teamProfiles = teamProfileDrafts;
  readonly articles: Array<{slug:string;title:string;excerpt:string;topic:string;isDraft:boolean}> = insightDrafts.map(article=>({...article,isDraft:true}));
  readonly publishedServices: Array<{slug:string;title:string;summary:string;category:string}> = [];
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  constructor(route: ActivatedRoute, title: Title, meta: Meta) {
    this.page = route.snapshot.data as PublicPageData;
    title.setTitle(`${this.page.title} | Draft placeholder`);
    meta.updateTag({ name: 'description', content: `Draft placeholder page for ${this.page.title}. Business owner approval is required before publication.` });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.page.title === 'Services') this.http.get<typeof this.publishedServices>('/api/v1/services').subscribe({next:data=>this.publishedServices.push(...data),error:()=>{}});
    if (this.page.title === 'Insights') this.http.get<Array<{slug:string;title:string;excerpt:string;topic:string}>>('/api/v1/articles').subscribe({next:data=>{if(data.length)this.articles.splice(0,this.articles.length,...data.map(article=>({...article,isDraft:false})));},error:()=>{}});
  }
}
