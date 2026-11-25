import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
import { PublicPageComponent } from './public-page.component';
import { ServiceDetailComponent } from './service-detail.component';
import { ContactComponent } from './contact.component';
import { AdminComponent } from './admin.component';
import { ArticleDetailComponent } from './article-detail.component';
import { PricingComponent } from './pricing.component';
import { PortfolioComponent } from './portfolio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Northline Software | Custom Software & SaaS Development' },
  {
    path: 'services', component: PublicPageComponent, title: 'Services | Custom Software & SaaS Engineering',
    data: {
      title: 'Services', eyebrow: 'ENGINEERING SERVICES · TAILOR-MADE SOLUTIONS',
      description: 'End-to-end custom software development, multi-tenant SaaS engineering, Spring Boot APIs, Angular web applications, and hardware POS integrations.',
    },
  },
  { path: 'services/:slug', component: ServiceDetailComponent, title: 'Service details | Draft placeholder' },
  { path: 'portfolio', component: PortfolioComponent, title: 'Works & Case Studies | Proven Production Systems' },
  { path: 'works', redirectTo: 'portfolio', pathMatch: 'full' },
  { path: 'pricing', component: PricingComponent, title: 'Pricing & Packages | Transparent Milestone Billing' },
  {
    path: 'banking-domain-experience', component: PublicPageComponent, title: 'Banking Domain Experience | Northline Software',
    data: {
      title: 'Banking domain experience', eyebrow: 'MISSION-CRITICAL FINTECH & ARCHITECTURE',
      description: 'Senior engineering specialists in high-volume transaction reconciliation, Docker containerization, and HLD/LLD architectural blueprints.',
    },
  },
  { path: 'domain-experience', redirectTo: 'banking-domain-experience', pathMatch: 'full' },
  {
    path: 'about', component: PublicPageComponent, title: 'About Our Senior Engineering Team | Northline Software',
    data: {
      title: 'About the team', eyebrow: 'SENIOR ENGINEERING CRAFTSMANSHIP',
      description: 'A multidisciplinary team of senior Java, Angular, and DevOps architects delivering custom enterprise software with complete source code ownership.',
    },
  },
  {
    path: 'insights', component: PublicPageComponent, title: 'Insights | Draft placeholder',
    data: {
      title: 'Insights', eyebrow: 'INSIGHTS · DRAFT',
      description: 'Original starter articles about API planning, accessible forms, and careful software modernization. These editorial drafts need review before publication.',
    },
  },
  { path: 'insights/:slug', component: ArticleDetailComponent, title: 'Insight | Northline Software' },
  {
    path: 'contact', component: ContactComponent, title: 'Contact Us | Northline Software & SaaS',
  },
  { path: 'admin/sign-in', component: AdminComponent, title: 'Administrator sign-in | Northline Software' },
  { path: 'admin', component: AdminComponent, title: 'Administration | Northline Software' },
  {
    path: 'privacy', component: PublicPageComponent, title: 'Privacy | Draft placeholder',
    data: {
      title: 'Privacy notice', eyebrow: 'LEGAL COPY · DRAFT',
      description: 'A provisional explanation of enquiry data handling and the remaining privacy details that need confirmation before launch.',
    },
  },
  {
    path: 'terms', component: PublicPageComponent, title: 'Terms | Draft placeholder',
    data: {
      title: 'Website terms', eyebrow: 'LEGAL COPY · DRAFT',
      description: 'A provisional outline of website-use and enquiry expectations. The business entity, jurisdiction, and final legal text still need review.',
    },
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];
