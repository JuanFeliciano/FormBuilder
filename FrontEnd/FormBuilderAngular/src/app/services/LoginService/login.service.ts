import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap, throwError } from 'rxjs';
import { DecodedToken, User } from 'src/app/interfaces/interfaces';
import { TokenService } from '../TokenService/token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlLogin: string = 'http://localhost:5117/Login';
  private urlLogout: string = 'http://localhost:5117/LogOut';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  Login(loginData: {
    username: User['username'];
    password: User['password'];
  }): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<User>(this.urlLogin, loginData, { headers }).pipe(
      tap((response) => {
        localStorage.setItem('role', response.role);
        const decodedToken: DecodedToken = jwtDecode(response.accessToken);

        this.setSession(response, decodedToken.exp);
      })
    );
  }

  Logout(): Observable<any> {
    const token: string | null = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('No token was found'));
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .post(this.urlLogout, {}, { headers, responseType: 'text' })
      .pipe(tap(() => this.tokenService.clearStorage()));
  }

  private setSession(authResult: any, expire: number) {
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('refreshToken', authResult.refreshToken);
    localStorage.setItem('expiresAt', expire.toString());
  }
}
