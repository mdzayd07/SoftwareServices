import { Component, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminSessionService } from './admin-session.service';

interface LeadRow { id: string; name: string; email: string; phone?: string | null; organization: string | null; project_type: string; message: string; status: string; created_at: string; }
interface ContentForm { id?: string; slug: string; title: string; summary: string; excerpt: string; body: string; category: string; topic: string; authorDisplayName: string; sortOrder: number; status: string; seoTitle: string; seoDescription: string; }
interface FaqForm { id?: string; question: string; answer: string; sortOrder: number; status: string; }

@Component({ selector: 'site-admin', standalone: true, imports: [FormsModule, DatePipe], template: `
  @if (!session.signedIn()) {
    <section class="page-hero admin-login"><p class="eyebrow">RESTRICTED AREA</p><h1>Administrator sign-in</h1><p class="intro">Use the administrator account configured for this installation.</p>
      <form (ngSubmit)="login()" (submit)="$event.preventDefault()"><label>Email<input type="email" name="email" [(ngModel)]="email" autocomplete="username" required></label><label>Password<input type="password" name="password" [(ngModel)]="password" autocomplete="current-password" required></label>
        @if (errorMessage) { <p class="form-error" role="alert">{{ errorMessage }}</p> }<button class="button" [disabled]="busy">{{ busy ? 'Signing in…' : 'Sign in' }}</button>
      </form><p class="form-footnote">Access is protected by the API. No public registration is available.</p>
    </section>
  } @else {
    <section class="admin-shell"><div class="admin-heading"><div><p class="eyebrow">ADMINISTRATION</p><h1>Content &amp; enquiries</h1></div><button type="button" class="plain-button" (click)="logout()">Sign out</button></div>
      <nav class="admin-tabs" aria-label="Admin sections"><button type="button" (click)="select('leads')" [attr.aria-pressed]="section==='leads'">Enquiries</button><button type="button" (click)="select('services')" [attr.aria-pressed]="section==='services'">Services</button><button type="button" (click)="select('articles')" [attr.aria-pressed]="section==='articles'">Articles</button><button type="button" (click)="select('faqs')" [attr.aria-pressed]="section==='faqs'">FAQs</button><button type="button" (click)="select('settings')" [attr.aria-pressed]="section==='settings'">Site settings</button></nav>
      @if (notice) { <p class="form-success" role="status">{{ notice }}</p> } @if (errorMessage) { <p class="form-error" role="alert">{{ errorMessage }}</p> }
      @if (section==='leads') {
        @if (leads.length===0) { <div class="empty-state"><h2>No enquiries yet</h2><p>New contact form submissions will appear here.</p></div> }
        @for (lead of leads; track lead.id) { <article class="admin-lead"><div><h2>{{ lead.name }} <span>{{ lead.status }}</span></h2><p><a [href]="'mailto:'+lead.email">{{ lead.email }}</a>@if (lead.phone) { · <a [href]="'https://wa.me/'+lead.phone.replaceAll(' ','').replaceAll('+','')" target="_blank" rel="noopener noreferrer" style="color: #22c55e; font-weight: 700;">💬 {{ lead.phone }}</a> } · {{ lead.project_type }} · {{ lead.created_at | date }}</p>@if (lead.organization) { <p><strong>Company:</strong> {{ lead.organization }}</p> }<p>{{ lead.message }}</p></div><label>Update status<select [ngModel]="lead.status" (ngModelChange)="updateLead(lead,$event)" [name]="'status-'+lead.id"><option>NEW</option><option>IN_REVIEW</option><option>REPLIED</option><option>QUALIFIED</option><option>CLOSED</option><option>SPAM</option></select></label></article> }
      } @else if (section==='services' || section==='articles') {
        <div class="admin-content-grid"><section><div class="admin-list-heading"><h2>{{ section==='services' ? 'Services' : 'Articles' }}</h2><button class="plain-button" type="button" (click)="newContent()">New draft</button></div>
          @for (item of contentItems; track item['id']) { <button class="admin-content-item" type="button" (click)="edit(item)"><strong>{{ item['title'] }}</strong><span>{{ item['status'] }} · {{ item['slug'] }}</span></button> }
        </section><section class="admin-editor"><h2>{{ editing ? 'Edit content' : 'Create content' }}</h2><p>Save as draft while you prepare it. Publishing makes it available from the public API.</p>
          @if (editor) {
            <div class="admin-form-grid"><label>Title<input [(ngModel)]="editor.title" name="editor-title" maxlength="200"></label><label>URL slug<input [(ngModel)]="editor.slug" name="editor-slug" maxlength="160"></label>
              @if (section==='services') { <label>Summary<input [(ngModel)]="editor.summary" name="editor-summary" maxlength="500"></label><label>Category<input [(ngModel)]="editor.category" name="editor-category" maxlength="80"></label> }
              @if (section==='articles') { <label>Excerpt<input [(ngModel)]="editor.excerpt" name="editor-excerpt" maxlength="500"></label><label>Topic<input [(ngModel)]="editor.topic" name="editor-topic" maxlength="80"></label><label>Author display name<input [(ngModel)]="editor.authorDisplayName" name="editor-author" maxlength="120"></label> }
              <label>Publication status<select [(ngModel)]="editor.status" name="editor-status"><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option><option value="ARCHIVED">Archived</option></select></label>
              <label>SEO title<input [(ngModel)]="editor.seoTitle" name="editor-seo-title" maxlength="200"></label><label class="admin-wide">SEO description<textarea rows="2" [(ngModel)]="editor.seoDescription" name="editor-seo-description" maxlength="320"></textarea></label>
              <label class="admin-wide">{{ section==='services' ? 'Service details' : 'Article body' }}<textarea rows="12" [(ngModel)]="editor.body" name="editor-body"></textarea></label>
              @if (section==='services') { <label>Display order<input type="number" [(ngModel)]="editor.sortOrder" name="editor-sort-order"></label> }
            </div>
            <h3>Preview</h3><article class="admin-preview"><p class="eyebrow">{{ editor.category || editor.topic }}</p><h2>{{ editor.title }}</h2><p>{{ editor.summary || editor.excerpt }}</p><div class="preview-body">{{ editor.body }}</div></article>
            @if (editorError) { <p class="form-error" role="alert">{{ editorError }}</p> }<button class="button" type="button" (click)="saveContent()" [disabled]="busy">Save content</button>
          }
        </section></div>
      } @else if (section==='faqs') {
        <div class="admin-content-grid"><section><div class="admin-list-heading"><h2>FAQs</h2><button class="plain-button" type="button" (click)="newFaq()">New FAQ</button></div>@for (item of contentItems; track item['id']) { <button class="admin-content-item" type="button" (click)="editFaq(item)"><strong>{{ item['question'] }}</strong><span>{{ item['status'] }}</span></button> }</section>
          <section class="admin-editor"><h2>{{ faq ? 'Edit FAQ' : 'Create FAQ' }}</h2>@if (faq) { <label>Question<input [(ngModel)]="faq.question" name="faq-question" maxlength="500"></label><label>Answer<textarea [(ngModel)]="faq.answer" name="faq-answer" rows="8"></textarea></label><label>Sort order<input type="number" [(ngModel)]="faq.sortOrder" name="faq-order"></label><label>Status<select [(ngModel)]="faq.status" name="faq-status"><option>DRAFT</option><option>PUBLISHED</option><option>ARCHIVED</option></select></label><button type="button" class="button" (click)="saveFaq()">Save FAQ</button> }</section>
        </div>
      } @else {
        <section class="admin-editor settings-form"><h2>Site settings</h2><p>Only the supported public settings below can be edited.</p><label>Site display name<input [(ngModel)]="settings.siteName" name="setting-name"></label><label>Contact email<input [(ngModel)]="settings.email" name="setting-email" type="email"></label><label>Phone<input [(ngModel)]="settings.phone" name="setting-phone"></label><label>Response expectation<input [(ngModel)]="settings.response" name="setting-response" placeholder="Leave blank until confirmed"></label><label>WhatsApp URL<input [(ngModel)]="settings.whatsapp" name="setting-whatsapp"></label><button type="button" class="button" (click)="saveSettings()" [disabled]="busy">Save settings</button></section>
      }
    </section>
  }
` })
export class AdminComponent {
  email = 'mdzain2545@gmail.com'; password = ''; busy = false; section: 'leads'|'services'|'articles'|'faqs'|'settings' = 'leads';
  errorMessage = ''; editorError = ''; notice = ''; leads: LeadRow[] = []; contentItems: Array<Record<string, unknown>> = []; editor: ContentForm | null = null; editing = false; faq: FaqForm | null = null;
  settings = { siteName:'Northline Software', email:'mdzain2545@gmail.com', phone:'+91 70136 31398', response:'', whatsapp:'https://wa.me/917013631398?text=Hi%2C%20I%20need%20an%20enquiry%20about%20your%20software%20services.%20Please%20share%20the%20details.' };
  constructor(readonly session: AdminSessionService, private readonly http: HttpClient, private readonly cdr: ChangeDetectorRef) { if (session.signedIn()) this.load(); }
  login(): void { this.busy=true; this.errorMessage=''; this.session.signIn(this.email,this.password).subscribe({ next:()=>{ this.password=''; this.busy=false; this.load(); this.cdr.markForCheck(); }, error:()=>{ this.busy=false; this.errorMessage='Sign-in failed. Check the configured administrator account and try again.'; this.cdr.markForCheck(); } }); }
  logout(): void { this.session.signOut(); this.leads=[]; this.contentItems=[]; this.password=''; this.cdr.markForCheck(); }
  select(section: 'leads'|'services'|'articles'|'faqs'|'settings'): void { this.section=section; this.notice=''; this.load(); }
  load(): void {
    if (!this.session.signedIn()) return;
    if (this.section==='leads') this.http.get<LeadRow[]>('/api/v1/admin/leads',{headers:this.session.headers()}).subscribe({next:data=>{this.leads=data;this.cdr.markForCheck();},error:()=>this.expired()});
    else if (this.section==='settings') this.http.get<Array<{setting_key:string;setting_value:string}>>('/api/v1/admin/site-settings',{headers:this.session.headers()}).subscribe({next:data=>{ for(const row of data){if(row.setting_key==='site.name')this.settings.siteName=row.setting_value; if(row.setting_key==='contact.email')this.settings.email=row.setting_value; if(row.setting_key==='contact.phone')this.settings.phone=row.setting_value; if(row.setting_key==='contact.responseExpectation')this.settings.response=row.setting_value; if(row.setting_key==='social.whatsapp')this.settings.whatsapp=row.setting_value;} this.cdr.markForCheck(); },error:()=>this.expired()});
    else this.http.get<Array<Record<string,unknown>>>(`/api/v1/admin/${this.section}`,{headers:this.session.headers()}).subscribe({next:data=>{this.contentItems=data;this.cdr.markForCheck();},error:()=>this.expired()});
  }
  updateLead(lead: LeadRow, status: string): void { this.http.patch('/api/v1/admin/leads/status',{id:lead.id,status},{headers:this.session.headers()}).subscribe({next:()=>{lead.status=status;this.notice='Enquiry status updated.';this.cdr.markForCheck();},error:()=>this.expired()}); }
  edit(item: Record<string,unknown>): void {
    this.editor={id:String(item['id']??''),slug:String(item['slug']??''),title:String(item['title']??''),summary:String(item['summary']??''),excerpt:String(item['excerpt']??''),body:String(item['body']??''),category:String(item['category']??''),topic:String(item['topic']??''),authorDisplayName:String(item['author_display_name']??''),sortOrder:Number(item['sort_order']??0),status:String(item['status']??'DRAFT'),seoTitle:String(item['seo_title']??''),seoDescription:String(item['seo_description']??'')};
    this.editing=true;this.editorError='';this.cdr.markForCheck();
  }
  newContent(): void {
    this.editor=this.section==='services' ? {slug:'new-service',title:'New service',summary:'',body:'',category:'software',sortOrder:0,status:'DRAFT',seoTitle:'',seoDescription:'',excerpt:'',topic:'',authorDisplayName:''} : {slug:'new-article',title:'New article',summary:'',excerpt:'',body:'',authorDisplayName:'',topic:'engineering',sortOrder:0,status:'DRAFT',seoTitle:'',seoDescription:'',category:''};
    this.editing=false;this.editorError='';this.cdr.markForCheck();
  }
  saveContent(): void {
    if (!this.editor) return;
    this.editorError='';
    this.busy=true;this.http.put(`/api/v1/admin/${this.section}`,this.editor,{headers:this.session.headers()}).subscribe({next:()=>{this.busy=false;this.notice='Content saved.';this.load();},error:()=>{this.busy=false;this.editorError='Save failed. Complete the required fields and check the URL slug.';this.cdr.markForCheck();}});
  }
  private expired(): void { this.logout();this.errorMessage='Your administrator access has ended. Sign in again.';this.cdr.markForCheck(); }
  newFaq(): void { this.faq={question:'',answer:'',sortOrder:0,status:'DRAFT'};this.cdr.markForCheck(); }
  editFaq(item: Record<string,unknown>): void { this.faq={id:String(item['id']),question:String(item['question']),answer:String(item['answer']),sortOrder:Number(item['sort_order']),status:String(item['status'])};this.cdr.markForCheck(); }
  saveFaq(): void { if(!this.faq)return;this.http.put('/api/v1/admin/faqs',this.faq,{headers:this.session.headers()}).subscribe({next:()=>{this.notice='FAQ saved.';this.load();},error:()=>{this.editorError='Could not save FAQ. Check the question and answer.';this.cdr.markForCheck();}}); }
  saveSettings(): void {
    const values=[['site.name',this.settings.siteName],['contact.email',this.settings.email],['contact.phone',this.settings.phone],['contact.responseExpectation',this.settings.response],['social.whatsapp',this.settings.whatsapp]];
    this.busy=true;let remaining=values.length;for(const [key,value] of values)this.http.put(`/api/v1/admin/site-settings/${key}`,{value},{headers:this.session.headers()}).subscribe({next:()=>{if(--remaining===0){this.busy=false;this.notice='Site settings saved.';this.cdr.markForCheck();}},error:()=>{this.busy=false;this.errorMessage='Settings could not be saved.';this.cdr.markForCheck();}});
  }
}
