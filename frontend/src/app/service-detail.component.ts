import { AsyncPipe } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { serviceDrafts } from './content-drafts';

@Component({
  selector: 'site-service-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  template: `
    @if (route.paramMap | async; as params) {
      @if (findService(params.get('slug')); as service) {
        @if (publishedContent; as content) {
          <section class="page-hero"><p class="eyebrow">{{ content.category }}</p><h1>{{ content.title }}</h1><p class="intro">{{ content.summary }}</p><div class="published-body">{{ content.body }}</div><a class="button" routerLink="/contact">Discuss this service <span aria-hidden="true">↗</span></a></section>
        } @else {
        <section class="page-hero">
          <p class="eyebrow">PROPOSED SERVICE · DRAFT</p>
          <h1>{{ service.title }}</h1>
          <p class="intro">{{ service.problem }}</p>
          <p class="placeholder-note">Proposed service outline from the PTR. Confirm this offer, scope, and availability before publication or commitment.</p>
          <div class="service-detail-grid">
            <article><h2>Typical deliverables</h2><ul>@for (item of service.deliverables; track item) { <li>{{ item }}</li> }</ul></article>
            <article><h2>Good fit for</h2><p>{{ service.fit }}</p></article>
            <article><h2>How collaboration may work</h2><p>{{ service.collaboration }}</p></article>
          </div>
          <a class="button" routerLink="/contact">Discuss this service <span aria-hidden="true">↗</span></a>
        </section>
        }
      } @else {
        <section class="page-hero">
          <p class="eyebrow">404 · NOT FOUND</p>
          <h1>Service not found</h1>
          <p class="intro">This service route does not match a proposed category.</p>
          <a class="text-link" routerLink="/services">Return to services <span aria-hidden="true">→</span></a>
        </section>
      }
    }
  `,
})
export class ServiceDetailComponent implements OnInit {
  readonly route: ActivatedRoute;
  publishedContent: {title:string;summary:string;body:string;category:string} | null = null;
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  constructor(route: ActivatedRoute, title: Title, meta: Meta) {
    this.route = route;
    title.setTitle('Service details | Draft placeholder');
    meta.updateTag({ name: 'description', content: 'Draft service detail template. Scope and offer require owner confirmation.' });
  }

  findService(slug: string | null) {
    return serviceDrafts.find((service) => service.slug === slug);
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const slug=this.route.snapshot.paramMap.get('slug');
    if (slug) this.http.get<{title:string;summary:string;body:string;category:string}>(`/api/v1/services/${encodeURIComponent(slug)}`).subscribe({next:content=>this.publishedContent=content});
  }
}
