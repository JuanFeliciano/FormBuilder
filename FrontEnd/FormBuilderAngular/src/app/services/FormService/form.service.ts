import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Form } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FormService {
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

  GetForm(): Observable<Form[]> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<Form[]>(this.url, { headers });
  }
}
