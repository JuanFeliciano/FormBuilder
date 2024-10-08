import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Form } from 'src/app/models/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  formUpdated = new EventEmitter<void>();
  formDeleted = new EventEmitter<void>();
  formCreated = new EventEmitter<void>();

  private url: string = 'http://localhost:5117/Form';

  constructor(private http: HttpClient) {}

  createForm(form: Form): Observable<Form> {
    return this.http.post<Form>(this.url, form).pipe(
      tap(() => {
        this.formCreated.emit();
      })
    );
  }

  updateForm(form: Form): Observable<Form> {
    return this.http.put<Form>(`${this.url}/${form.id}`, form).pipe(
      tap(() => {
        this.formUpdated.emit();
      })
    );
  }

  deleteForm(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' }).pipe(
      tap(() => {
        this.formDeleted.emit();
      })
    );
  }

  getForm(): Observable<Form[]> {
    return this.http.get<Form[]>(this.url);
  }

  getFormById(id: number): Observable<Form> {
    return this.http.get<Form>(`${this.url}/${id}`);
  }
}
