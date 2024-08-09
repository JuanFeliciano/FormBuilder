import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  inputName: string = '';
  inputPass: string = '';

  constructor(private dataService: DataService, private router: Router) {}

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

    this.dataService.sendData(data).subscribe(
      (response) => {
        if (response && response.token) {
          localStorage.setItem('authToken', JSON.stringify(response.token));

          console.log('Redirecionando para /dashboard');
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.error('Error sending data', error);
        alert('Login failed: ' + (error.error.message || 'Unknown error'));
      }
    );
  }
}
