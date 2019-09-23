import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  login(): Promise<boolean> {
    localStorage.setItem('token', this.generateToken());

    return Promise.resolve(!!localStorage.getItem('token'));
  }

  generateToken(): string {
    const date: number = new Date().getTime();
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    text += date;

    return text;
  }
}
