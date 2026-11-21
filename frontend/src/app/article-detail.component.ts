import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { insightDrafts } from './content-drafts';

interface ArticleContent { title:string; excerpt:string; body:string; author_display_name:string; topic:string; published_at?:string; isDraft:boolean; }

@Component({ selector:'site-article-detail', standalone:true, imports:[RouterLink, DatePipe], template:`
  @if (article) {
    <article class="page-hero"><p class="eyebrow">{{ article.isDraft ? 'EDITORIAL DRAFT · REVIEW BEFORE PUBLICATION' : article.topic }}</p><h1>{{ article.title }}</h1><p class="intro">{{ article.excerpt }}</p><p class="article-byline">{{ article.isDraft ? 'Starter copy for owner review' : article.author_display_name + ' · ' + (article.published_at | date) }}</p><div class="published-body">{{ article.body }}</div><a class="button" routerLink="/contact">Discuss your situation <span aria-hidden="true">↗</span></a></article>
  } @else {
    <section class="page-hero"><p class="eyebrow">INSIGHT · NOT AVAILABLE</p><h1>This article isn’t available.</h1><p class="intro">It may be a draft, archived, or the address may be incorrect.</p><a class="button" routerLink="/insights">Browse insights <span aria-hidden="true">↗</span></a></section>
  }
`})
export class ArticleDetailComponent implements OnInit {
  article: ArticleContent | null=null;
  private readonly http=inject(HttpClient); private readonly platform=inject(PLATFORM_ID);
  constructor(private readonly route:ActivatedRoute,private readonly title:Title,private readonly meta:Meta){}
  ngOnInit():void {
    const slug=this.route.snapshot.paramMap.get('slug');
    const draft=insightDrafts.find(item=>item.slug===slug);
    if(draft)this.article={...draft,author_display_name:'',isDraft:true};
    if(!isPlatformBrowser(this.platform))return;
    if(slug)this.http.get<Omit<ArticleContent,'isDraft'>>(`/api/v1/articles/${encodeURIComponent(slug)}`).subscribe({next:article=>{this.article={...article,isDraft:false};this.title.setTitle(`${article.title} | Insights`);this.meta.updateTag({name:'description',content:article.excerpt});},error:()=>{}});
  }
}
