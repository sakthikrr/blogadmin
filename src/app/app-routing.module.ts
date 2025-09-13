import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:"",component:WelcomeComponent},
  {path:"login",component:LoginComponent},
  {path:"posts",canActivate:[AuthGuard],loadChildren:()=>import('./posts/posts.module').then(m=>m.PostsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
