import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TokenService } from '../services/TokenService/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(): boolean {
    const token: string | null = this.tokenService.getAcessToken();

    if (token != null) {
      return true;
    }

    return false;
  }
}
