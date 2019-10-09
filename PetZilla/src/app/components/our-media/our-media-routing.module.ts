import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { AddPostsComponent } from './add-posts/add-posts.component';


const routes: Routes = [
  { path: '', component: ViewPostsComponent },
  { path: 'addPost', component: AddPostsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurMediaRoutingModule { }
