import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showLogout = false;

  constructor(private auth: AuthService, private router: Router) {
    // Evaluate on initial load
    this.updateVisibility(this.router.url);
    // React to route changes
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.updateVisibility(e.urlAfterRedirects || e.url);
    });
  }

  private updateVisibility(url: string): void {
    this.showLogout = this.auth.isAuthenticated() && !url.startsWith('/login');
  }

  logout(): void {
    this.auth.logout();
    this.updateVisibility('/login');
    this.router.navigate(['/login']);
  }
}
