import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NpsService {
  private url: string = 'http://localhost:5117/Nps';

  constructor(private http: HttpClient) {}

  GetNpsScore(): Observable<number> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<number>(this.url, { headers });
  }
}
