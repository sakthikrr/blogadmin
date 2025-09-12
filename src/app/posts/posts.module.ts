import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimemodulesModule} from '../primemodules/primemodules.module'
import { PostsRoutingModule } from './posts-routing.module';
import { PostlistComponent } from './postlist/postlist.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PosteditComponent } from './postedit/postedit.component';
import { TagsOrganizerComponent } from './tags-organizer/tags-organizer.component'; // Import this


@NgModule({
  declarations: [
    PostlistComponent,
    PosteditComponent,
    TagsOrganizerComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    PrimemodulesModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PostsModule { }
