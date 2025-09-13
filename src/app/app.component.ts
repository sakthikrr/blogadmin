import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import{HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component'
import {SidebarComponent} from './layout/sidebar/sidebar.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'blogadmin';
  showSidebar = true;

  constructor(private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.updateLayout(e.urlAfterRedirects || e.url);
    });
  }

  private updateLayout(url: string): void {
    this.showSidebar = !url.startsWith('/login');
  }
}
