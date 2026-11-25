import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { insightDrafts } from './content-drafts';

interface ArticleContent {
  title: string;
  excerpt: string;
  body: string;
  author_display_name: string;
  topic: string;
  published_at?: string;
  isDraft: boolean;
}

@Component({
  selector: 'site-article-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    @if (article) {
      <article class="page-hero article-detail-wrap">
        <p class="eyebrow">{{ article.topic }}</p>
        <h1>{{ article.title }}</h1>
        <p class="intro">{{ article.excerpt }}</p>
        <p class="article-byline">
          {{ article.author_display_name || 'Northline Architecture Team · Technical Practice' }}
          @if (article.published_at) {
            <span> · {{ article.published_at | date:'dd MMM yyyy':'Asia/Kolkata' }}</span>
          }
        </p>

        <div class="published-body">{{ article.body }}</div>

        <div class="article-actions">
          <a class="button" routerLink="/contact">Discuss Architecture With Our Team ↗</a>
          <a routerLink="/insights" class="back-link">← Back to All Insights</a>
        </div>
      </article>
    } @else {
      <section class="page-hero">
        <p class="eyebrow">ARTICLE NOT FOUND</p>
        <h1>This insight article is not available.</h1>
        <p class="intro">The link may have moved or been updated.</p>
        <a class="button" routerLink="/insights">Browse All Insights &rarr;</a>
      </section>
    }
  `,
  styles: [`
    .article-detail-wrap {
      max-width: 860px;
      margin: 0 auto;
    }
    .article-byline {
      color: #64748b;
      font-size: 0.88rem;
      font-weight: 500;
      margin-top: 0.75rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .published-body {
      color: #e2e8f0;
      font-size: 1.1rem;
      line-height: 1.85;
      margin: 2.5rem 0;
      white-space: pre-wrap;
    }
    .article-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .back-link {
      color: #38bdf8;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
    }
    .back-link:hover {
      text-decoration: underline;
    }
  `]
})
export class ArticleDetailComponent implements OnInit {
  article: ArticleContent | null = null;
  private readonly http = inject(HttpClient);
  private readonly platform = inject(PLATFORM_ID);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly title: Title,
    private readonly meta: Meta
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const draft = insightDrafts.find((item) => item.slug === slug);
    if (draft) {
      this.article = { ...draft, author_display_name: 'Senior Systems Architect', isDraft: false };
      this.title.setTitle(`${draft.title} | Northline Software`);
      this.meta.updateTag({ name: 'description', content: draft.excerpt });
    }
    if (!isPlatformBrowser(this.platform)) return;
    if (slug) {
      this.http.get<Omit<ArticleContent, 'isDraft'>>(`/api/v1/articles/${encodeURIComponent(slug)}`).subscribe({
        next: (article) => {
          this.article = { ...article, isDraft: false };
          this.title.setTitle(`${article.title} | Northline Software`);
          this.meta.updateTag({ name: 'description', content: article.excerpt });
        },
        error: () => {}
      });
    }
  }
}
