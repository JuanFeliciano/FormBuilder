import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Question } from 'src/app/models/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  questionCreated = new EventEmitter<void>();
  questionGetter = new EventEmitter<void>();

  private url: string = 'http://localhost:5117/Question';

  constructor(private http: HttpClient) {}

  createQuestion(questionArray: Question[]): Observable<Question[]> {
    return this.http.post<Question[]>(this.url, questionArray).pipe(
      tap(() => {
        this.questionCreated.emit();
      })
    );
  }

  get(): Observable<Question[]> {
    return this.http.get<Question[]>(this.url);
  }

  getById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.url}/${id}`);
  }

  getByIdForm(id: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.url}/IdForm/${id}`).pipe(
      tap(() => {
        this.questionGetter.emit();
      })
    );
  }

  update(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.url}/${question.id}`, question);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.url}/${id}`, {
      responseType: 'text',
    });
  }
}
