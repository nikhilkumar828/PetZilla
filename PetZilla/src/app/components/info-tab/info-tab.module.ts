import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoTabRoutingModule } from './info-tab-routing.module';
import { InfoDashboardComponent } from './info-dashboard/info-dashboard.component';
import { InfoSideContentComponent } from './info-side-content/info-side-content.component';


@NgModule({
  declarations: [InfoDashboardComponent, InfoSideContentComponent],
  imports: [
    CommonModule,
    InfoTabRoutingModule
  ]
})
export class InfoTabModule { }
