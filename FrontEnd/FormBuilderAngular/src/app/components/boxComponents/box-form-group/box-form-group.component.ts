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
import { FormGroupUpdaterComponent } from '../../updaterComponents/form-group-updater/form-group-updater.component';
import { FormGroupDeleterComponent } from '../../deleterComponents/form-group-deleter/form-group-deleter.component';
import { FormService } from 'src/app/services/FormService/form.service';

@Component({
  selector: 'app-box-form-group',
  templateUrl: './box-form-group.component.html',
  styleUrls: ['./box-form-group.component.scss'],
})
export class BoxFormGroupComponent implements OnInit {
  formGroup: FormGroup;
  formGroupList: FormGroupModel[] = [];
  selectedFormGroup: FormGroupModel = { id: 0, title: '', forms: [] };

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild(FormGroupUpdaterComponent)
  updaterComponent: FormGroupUpdaterComponent;
  @ViewChild(FormGroupDeleterComponent)
  deleterComponent: FormGroupDeleterComponent;

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
      title: '',
    });

    this.formGroupService.formGroupCreated.subscribe(
      this.getFormGroup.bind(this)
    );

    this.formGroupService.formGroupUpdated.subscribe(
      this.getFormGroup.bind(this)
    );

    this.formGroupService.formGroupDeleted.subscribe(
      this.getFormGroup.bind(this)
    );
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

  ActiveEditContainer(index: number) {
    const editContainers =
      this.el.nativeElement.querySelectorAll('.edit-container');
    const editContainer = editContainers[index];

    const hasClass = editContainer.classList.contains('active');

    if (hasClass) this.renderer.removeClass(editContainer, 'active');
    else this.renderer.addClass(editContainer, 'active');
  }

  openDialog(event: Event, id: number): void {
    this.getFormGroupById(id);
    event.stopPropagation();
  }

  closeDialog(event: Event): void {
    event.stopPropagation();

    if (this.dialog.nativeElement.open) this.dialog.nativeElement.close();
  }

  openPutDialog(event: Event, formGroup: FormGroupModel): void {
    this.selectedFormGroup = formGroup;
    this.updaterComponent.getFormGroupByIdToPut(this.selectedFormGroup.id);
    this.formGroup.patchValue({ id: formGroup.id, title: formGroup.title });

    event.stopPropagation();
  }

  openDialogMessageDelete(event: Event): void {
    event.stopPropagation();

    if (this.deleterComponent.dialogDeleteMessage) {
      this.deleterComponent.dialogDeleteMessage.nativeElement.showModal();
    }
  }

  alertMessage(formGroup: FormGroupModel): void {
    const confirmMsg: boolean = confirm('Are you sure about this?');

    this.deleterComponent.deleteFormGroup(formGroup);

    if (confirmMsg) {
      this.openDialogMessageDelete(new Event('modal open'));
    }
  }
}
