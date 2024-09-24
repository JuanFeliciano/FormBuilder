import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap, throwError } from 'rxjs';
import { JwtPayload, User } from 'src/app/interfaces/interfaces';
import { TokenService } from '../TokenService/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlLogin: string = 'http://localhost:5117/Login';
  private urlLogout: string = 'http://localhost:5117/LogOut';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  Login(loginData: {
    username: User['username'];
    password: User['password'];
  }): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<User>(this.urlLogin, loginData, { headers }).pipe(
      tap((response) => {
        const decodedToken: JwtPayload = jwtDecode(response.accessToken);

        this.setSession(response, decodedToken.exp!);
      })
    );
  }

  Logout(): Observable<string> {
    const token: string | null = this.tokenService.getAcessToken();

    if (!token) {
      return throwError(() => new Error('No token was found'));
    }
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http
      .post(this.urlLogout, {}, { headers, responseType: 'text' })
      .pipe(
        tap(() => {
          this.router.navigate(['/login']), this.tokenService.clearStorage();
        })
      );
  }

  private setSession(authResult: any, expire: number) {
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('refreshToken', authResult.refreshToken);
    localStorage.setItem('expiresAt', expire.toString());
  }
}
