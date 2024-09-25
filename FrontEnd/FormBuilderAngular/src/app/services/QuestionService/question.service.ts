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

  private url: string = 'http://localhost:5117/Question';
  private urlByIdForm: string = 'http://localhost:5117/Question/IdForm';

  constructor(private http: HttpClient) {}

  createQuestion(questionArray: Question[]): Observable<Question[]> {
    const headers: HttpHeaders = this.getHeaders();

    return this.http
      .post<Question[]>(this.url, questionArray, { headers })
      .pipe(
        tap(() => {
          this.questionCreated.emit();
        })
      );
  }

  getById(id: number): Observable<Question> {
    const headers: HttpHeaders = this.getHeaders();

    return this.http.get<Question>(`${this.url}/${id}`, { headers });
  }

  getByIdForm(id: number): Observable<Question[]> {
    const headers: HttpHeaders = this.getHeaders();

    return this.http
      .get<Question[]>(`${this.urlByIdForm}/${id}`, { headers })
      .pipe(
        tap(() => {
          this.questionGetter.emit();
        })
      );
  }

  updateQuestion(question: Question): Observable<Question> {
    const headers: HttpHeaders = this.getHeaders();

    console.log(question, 'dentro do metodo update do service');

    return this.http
      .put<Question>(`${this.url}/${question.id}`, question , { headers })
      .pipe(
        tap(() => {
          this.questionUpdated.emit();
        })
      );
  }

  private getHeaders(): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return headers;
  }
}
