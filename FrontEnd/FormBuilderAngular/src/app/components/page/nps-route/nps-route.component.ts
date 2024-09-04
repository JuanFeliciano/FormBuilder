import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nps-route',
  templateUrl: './nps-route.component.html',
  styleUrls: ['./nps-route.component.scss'],
})
export class NpsRouteComponent implements OnInit {
  role!: string | null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    if (this.role != 'Admin') {
      this.router.navigate(['/home']);
    }
  }
}
