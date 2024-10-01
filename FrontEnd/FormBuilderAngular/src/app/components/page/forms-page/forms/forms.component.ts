import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormDeleterComponent } from 'src/app/components/deleterComponents/form-deleter/form-deleter.component';
import { FormUpdaterComponent } from 'src/app/components/updaterComponents/form-updater/form-updater.component';
import { Form } from 'src/app/interfaces/interfaces';
import { FormService } from 'src/app/services/FormService/form.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  form: FormGroup;
  idForm: number = 0;
  visibleElements: boolean[] = [];
  role: string | null = this.userService.getRole();
  formList: Form[] = [];
  selectedForm: Form = { id: 0, idGroup: 0, title: '', questions: [] };

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild(FormUpdaterComponent)
  updaterComponent: FormUpdaterComponent;
  @ViewChild(FormDeleterComponent)
  deleterComponent: FormDeleterComponent;

  constructor(
    private formService: FormService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getForms();

    this.form = this.fb.group({
      id: 0,
      title: '',
    });

    this.formService.formUpdated.subscribe(() => this.getForms());
    this.formService.formDeleted.subscribe(() => this.getForms());

    this.visibleElements = new Array(this.formList.length).fill(false);
  }

  getForms(): void {
    this.formService.getForm().subscribe({
      next: (data: Form[]) => {
        this.formList = data;
      },
    });
  }

  getFormById(id: number): void {
    if (this.dialog.nativeElement.open) return;

    this.formService.getFormById(id).subscribe({
      next: (data: Form) => {
        this.selectedForm = data;
        this.dialog.nativeElement.showModal();
      },
      error: (err) => {
        console.error('Failed to fetch form', err);
      },
    });
  }

  openDialog(event: Event, id: number): void {
    this.idForm = id;
    this.getFormById(id);
    event.stopPropagation();
  }

  closeDialog(event: Event): void {
    event.stopPropagation();
    if (this.dialog.nativeElement.open) {
      this.dialog.nativeElement.close();
    }
  }

  openPutDialog(event: Event, form: Form): void {
    event.stopPropagation();

    this.selectedForm = form;
    this.updaterComponent.updateForm();
    this.form.patchValue({ id: form.id, title: form.title });
  }

  toggleElement(index: number): void {
    this.visibleElements[index] = !this.visibleElements[index];
  }

  @HostListener('document:click', ['$event'])
  outClick(event: Event) {
    const clickInside = (event.target as HTMLElement).closest('.btn-edit');

    if (!clickInside) {
      this.visibleElements = new Array(this.formList.length).fill(false);
    }
  }
}
