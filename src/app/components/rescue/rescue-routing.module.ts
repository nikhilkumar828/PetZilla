import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RescueDashboardComponent } from './rescue-dashboard/rescue-dashboard.component';
import { AddRescuePostComponent } from './add-rescue-post/add-rescue-post.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';


const routes: Routes = [
  { path: '', component: RescueDashboardComponent },
  { path: 'addPost', component: AddRescuePostComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RescueRoutingModule { }
