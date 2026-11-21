import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteSettingsService } from './site-settings.service';

@Component({
  selector: 'site-contact', standalone: true, imports: [ReactiveFormsModule],
  template: `
    <section class="page-hero contact-hero">
      <p class="eyebrow">CONTACT · ENQUIRIES</p><h1>Tell us what you’re planning.</h1>
      <p class="intro">Share a short overview of the software work you have in mind. Please do not include passwords, payment details, account numbers, customer records, or confidential employer information.</p>
      <div class="contact-alternatives"><a [href]="'mailto:'+settings.email">{{ settings.email }}</a><a [href]="'tel:'+settings.phone.replaceAll(' ','')">{{ settings.phone }}</a></div>
      @if (settings.responseExpectation) { <p class="placeholder-note">{{ settings.responseExpectation }}</p> }
    </section>
    <section class="contact-form-wrap">
      @if (sent) { <div class="form-success" role="status" tabindex="-1"><h2>Thank you for reaching out.</h2><p>Your enquiry was received. We’ll review it and respond using the contact details you provided.</p></div> }
      @else {
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="form-grid">
            <label>Name <span aria-hidden="true">*</span><input formControlName="name" autocomplete="name" maxlength="100" required><small>{{ error('name') }}</small></label>
            <label>Email <span aria-hidden="true">*</span><input type="email" formControlName="email" autocomplete="email" maxlength="254" required><small>{{ error('email') }}</small></label>
            <label>Organization <span class="optional">(optional)</span><input formControlName="organization" autocomplete="organization" maxlength="150"></label>
            <label>What do you need help with? <span aria-hidden="true">*</span><select formControlName="projectType" required><option value="" disabled>Select a project type</option><option value="web_application">Web application</option><option value="backend_api">Backend API</option><option value="frontend">Frontend development</option><option value="integration">System integration</option><option value="modernization">Modernization or maintenance</option><option value="discovery">Technical discovery</option><option value="other">Other</option></select><small>{{ error('projectType') }}</small></label>
            <label>Timeline <span class="optional">(optional)</span><select formControlName="timeline"><option value="">Choose if known</option><option value="asap">As soon as practical</option><option value="within_3_months">Within 3 months</option><option value="later">Later</option><option value="flexible">Flexible</option></select></label>
            <label>Budget <span class="optional">(optional)</span><select formControlName="budgetRange"><option value="">Prefer to discuss</option><option value="under_1_lakh">Under ₹1 lakh</option><option value="1_to_5_lakh">₹1–5 lakh</option><option value="over_5_lakh">Over ₹5 lakh</option><option value="to_be_discussed">To be discussed</option></select></label>
          </div>
          <label class="full-field">Project overview <span aria-hidden="true">*</span><textarea formControlName="message" rows="6" minlength="20" maxlength="5000" placeholder="What are you trying to build or improve?" required></textarea><small>{{ error('message') }}</small></label>
          <label class="consent-field"><input type="checkbox" formControlName="consentToContact"><span>I agree to be contacted about this enquiry. Please do not use these details for marketing. <b aria-hidden="true">*</b></span></label>
          <label class="honeypot" aria-hidden="true">Leave this field empty<input formControlName="website" tabindex="-1" autocomplete="off"></label>
          @if (errorMessage) { <p class="form-error" role="alert">{{ errorMessage }}</p> }
          <button class="button" type="submit" [disabled]="submitting">{{ submitting ? 'Sending…' : 'Send enquiry' }} <span aria-hidden="true">↗</span></button>
          <p class="form-footnote">Fields marked * are required. Your enquiry is stored so it can be reviewed. See the <a href="/privacy">draft privacy notice</a>.</p>
        </form>
      }
    </section>
  `,
})
export class ContactComponent {
  readonly settings = inject(SiteSettingsService);
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    organization: ['', Validators.maxLength(150)], projectType: ['', Validators.required],
    timeline: [''], budgetRange: [''], message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(5000)]],
    consentToContact: [false, Validators.requiredTrue], website: [''],
  });
  submitting = false; sent = false; errorMessage = '';

  error(field: string): string {
    const control = this.form.get(field);
    if (!control?.touched || !control.invalid) return '';
    if (control.hasError('required') || control.hasError('requiredTrue')) return 'This field is required.';
    if (control.hasError('email')) return 'Enter a valid email address.';
    if (control.hasError('minlength')) return `Enter at least ${control.getError('minlength').requiredLength} characters.`;
    return 'Please check this field.';
  }

  submit(): void {
    this.form.markAllAsTouched(); this.errorMessage = '';
    if (this.form.invalid || this.submitting) return;
    this.submitting = true;
    const value = this.form.getRawValue();
    const payload = { ...value, sourcePath: window.location.pathname };
    this.http.post('/api/v1/leads', payload).subscribe({
      next: () => { this.sent = true; this.submitting = false; },
      error: (error) => {
        this.errorMessage = error.status === 429 ? 'Too many attempts. Please wait a few minutes or contact us directly.' : 'We could not send your enquiry just now. Please try again or email us directly.';
        this.submitting = false;
      },
    });
  }
}
