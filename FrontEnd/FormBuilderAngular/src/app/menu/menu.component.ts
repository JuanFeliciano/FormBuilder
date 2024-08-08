import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  inputName: string = '';
  inputPass: string = '';

  constructor(private dataService: DataService) {}

  onSubmit() {
    const data = {
      username: this.inputName,
      password: this.inputPass
    };

    this.dataService.sendData(data).subscribe(
      (response) => {
        console.log('Data sent successfully', response);
      },
      (error) => {
        console.error('Error sending data', error);
      }
    );
  }
}
