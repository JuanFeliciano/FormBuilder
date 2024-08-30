import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/LoginService/login.service';
import { FormGroupCreatorComponent } from '../../creatorComponents/form-group-creator/form-group-creator.component';
import { FormCreatorComponent } from 'src/app/components/creatorComponents/form-creator/form-creator.component';
import { QuestionCreatorComponent } from 'src/app/components/creatorComponents/question-creator/question-creator.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @ViewChild(FormGroupCreatorComponent)
  formGroupCreatorComponent: FormGroupCreatorComponent;
  @ViewChild(FormCreatorComponent) formCreatorComponent: FormCreatorComponent;
  @ViewChild(QuestionCreatorComponent)
  questionCreatorComponent: QuestionCreatorComponent;

  event: Event;

  constructor(
    private userService: UserService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  username: string = localStorage.getItem('name')!;
  role: string = localStorage.getItem('role')!;

  Logout(): void {
    const alertMessage: boolean = confirm('Are you sure?');

    if (alertMessage) {
      this.userService
        .Logout()
        .pipe(
          tap(() => {
            localStorage.clear();
            this.router.navigate(['/login']);
          }),
          catchError((error: HttpErrorResponse) => {
            console.error('Error during logout', error);
            alert(
              'LogOut failed: ' + (error.error?.message || 'Unknown Error')
            );
            return throwError(() => new Error('LogOut failed'));
          })
        )
        .subscribe();
    }
  }

  ActiveSidebar() {
    const sidebarElement = this.el.nativeElement.querySelector('.sidebar');
    const hasClass = sidebarElement.classList.contains('active');

    if (hasClass) this.renderer.removeClass(sidebarElement, 'active');
    else this.renderer.addClass(sidebarElement, 'active');
  }
}
