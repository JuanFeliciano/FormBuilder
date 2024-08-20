import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Form } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private url: string = 'http://localhost:5117/Form';
  private storageToken: string | null = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getForm(): Observable<Form[]> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.storageToken}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<Form[]>(this.url, { headers: headers });
  }

  getFormById(id: number): Observable<Form> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.storageToken}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<Form>(`${this.url}/${id}`, { headers: headers });
  }
}
