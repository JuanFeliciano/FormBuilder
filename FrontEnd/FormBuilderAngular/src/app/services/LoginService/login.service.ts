import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlLogin: string = 'http://localhost:5117/Login';
  private urlLogout: string = 'http://localhost:5117/LogOut';

  constructor(private http: HttpClient) {}

  Login(loginData: {
    username: User['username'];
    password: User['password'];
  }): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.urlLogin, loginData, { headers });
  }

  Logout(): Observable<any> {
    const token: string | null = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('No token was found'));
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(
      this.urlLogout,
      {},
      { headers, responseType: 'text' }
    );
  }
}
