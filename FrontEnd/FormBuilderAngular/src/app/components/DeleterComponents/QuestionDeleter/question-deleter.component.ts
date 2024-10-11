import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { QuestionService } from 'src/app/services/QuestionService/question.service';
import { DialogMessageComponent } from '../../../shared/MessageDialog/dialog-message';
import { Question } from 'src/app/models/interfaces/interfaces';
import { ConfirmDialogComponent } from '../../../shared/ConfirmDialog/confirm-dialog.component';

@Component({
  selector: 'app-question-deleter',
  templateUrl: './question-deleter.component.html',
  styleUrls: ['./question-deleter.component.scss'],
})
export class QuestionDeleterComponent {
  @Output() questionDeleted: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(DialogMessageComponent) dialogMessage: DialogMessageComponent;
  @ViewChild(ConfirmDialogComponent) confirmDialog: ConfirmDialogComponent;

  constructor(private questionService: QuestionService) {}

  deleteQuestion(question: Question): void {
    this.confirmDialog.openDialog();

    this.confirmDialog.shouldDelete.subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this.questionService.delete(question.id).subscribe({
          next: () => {
            this.questionDeleted.emit();
            this.dialogMessage.openDialog('Question Deleted Successfully');
          },
          error: (err) => {
            console.error('Error deleting form', err);
          },
        });
      }
    });
  }
}
