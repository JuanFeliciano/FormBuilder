import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-route',
  templateUrl: './answer-route.component.html',
  styleUrls: ['./answer-route.component.scss'],
})
export class AnswerRouteComponent implements OnInit {
  role: string | null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    if (this.role != 'Admin') {
      this.router.navigate(['/home']);
    }
  }
}
