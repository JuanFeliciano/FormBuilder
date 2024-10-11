import { Component, OnInit, ViewChild } from '@angular/core';
import { AnswerDialogComponent } from 'src/app/components/Dialogs/AnswerDialog/answer-dialog.component';
import { Form } from 'src/app/models/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { FormService } from 'src/app/services/FormService/form.service';
import { QuestionService } from 'src/app/services/QuestionService/question.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {
  filteredForms: Form[] = [];
  selectedFormId: number;

  @ViewChild('answerDialog') answerDialog: AnswerDialogComponent;

  constructor(
    private formService: FormService,
    private formGroupService: FormGroupService,
  ) {}

  ngOnInit(): void {
    this.getForm();

    this.formService.formCreated.subscribe(() => {
      this.getForm();
    });
    this.formGroupService.formGroupCreated.subscribe(() => {
      this.getForm();
    });
  }

  getForm(): void {
    this.formService.getForm().subscribe({
      next: (data: Form[]) => {
        this.filteredForms = data;
      },
      error: (err) => {
        console.log('error fetching form data', err);
      },
    });
  }

  onSearch(searchValue: string): void {
    this.formService.getForm().subscribe({
      next: (data: Form[]) => {
        this.filteredForms = data.filter((i) =>
          i.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        );
      },
    });
  }

  openDialog(formId: number): void {
    this.selectedFormId = formId;
    this.answerDialog.openDialog();
  }
}
