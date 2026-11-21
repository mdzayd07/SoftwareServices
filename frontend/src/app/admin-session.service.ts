import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminSessionService {
  private authorization: string | null = null;
  constructor(private readonly http: HttpClient) {}
  headers(): HttpHeaders { return new HttpHeaders(this.authorization ? { Authorization: this.authorization } : {}); }
  signIn(email: string, password: string): Observable<unknown> {
    const authorization = `Basic ${btoa(`${email}:${password}`)}`;
    return this.http.get('/api/v1/admin/leads', { headers: new HttpHeaders({ Authorization: authorization }) }).pipe(tap(() => this.authorization = authorization));
  }
  signOut(): void { this.authorization = null; }
  get signedIn(): boolean { return this.authorization !== null; }
}
