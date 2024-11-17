import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostlistComponent } from './postlist/postlist.component';  // Import your component
import {PosteditComponent} from './postedit/postedit.component'
const routes: Routes = [
  { path: '', component: PostlistComponent },
  { path: 'edit-post/:id', component:PosteditComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
