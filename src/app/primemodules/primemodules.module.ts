import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule
  ],
  exports: [  // Export ButtonModule to make it available for other modules
    ButtonModule,
    TableModule
  ]

})
export class PrimemodulesModule { }
