import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { SharedService } from '../../services/SharedService/shared.service';
import { UserService } from '../../services/LoginService/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  inputName: string = '';
  inputPass: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  onSubmit() {
    const token = localStorage.getItem('authToken');

    if (token) {
      alert('Você já esta logado');
      return;
    }

    const data = {
      username: this.inputName,
      password: this.inputPass,
    };

    this.sharedService.SetCredentials(data.username);

    this.userService
      .Login(data)
      .pipe(
        tap((response) => {
          if (response) {
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('role', response.role);

            console.log('Redirecionando para /dashboard');
            this.router.navigate(['/dashboard']);
          }
        })
      )
      .subscribe({
        error: (error) => {
          console.error('Error sending data', error);
          alert('Login failed: ' + (error.error.message || 'Unknown error'));
        },
      });
  }
}
