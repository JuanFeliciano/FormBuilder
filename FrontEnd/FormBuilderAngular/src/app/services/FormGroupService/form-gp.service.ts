import { HttpClient } from '@angular/common/http';
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
    return this.http.post<FormGroupModel>(this.url, formGroup);
  }
}
