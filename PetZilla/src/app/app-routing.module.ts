import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: './components/login/login.module#LoginModule'
  },
  {
    path: '',
    loadChildren: './components/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'dashboard',
    loadChildren: './components/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'ourmedia',
    loadChildren: './components/our-media/our-media.module#OurMediaModule'
  },
  {
    path: 'infotab',
    loadChildren: './components/info-tab/info-tab.module#InfoTabModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
