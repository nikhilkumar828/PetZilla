import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPostsComponent } from './view-posts/view-posts.component';


const routes: Routes = [
  { path: '', component: ViewPostsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurMediaRoutingModule { }
