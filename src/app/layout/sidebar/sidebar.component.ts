import { Component,ViewChild  } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  items!: MenuItem[];
  sidebarVisible: boolean = true;
  showSidebar() {
    this.sidebarVisible = true;
  }


  ngOnInit() {
    this.items = [
        {
            label: 'Posts',
            icon: 'pi pi-align-justify',
            items: [
                {
                    label: 'Posts List',
                    icon: 'pi pi-file',
                    routerLink:'/posts'
                },
             ]
        }
      
    ]
}

  
}
