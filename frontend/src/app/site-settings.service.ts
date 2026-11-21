import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn:'root' })
export class SiteSettingsService {
  email='mdzain2545@gmail.com';
  phone='+91 70136 31398';
  whatsappUrl='https://wa.me/917013631398?text=Hi%2C%20I%20need%20an%20enquiry%20about%20your%20software%20services.%20Please%20share%20the%20details.';
  siteName='Northline Software';
  responseExpectation='';
  private readonly platform=inject(PLATFORM_ID);
  constructor(http:HttpClient) {
    if(!isPlatformBrowser(this.platform))return;
    http.get<Array<{setting_key:string;setting_value:string}>>('/api/v1/site-settings').subscribe({next:rows=>{
      for(const row of rows){
        if(row.setting_key==='contact.email')this.email=row.setting_value;
        if(row.setting_key==='contact.phone')this.phone=row.setting_value;
        if(row.setting_key==='social.whatsapp')this.whatsappUrl=row.setting_value;
        if(row.setting_key==='site.name')this.siteName=row.setting_value;
        if(row.setting_key==='contact.responseExpectation')this.responseExpectation=row.setting_value;
      }
    },error:()=>{}});
  }
}
