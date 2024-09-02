import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Form, FormGroupModel } from 'src/app/interfaces/interfaces';
import { FormService } from 'src/app/services/FormService/form.service';
import { FormUpdaterComponent } from '../../updaterComponents/form-updater/form-updater.component';
import { BoxQuestionComponent } from '../box-question/box-question.component';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
@Component({
  selector: 'app-box-form',
  templateUrl: './box-form.component.html',
  styleUrls: ['./box-form.component.scss'],
})
export class BoxFormComponent implements OnInit, OnChanges {
  @Input() formGroupId: number;
  formsSelected: Form[];

  selectedForm: Form = { id: 0, idGroup: 0, title: '', questions: [] };

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild(FormUpdaterComponent) formUpdater: FormUpdaterComponent;
  @ViewChild(BoxQuestionComponent) questionComponent: BoxQuestionComponent;

  constructor(
    private formService: FormService,
    private formGroupService: FormGroupService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.formService.formUpdated.subscribe(this.getFormByGroupId.bind(this));

    this.formService.formDeleted.subscribe(this.getFormByGroupId.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroupId'] && !changes['formGroupId'].isFirstChange()) {
      this.getFormByGroupId();
    }
  }

  getFormByGroupId(): void {
    if (this.formGroupId != 0) {
      this.formGroupService.getFormGroupById(this.formGroupId).subscribe({
        next: (data: FormGroupModel) => {
          this.formsSelected = data.forms;
        },
        error: (err) => {
          console.error('Failed fetching formgroup by id', err);
        },
      });
    }
  }

  openFormDialog(form: Form) {
    this.selectedForm = form;

    this.dialog.nativeElement.showModal();
  }

  closeFormDialog() {
    this.dialog.nativeElement.close();
  }

  confirmDelete(id: number): void {
    if (confirm('Are you sure about this?')) {
      this.formService.deleteForm(id).subscribe({
        next: () => {
          console.log('Form deleted successfully');
          this.closeFormDialog();
        },
        error: (err) => {
          console.error('Error deleting form', err);
        },
      });
    }
  }

  ActiveEditContainer(index: number) {
    const editContainers =
      this.el.nativeElement.querySelectorAll('.edit-container');

    const editContainer = editContainers[index];

    const hasClass = editContainer.classList.contains('active');

    if (hasClass) this.renderer.removeClass(editContainer, 'active');
    else this.renderer.addClass(editContainer, 'active');
  }

  openPutDialog(form: Form): void {
    this.selectedForm = form;
    this.formUpdater.dialogPut.nativeElement.showModal();
  }
}
