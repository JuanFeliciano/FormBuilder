import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/dataService/data.service';
import { SharedService } from '../services/sharedService/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private el: ElementRef,
    private sharedService: SharedService
  ) {}
  username: string | null;
  role: string | null;

  ngOnInit() {
    this.username = this.sharedService.GetUsername();
    this.role = this.sharedService.GetRole();
  }

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
    const sidebar = this.el.nativeElement.querySelector('.sidebar');

    sidebar.classList.toggle('active');
  }
}
