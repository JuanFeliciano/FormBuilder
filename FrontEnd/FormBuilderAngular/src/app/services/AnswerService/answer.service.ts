import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private url: string = 'http://localhost:5117/Answer';

  constructor(private http: HttpClient) {}

  bulkAnswer(answer: Answer[]): Observable<Answer[]> {
    return this.http.post<Answer[]>(this.url, answer);
  }

  getAnswer(): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.url);
  }

  getAnswerByQuestionId(questionId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.url}/${questionId}`);
  }
}
