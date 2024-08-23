import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private url: string = 'http://localhost:5117/Answer';
  private storageToken: string = localStorage.getItem('token')!;

  constructor(private http: HttpClient) {}

  bulkAnswer(answer: Answer[]): Observable<Answer[]> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.storageToken}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<Answer[]>(this.url, answer, { headers: headers });
  }
}
