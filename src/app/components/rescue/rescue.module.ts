import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RescueRoutingModule } from './rescue-routing.module';
import { RescueDashboardComponent } from './rescue-dashboard/rescue-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatPaginatorModule } from '@angular/material';
import { AddRescuePostComponent } from './add-rescue-post/add-rescue-post.component';


@NgModule({
  declarations: [RescueDashboardComponent, AddRescuePostComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    RescueRoutingModule
  ]
})
export class RescueModule { }
