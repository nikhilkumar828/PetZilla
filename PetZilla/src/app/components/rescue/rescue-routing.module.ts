import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RescueDashboardComponent } from './rescue-dashboard/rescue-dashboard.component';


const routes: Routes = [
  { path: '', component: RescueDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RescueRoutingModule { }
