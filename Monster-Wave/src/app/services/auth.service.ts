import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, switchMap } from 'rxjs';

import { AuthTokens, LoginCredentials, RegisterPayload, DecodedToken } from '../models/auth.model';

const API_BASE_URL = 'http://localhost:8000/api/auth'; // ALTERAR NA APRESENTACAO
const ACCESS_TOKEN_KEY = 'mw_access_token';
const REFRESH_TOKEN_KEY = 'mw_refresh_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly accessToken = signal<string | null>(this.readFromStorage(ACCESS_TOKEN_KEY));
  readonly isAuthenticated = computed(() => !!this.accessToken());

  login(credentials: LoginCredentials): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${API_BASE_URL}/login/`, credentials).pipe(
      tap(tokens => this.setTokens(tokens))
    );
  }

  register(payload: RegisterPayload): Observable<AuthTokens> {
    return this.http.post(`${API_BASE_URL}/register/`, payload).pipe(
      switchMap(() => this.login({ username: payload.username, password: payload.password }))
    );
  }

  refresh(): Observable<AuthTokens> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<AuthTokens>(`${API_BASE_URL}/refresh/`, { refresh: refreshToken }).pipe(
      tap(tokens => this.setTokens({ ...tokens, refresh: tokens.refresh ?? refreshToken! }))
    );
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    this.accessToken.set(null);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return this.accessToken();
  }

  getRefreshToken(): string | null {
    return this.readFromStorage(REFRESH_TOKEN_KEY);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  private setTokens(tokens: AuthTokens): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
    this.accessToken.set(tokens.access);
  }

  private decodeToken(token: string): DecodedToken {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  private readFromStorage(key: string): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
  }
}