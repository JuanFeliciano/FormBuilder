import { Component, ViewChild } from '@angular/core';
import { FormCreatorComponent } from 'src/app/components/CreatorComponents/FormCreator/form-creator.component';
import { FormGroupCreatorComponent } from 'src/app/components/CreatorComponents/FormGroupCreator/form-group-creator.component';
import { QuestionCreatorComponent } from 'src/app/components/CreatorComponents/QuestionCreator/question-creator.component';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-create-buttons',
  templateUrl: './create-buttons.component.html',
  styleUrls: ['./create-buttons.component.scss'],
})
export class CrudButtonsComponent {
  role: string | null = this.userService.getRole();

  @ViewChild(FormGroupCreatorComponent)
  formGroupCreator: FormGroupCreatorComponent;
  @ViewChild(FormCreatorComponent) formCreator: FormCreatorComponent;
  @ViewChild(QuestionCreatorComponent)
  questionCreator: QuestionCreatorComponent;

  constructor(private userService: UserService) {}

  canView(): boolean {
    if (this.role === 'Admin') {
      return true;
    } else {
      return false;
    }
  }
}
