import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Question } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  questionCreated = new EventEmitter<void>();
  questionGetter = new EventEmitter<void>();
  questionUpdated = new EventEmitter<void>();
  questionDeleted = new EventEmitter<void>();

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
    return this.http.put<Question>(`${this.url}/${question.id}`, question).pipe(
      tap(() => {
        this.questionUpdated.emit();
      })
    );
  }

  delete(id: number): Observable<string> {
    return this.http
      .delete(`${this.url}/${id}`, {
        responseType: 'text',
      })
      .pipe(
        tap(() => {
          this.questionDeleted.emit();
        })
      );
  }
}
