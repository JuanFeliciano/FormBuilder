import { Component } from '@angular/core';
import { UserService } from '../services/data.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  inputName: string = '';
  inputPass: string = '';

  constructor(private userService: UserService, private router: Router) {}

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

    this.userService
      .Login(data)
      .pipe(
        tap((response) => {
          if (response) {
            localStorage.setItem('token', response.accessToken);

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
