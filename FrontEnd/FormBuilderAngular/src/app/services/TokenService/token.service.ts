import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
  export class TokenService {
    constructor() {}

    isTokenExpired(): boolean {
      const token: string | null = localStorage.getItem('token');
      const expiresAt: number | null = parseInt(
        localStorage.getItem('expiresAt')!
      );
      const currentTime: number = Math.floor(Date.now() / 1000);

      if (token && currentTime < expiresAt) {
        return false;
      } else if ((token && currentTime > expiresAt) || !expiresAt) {
        return true;
      }

      return true;
    }

    getAcessToken(): string | null {
      return localStorage.getItem('token');
    }

    getRefreshToken(): string | null {
      return localStorage.getItem('refreshToken');
    }

    setTokens(token: string, refreshToken: string): void {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    } 

    clearStorage(): void {
      localStorage.clear();
    }
  }
