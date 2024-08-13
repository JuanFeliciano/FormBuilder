import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  SetCredentials(name: string) {
    localStorage.setItem('name', name);
  }

  GetUsername(): string | null {
    const name: string | null = localStorage.getItem('name');

    return name;
  }

  GetRole(): string | null {
    const role: string | null = localStorage.getItem('role');

    return role;
  }
}
