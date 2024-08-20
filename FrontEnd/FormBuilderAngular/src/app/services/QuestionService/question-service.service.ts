import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class QuestionServiceService {
  private url: string = 'http://localhost:5117/Question';
  private storageToken = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getQuestion(): Observable<Question[]> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.storageToken}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<Question[]>(this.url, { headers: headers });
  }
}
