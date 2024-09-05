import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Answer } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private url: string = 'http://localhost:5117/Answer';

  // getAnswerEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  bulkAnswer(answer: Answer[]): Observable<Answer[]> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<Answer[]>(this.url, answer, { headers: headers });
  }

  getAnswer(): Observable<Answer[]> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<Answer[]>(this.url, { headers });
  }
}
