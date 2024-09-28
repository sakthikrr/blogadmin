import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimemodulesModule} from '../primemodules/primemodules.module'
import { PostsRoutingModule } from './posts-routing.module';
import { PostlistComponent } from './postlist/postlist.component';


@NgModule({
  declarations: [
    PostlistComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    PrimemodulesModule
  ]
})
export class PostsModule { }
