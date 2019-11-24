import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'ourmedia',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './components/login/login.module#LoginModule'
  },
  {
    path: 'dashboard',
    loadChildren: './components/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'infotab',
    loadChildren: './components/info-tab/info-tab.module#InfoTabModule'
  },
  {
    path: 'rescue',
    loadChildren: './components/rescue/rescue.module#RescueModule'
  },
  {
    path: 'ourmedia',
    loadChildren: './components/our-media/our-media.module#OurMediaModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
