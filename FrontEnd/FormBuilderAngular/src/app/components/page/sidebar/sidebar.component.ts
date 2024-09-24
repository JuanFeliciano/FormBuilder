import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormGroupCreatorComponent } from '../../creatorComponents/form-group-creator/form-group-creator.component';
import { FormCreatorComponent } from '../../creatorComponents/form-creator/form-creator.component';
import { QuestionCreatorComponent } from '../../creatorComponents/question-creator/question-creator.component';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-sidebar',
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
  route: string;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private loginService: LoginService,
    private userService: UserService
  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      this.updateButtonLabel();
      this.updateButtonAnswer();
    });
  }

  currentRoute: string = '';
  buttonLabel: string = '';
  buttonAnswer: string = '';
  username: string = localStorage.getItem('name')!;
  role: string | null = this.userService.getRole();

  Logout(): void {
    const alertMessage: boolean = confirm('Are you sure?');

    if (alertMessage) {
      this.loginService
        .Logout()
        .pipe(
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

    if (hasClass) {
      this.renderer.removeClass(sidebarElement, 'active');
    } else {
      this.renderer.addClass(sidebarElement, 'active');
    }
  }

  updateButtonLabel(): void {
    if (this.currentRoute === '/dashboard' || this.currentRoute === '/answer') {
      this.buttonLabel = 'NPS';
    } else if (this.currentRoute === '/nps') {
      this.buttonLabel = 'Dashboard';
    }
  }

  updateButtonAnswer(): void {
    if (this.currentRoute === '/dashboard' || this.currentRoute === '/nps') {
      this.buttonAnswer = 'Answer';
    } else if (this.currentRoute === '/answer') {
      this.buttonAnswer = 'Dashboard';
    }
  }

  navigateBasedOnRoute(): void {
    if (this.currentRoute != '/nps') {
      this.router.navigate(['/nps']);
    } else if (this.currentRoute === '/nps') {
      this.router.navigate(['/dashboard']);
    }
  }
  navigateBasedOnRouteAnswer(): void {
    if (this.currentRoute != '/answer') {
      this.router.navigate(['/answer']);
    } else if (this.currentRoute === '/answer') {
      this.router.navigate(['/dashboard']);
    }
  }
}
