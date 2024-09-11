import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RefreshRoute } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  private url: string = 'http://localhost:5117/Refresh';

  constructor(private http: HttpClient) {}

  RefreshToken(): Observable<RefreshRoute> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const refreshToken: string | null = localStorage.getItem('refreshToken');

    return this.http
      .post<RefreshRoute>(this.url, { refreshToken }, { headers })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('expiresAt', response.dateToken.toString());
        })
      );
  }
}
