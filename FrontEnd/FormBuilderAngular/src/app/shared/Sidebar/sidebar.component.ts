import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService/user.service';
import { FormGroupCreatorComponent } from '../../components/CreatorComponents/FormGroupCreator/form-group-creator.component';
import { FormCreatorComponent } from '../../components/CreatorComponents/FormCreator/form-creator.component';
import { QuestionCreatorComponent } from '../../components/CreatorComponents/QuestionCreator/question-creator.component';
import { ConfirmDialogComponent } from '../ConfirmDialog/confirm-dialog.component';

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
  @ViewChild(ConfirmDialogComponent) confirmDialog: ConfirmDialogComponent;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private loginService: LoginService,
    private userService: UserService
  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  currentRoute: string = '';
  buttonLabels: { [key: string]: string } = {
    '/nps': 'NPS',
    '/answer': 'Answer',
    '/forms': 'Forms',
  };
  isHovered: boolean = false;
  username: string = localStorage.getItem('name')!;
  role: string | null = this.userService.getRole();

  getButtonLabel(route: string): string {
    return this.currentRoute === route ? 'Dashboard' : this.buttonLabels[route];
  }

  navigateBasedOnRoute(route: string): void {
    if (this.currentRoute !== route) {
      this.router.navigate([route]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  Logout(): void {
    this.confirmDialog.openDialog();

    this.confirmDialog.shouldDelete.subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
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
    });
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

  canView(): boolean {
    if (this.role === 'Admin') {
      return true;
    } else {
      return false;
    }
  }
}
