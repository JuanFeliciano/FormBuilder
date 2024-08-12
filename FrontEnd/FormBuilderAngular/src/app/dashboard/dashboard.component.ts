import { Component } from '@angular/core';
import { UserService } from '../services/data.service';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private userService: UserService, private router: Router) {}

  Logout(): void {
    var alertMessage = confirm('Are you sure?');

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
}
