import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/LoginService/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
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
