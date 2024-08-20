import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroupModel } from 'src/app/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';

@Component({
  selector: 'app-box-form-group',
  templateUrl: './box-form-group.component.html',
  styleUrls: ['./box-form-group.component.scss'],
})
export class BoxFormGroupComponent implements OnInit {
  formGroupList: FormGroupModel[] = [];
  selectedFormGroup: FormGroupModel | undefined = undefined;

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;

  constructor(private formGroupService: FormGroupService) {}

  ngOnInit(): void {
    this.getFormGroup();
  }

  getFormGroup(): void {
    this.formGroupService.getFormGroup().subscribe({
      next: (data: FormGroupModel[]) => {
        this.formGroupList = data;
      },
      error: (err) => {
        console.error('Failed to fetch form groups', err);
      },
    });
  }

  getFormGroupById(id: number): void {
    if (this.dialog.nativeElement.open) return;

    this.formGroupService.getFormGroupById(id).subscribe({
      next: (data: FormGroupModel) => {
        this.selectedFormGroup = data;

        this.dialog.nativeElement.showModal();
      },
      error: (err) => {
        console.error('Failed to fetch form group', err);
      },
    });
  }

  openDialog(event: Event, id: number): void {
    this.getFormGroupById(id);
    event.stopPropagation();
  }

  closeDialog(event: Event): void {
    event.stopPropagation();

    this.dialog.nativeElement.close();
  }
}
