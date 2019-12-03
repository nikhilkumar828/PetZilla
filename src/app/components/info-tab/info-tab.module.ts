import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoTabRoutingModule } from './info-tab-routing.module';
import { InfoDashboardComponent } from './info-dashboard/info-dashboard.component';
import { InfoSideContentComponent } from './info-side-content/info-side-content.component';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [InfoDashboardComponent, InfoSideContentComponent],
  imports: [
    CommonModule,
    InfoTabRoutingModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class InfoTabModule { }
