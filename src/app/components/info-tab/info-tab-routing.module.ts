import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoDashboardComponent } from './info-dashboard/info-dashboard.component';
import { InfoSideContentComponent } from './info-side-content/info-side-content.component';


const routes: Routes = [
  {path: ''  , component: InfoDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoTabRoutingModule { }
