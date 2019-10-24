import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RescueRoutingModule } from './rescue-routing.module';
import { RescueDashboardComponent } from './rescue-dashboard/rescue-dashboard.component';


@NgModule({
  declarations: [RescueDashboardComponent],
  imports: [
    CommonModule,
    RescueRoutingModule
  ]
})
export class RescueModule { }
