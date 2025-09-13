import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInKey = 'local_auth_logged_in';

  validateCredentials(username: string, password: string): boolean {
    const ok = username === environment.localAuthUser && password === environment.localAuthPassword;
    if (ok) {
      localStorage.setItem(this.loggedInKey, 'true');
    }
    return ok;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.loggedInKey) === 'true';
  }

  logout(): void {
    localStorage.removeItem(this.loggedInKey);
  }
}
