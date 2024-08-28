import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupModel } from 'src/app/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';

@Component({
  selector: 'app-box-form-group',
  templateUrl: './box-form-group.component.html',
  styleUrls: ['./box-form-group.component.scss'],
})
export class BoxFormGroupComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup;
  formGroupList: FormGroupModel[] = [];
  selectedFormGroup: FormGroupModel | undefined = undefined;
  selectFormGroupPut: FormGroupModel | undefined = undefined;
  idDelete: number;

  @ViewChild('dialogPut') dialogPut: ElementRef;
  @ViewChild('dialogPutMessage') dialogPutMessage: ElementRef;
  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogDeleteMessage')
  dialogDeleteMessage: ElementRef<HTMLDialogElement>;

  constructor(
    private formGroupService: FormGroupService,
    private el: ElementRef,
    private renderer: Renderer2,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getFormGroup();

    this.formGroup = this.fb.group({
      id: 0,
      groupTitle: '',
    });
  }

  ngAfterViewInit(): void {}

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

  getFormGroupByIdToPut(id: number): void {
    this.formGroupService.getFormGroupById(id).subscribe({
      next: (data: FormGroupModel) => {
        this.selectFormGroupPut = data;

        this.dialogPut.nativeElement.showModal();
      },
      error: (err) => {
        console.error('Failed to fetch form group', err);
      },
    });
  }

  ActiveEditContainer(index: number) {
    const editContainers =
      this.el.nativeElement.querySelectorAll('.edit-container');

    const editContainer = editContainers[index];

    const hasClass = editContainer.classList.contains('active');

    if (hasClass) this.renderer.removeClass(editContainer, 'active');
    else this.renderer.addClass(editContainer, 'active');
  }

  submit(): void {
    if (this.formGroup.valid) {
      const formGroupData = {
        id: this.formGroup.get('id')?.value as number,
        title: this.formGroup.get('groupTitle')?.value as string,
        forms: [],
      };

      this.formGroupService
        .updateFormGroup(formGroupData.id, formGroupData)
        .subscribe({
          next: () => {
            this.openDialogMessage();
            this.closePutDialog(new Event('Modal closed'));
          },
          error: (error) => {
            console.error('Error updating Form Group', error);
          },
        });
    }
  }

  delete(): void {
    this.formGroupService.deleteFormGroup(this.idDelete).subscribe({
      next: () => {
        this.openDialogMessageDelete();
      },
    });
  }

  openDialog(event: Event, id: number): void {
    this.getFormGroupById(id);
    event.stopPropagation();
  }

  closeDialog(event: Event): void {
    event.stopPropagation();

    if (this.dialog.nativeElement.open) this.dialog.nativeElement.close();
  }

  openPutDialog(event: Event, id: number): void {
    this.getFormGroupByIdToPut(id);
    this.formGroup.patchValue({ id: id });
    event.stopPropagation();
  }

  closePutDialog(event: Event): void {
    event.stopPropagation();

    if (this.dialogPut.nativeElement.open) this.dialogPut.nativeElement.close();
  }

  openDialogMessage(): void {
    if (this.dialogPutMessage && this.dialogPutMessage.nativeElement) {
      this.dialogPutMessage.nativeElement.showModal();
    }
  }

  closeDialogMessage(): void {
    if (this.dialogPutMessage && this.dialogPutMessage.nativeElement) {
      this.dialogPutMessage.nativeElement.close();
      this.getFormGroup();
    }
  }

  openDialogMessageDelete(): void {
    if (this.dialogDeleteMessage && this.dialogDeleteMessage.nativeElement) {
      this.dialogDeleteMessage.nativeElement.showModal();
    }
  }

  closeDialogMessageDelete(): void {
    if (this.dialogDeleteMessage && this.dialogDeleteMessage.nativeElement) {
      this.dialogDeleteMessage.nativeElement.close();
      this.getFormGroup();
    }
  }

  alertMessage(id: number) {
    const confirmMsg: boolean = confirm('Are you sure about this?');
    this.idDelete = id;

    this.delete();
    if (confirmMsg) this.openDialogMessageDelete();
  }
}
