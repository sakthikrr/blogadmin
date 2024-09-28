import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [  // Export ButtonModule to make it available for other modules
    ButtonModule
  ]

})
export class PrimemodulesModule { }
