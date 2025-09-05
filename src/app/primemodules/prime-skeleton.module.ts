import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  imports: [
    CommonModule,
    SkeletonModule
  ],
  exports: [
    SkeletonModule
  ]
})
export class PrimeSkeletonModule {}
