import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { AddPostsComponent } from './add-posts/add-posts.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';


const routes: Routes = [
  { path: '', component: ViewPostsComponent },
  { path: 'ourmedia/addPost', component: AddPostsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurMediaRoutingModule { }
