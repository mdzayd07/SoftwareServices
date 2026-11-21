import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'site-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <p class="eyebrow">404 · NOT FOUND</p>
      <h1>We couldn’t find that page.</h1>
      <p class="intro">The address may be incorrect, or the requested content may not be available.</p>
      <a class="button" routerLink="/">Return home <span aria-hidden="true">↗</span></a>
    </section>
  `,
})
export class NotFoundComponent {
  constructor(title: Title, meta: Meta) {
    title.setTitle('Page not found | Draft placeholder');
    meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}
