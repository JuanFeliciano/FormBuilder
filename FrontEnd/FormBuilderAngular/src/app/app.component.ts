import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/TokenService/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'FormBuilderAPI';

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    const token: string | null = this.tokenService.getAcessToken();

    if (token == null) {
      this.router.navigate(['/login']);
    }
  }
}
