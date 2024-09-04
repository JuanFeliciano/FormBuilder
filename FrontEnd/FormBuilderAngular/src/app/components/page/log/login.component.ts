import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from 'src/app/services/LoginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  inputName: string = '';
  inputPass: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    const data = {
      username: this.inputName,
      password: this.inputPass,
    };

    localStorage.setItem('name', data.username);

    this.userService
      .Login(data)
      .pipe(
        tap((response) => {
          if (response) {
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
