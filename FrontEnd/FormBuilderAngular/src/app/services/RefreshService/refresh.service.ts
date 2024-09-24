import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { RefreshRoute } from 'src/app/interfaces/interfaces';
import { TokenService } from '../TokenService/token.service';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  private url: string = 'http://localhost:5117/Refresh';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  RefreshToken(): Observable<RefreshRoute> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });
    const refreshToken: string | null = this.tokenService.getRefreshToken();

    return this.http
      .post<RefreshRoute>(this.url, { refreshToken }, { headers })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('expiresAt', response.dateToken.toString());
        }),
        catchError((error) => {
          console.error('erro no refresh', error);
          return throwError(error);
        })
      );
  }
}
