import { Component, OnInit, ViewChild } from '@angular/core';
import { Form } from 'src/app/interfaces/interfaces';
import { FormService } from 'src/app/services/FormService/form.service';
import { AnswerDialogComponent } from '../../dialogs/answer-dialog/answer-dialog/answer-dialog.component';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {
  formArray: Form[] = [];
  selectedFormId: number;

  @ViewChild('answerDialog') answerDialog: AnswerDialogComponent;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.getForm();
  }

  getForm(): void {
    this.formService.getForm().subscribe({
      next: (data: Form[]) => {
        this.formArray = data;
      },
      error: (err) => {
        console.log('error fetching form data', err);
      },
    });
  }

  openDialog(formId: number): void {
    this.selectedFormId = formId;
    this.answerDialog.openDialog();
  }
}
