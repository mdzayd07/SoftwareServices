import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SiteSettingsService } from './site-settings.service';

@Component({
  selector: 'site-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="site-header">
      <a class="brand" routerLink="/" aria-label="Northline Software home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="brand-copy"><strong>{{ settings.siteName.replace(' Software','') }}</strong><small>SOFTWARE TEAM</small></span>
      </a>
      <nav id="main-navigation" aria-label="Main navigation">
        <a routerLink="/services">Services</a>
        <a routerLink="/banking-domain-experience">Domain experience</a>
        <a routerLink="/about">About</a>
        <a routerLink="/insights">Insights</a>
        <a class="nav-cta" routerLink="/contact">Contact</a>
      </nav>
    </header>
    <main><router-outlet /></main>
    <a class="whatsapp-float" [href]="settings.whatsappUrl" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 .8A15 15 0 0 0 3.1 23.5L1 31l7.7-2A15.1 15.1 0 1 0 16 .8Zm0 27.4a12.3 12.3 0 0 1-6.3-1.7l-.5-.3-4.6 1.2 1.2-4.5-.3-.5A12.3 12.3 0 1 1 16 28.2Zm6.8-9.2c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1.1.5-.4.4-1.4 1.3-1.4 3.2s1.4 3.6 1.6 3.8c.2.3 2.8 4.2 6.8 5.8.9.4 1.6.6 2.1.7.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5Z"/></svg>
    </a>
    <footer class="site-footer">
      <div class="footer-note">
        <span>Northline Software is a working name for preview only.</span>
        <span>Draft site — claims, prices, capacity, and legal copy need review.</span>
        <span><a [href]="'mailto:'+settings.email">{{ settings.email }}</a> · <a [href]="'tel:'+settings.phone.replaceAll(' ','')">{{ settings.phone }}</a></span>
      </div>
      <nav aria-label="Legal links">
        <a routerLink="/admin/sign-in">Admin sign-in</a>
        <a routerLink="/services">Services</a>
        <a routerLink="/privacy">Privacy draft</a>
        <a routerLink="/terms">Terms draft</a>
      </nav>
    </footer>
  `,
})
export class AppComponent {
  constructor(readonly settings: SiteSettingsService) {}
}
