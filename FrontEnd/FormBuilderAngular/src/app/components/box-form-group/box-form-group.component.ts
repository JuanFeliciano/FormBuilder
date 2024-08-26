import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormGroupModel } from 'src/app/interfaces/interfaces';
import { PutFormGroupComponent } from 'src/app/put-form-group/put-form-group.component';
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
  @ViewChild(PutFormGroupComponent) putFormGroup: PutFormGroupComponent;

  constructor(
    private formGroupService: FormGroupService,
    private el: ElementRef,
    private renderer: Renderer2
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

  ActiveEditContainer(index: number) {
    const editContainerers =
      this.el.nativeElement.querySelectorAll('.edit-container');

    const editContainer = editContainerers[index];

    const hasClass = editContainer.classList.contains('active');

    if (hasClass) this.renderer.removeClass(editContainer, 'active');
    else this.renderer.addClass(editContainer, 'active');
  }
}
