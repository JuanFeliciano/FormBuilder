import { Component, ViewChild } from '@angular/core';
import { DialogMessageComponent } from '../../dialogs/dialog-message';
import { Question } from 'src/app/interfaces/interfaces';
import { QuestionService } from 'src/app/services/QuestionService/question.service';

@Component({
  selector: 'app-question-deleter',
  templateUrl: './question-deleter.component.html',
  styleUrls: ['./question-deleter.component.scss'],
})
export class QuestionDeleterComponent {
  @ViewChild(DialogMessageComponent) dialogMessage: DialogMessageComponent;

  constructor(private questionService: QuestionService) {}

  deleteQuestion(question: Question): void {
    const confirmMsg = confirm('Are you sure about that?');

    if (confirmMsg) {
      this.questionService.delete(question.id).subscribe({
        next: () => {
          this.dialogMessage.openDialog('Question Deleted Successfully');
        },
        error: (err) => {
          console.log('Error deleting question', err);
        },
      });
    }
  }
}
