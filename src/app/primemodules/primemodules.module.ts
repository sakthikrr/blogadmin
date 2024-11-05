import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    SidebarModule,
    PanelMenuModule
  ],
  exports: [  // Export ButtonModule to make it available for other modules
    ButtonModule,
    TableModule,
    SidebarModule,
    PanelMenuModule
  ]

})
export class PrimemodulesModule { }
