import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Form } from 'src/app/interfaces/interfaces';
import { BoxQuestionComponent } from '../box-question/box-question.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/FormService/form.service';
@Component({
  selector: 'app-box-form',
  templateUrl: './box-form.component.html',
  styleUrls: ['./box-form.component.scss'],
})
export class BoxFormComponent implements OnInit {
  formGroup: FormGroup;
  selectFormPut: Form;
  @Input() selectedFormList: Form[] = [];

  selectedForm: Form | null = null;

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogPut') dialogPut: ElementRef<HTMLDialogElement>;
  @ViewChild(BoxQuestionComponent) questionComponent: BoxQuestionComponent;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: 0,
      title: '',
      questions: [],
    });
  }

  getFormGroupByIdToPut(id: number): void {
    this.formService.getFormById(id).subscribe({
      next: (data: Form) => {
        this.selectFormPut = data;

        this.dialogPut.nativeElement.showModal();
      },
      error: (err) => {
        console.error('Failed to fetch form group', err);
      },
    });
  }

  updateForm(): void {}

  openFormDialog(event: Event, form: Form) {
    event.stopPropagation();

    this.selectedForm = form;

    this.dialog.nativeElement.showModal();
  }

  closeFormDialog(event: Event) {
    event.stopPropagation();

    this.dialog.nativeElement.close();
    this.selectedForm = null;
  }

  openPutDialog(event: Event, id: number) {
    event.stopPropagation();

    this.formGroup.patchValue({ id: id });

    this.dialogPut.nativeElement.showModal();
  }

  closePutDialog(event: Event) {
    event.stopPropagation();

    this.dialogPut.nativeElement.close();
    this.selectedForm = null;
  }

  ActiveEditContainer(index: number) {
    const editContainers =
      this.el.nativeElement.querySelectorAll('.edit-container');

    const editContainer = editContainers[index];

    const hasClass = editContainer.classList.contains('active');

    if (hasClass) this.renderer.removeClass(editContainer, 'active');
    else this.renderer.addClass(editContainer, 'active');
  }
}
