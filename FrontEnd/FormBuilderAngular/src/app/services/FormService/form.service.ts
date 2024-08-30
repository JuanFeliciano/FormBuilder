import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Form } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  formUpdated = new EventEmitter<void>();

  private url: string = 'http://localhost:5117/Form';

  constructor(private http: HttpClient) {}

  createForm(form: Form): Observable<Form> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<Form>(this.url, form, {
      headers: headers,
    });
  }

  updateForm(id: number, form: Form): Observable<Form> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .put<Form>(`${this.url}/${id}`, form, {
        headers: headers,
      })
      .pipe(
        tap(() => {
          this.formUpdated.emit();
        })
      );
  }

  deleteForm(id: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete(`${this.url}/${id}`, {
      headers: headers,
    });
  }

  GetForm(): Observable<Form[]> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<Form[]>(this.url, { headers });
  }

  getFormById(id: number): Observable<Form> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<Form>(`${this.url}/${id}`, {
      headers: headers,
    });
  }
}
