import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroupModel } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FormGroupService {
  private url: string = 'http://localhost:5117/FormGroup';

  constructor(private http: HttpClient) {}

  createFormGroup(formGroup: FormGroupModel): Observable<FormGroupModel> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<FormGroupModel>(this.url, formGroup, {
      headers: headers,
    });
  }

  updateFormGroup(
    id: number,
    formGroup: FormGroupModel
  ): Observable<FormGroupModel> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<FormGroupModel>(`${this.url}/${id}`, formGroup, {
      headers: headers,
    });
  }

  getFormGroup(): Observable<FormGroupModel[]> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<FormGroupModel[]>(this.url, { headers: headers });
  }

  getFormGroupById(id: number): Observable<FormGroupModel> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<FormGroupModel>(`${this.url}/${id}`, {
      headers: headers,
    });
  }
}
