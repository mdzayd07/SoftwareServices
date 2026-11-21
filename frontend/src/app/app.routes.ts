import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
import { PublicPageComponent } from './public-page.component';
import { ServiceDetailComponent } from './service-detail.component';
import { ContactComponent } from './contact.component';
import { AdminComponent } from './admin.component';
import { ArticleDetailComponent } from './article-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Northline Software | Draft preview' },
  {
    path: 'services', component: PublicPageComponent, title: 'Services | Draft placeholder',
    data: {
      title: 'Services', eyebrow: 'SERVICES · DRAFT',
      description: 'Candidate service categories are listed for review. The team’s actual offer, capacity, and engagement model remain unconfirmed.',
    },
  },
  { path: 'services/:slug', component: ServiceDetailComponent, title: 'Service details | Draft placeholder' },
  {
    path: 'banking-domain-experience', component: PublicPageComponent, title: 'Domain experience | Draft preview',
    data: {
      title: 'Banking domain experience', eyebrow: 'DOMAIN EXPERIENCE · DRAFT PROFILE SLOTS',
      description: 'Proposed role profiles and candidate domain experience for review. Replace each sample with details confirmed by the actual team member before publication.',
    },
  },
  {
    path: 'about', component: PublicPageComponent, title: 'About | Draft preview',
    data: {
      title: 'About the team', eyebrow: 'ABOUT · EDITABLE TEAM DRAFT',
      description: 'Northline Software is the working name for a proposed Java full-stack services team. Review the role-based profile drafts below and replace them with approved member details.',
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
    path: 'contact', component: ContactComponent, title: 'Contact | Northline Software',
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
