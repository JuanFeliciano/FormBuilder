import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../TokenService/token.service';
import { Router } from '@angular/router';
import { JwtPayload, User } from 'src/app/models/interfaces/interfaces';

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
    return this.http.post<User>(this.urlLogin, loginData).pipe(
      tap((response) => {
        const decodedToken: JwtPayload = jwtDecode(response.accessToken);

        this.setSession(response, decodedToken.exp!);
      })
    );
  }

  Logout(): Observable<string> {
    return this.http.post(this.urlLogout, {}, { responseType: 'text' }).pipe(
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
