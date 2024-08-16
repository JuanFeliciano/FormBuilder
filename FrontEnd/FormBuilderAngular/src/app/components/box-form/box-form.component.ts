import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupModel } from 'src/app/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';

@Component({
  selector: 'app-box-form',
  templateUrl: './box-form.component.html',
  styleUrls: ['./box-form.component.scss'],
})
export class BoxFormComponent implements OnInit {
  formGroupList: FormGroupModel[] = [];
  selectedFormGroup: FormGroupModel | null = null;

  constructor(
    private formGroupService: FormGroupService,
    private el: ElementRef
  ) {}

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
    console.log('id passado como parametro', id);

    this.formGroupService.getFormGroupById(id).subscribe({
      next: (data: FormGroupModel) => {
        this.selectedFormGroup = data;
        console.log('Dados do grupo de formulário', this.selectedFormGroup);

        const dialog = this.el.nativeElement.querySelector(
          '.dialog'
        ) as HTMLDialogElement;

        if (dialog) {
          dialog.showModal();
        }
      },
      error: (err) => {
        console.error('Failed to fetch form group', err);
      },
    });
  }

  openDialog(event: Event, id: number): void {
    event.stopPropagation();

    this.getFormGroupById(id);
  }

  closeDialog(event: Event): void {
    event.stopPropagation();

    const dialog = this.el.nativeElement.querySelector(
      '.dialog'
    ) as HTMLDialogElement;

    if (dialog) {
      dialog.close();
    }
  }
}
