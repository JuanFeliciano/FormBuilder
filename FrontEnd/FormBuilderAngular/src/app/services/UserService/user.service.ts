import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getRole(): string | null {
    const token: string | null = localStorage.getItem('token');

    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      return decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    }

    return null;
  }
}
