import { Component } from '@angular/core';
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
}
