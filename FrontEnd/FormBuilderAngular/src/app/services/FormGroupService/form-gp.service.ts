import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { FormGroupModel } from 'src/app/models/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FormGroupService {
  formGroupCreated: EventEmitter<FormGroupModel> =
    new EventEmitter<FormGroupModel>();

  private url: string = 'http://localhost:5117/FormGroup';

  constructor(private http: HttpClient) {}

  createFormGroup(formGroup: FormGroupModel): Observable<FormGroupModel> {
    return this.http.post<FormGroupModel>(this.url, formGroup).pipe(
      tap((data: FormGroupModel) => {
        this.formGroupCreated.emit(data);
      })
    );
  }

  updateFormGroup(formGroup: FormGroupModel): Observable<FormGroupModel> {
    return this.http.put<FormGroupModel>(
      `${this.url}/${formGroup.id}`,
      formGroup
    );
  }

  deleteFormGroup(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  getFormGroup(): Observable<FormGroupModel[]> {
    return this.http.get<FormGroupModel[]>(this.url);
  }

  getFormGroupById(id: number): Observable<FormGroupModel> {
    return this.http.get<FormGroupModel>(`${this.url}/${id}`);
  }
}
