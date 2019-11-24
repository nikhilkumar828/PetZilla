import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurMediaRoutingModule } from './our-media-routing.module';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { AddPostsComponent } from './add-posts/add-posts.component';
import { EditPostsComponent } from './edit-posts/edit-posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material';


@NgModule({
  declarations: [ViewPostsComponent, AddPostsComponent, EditPostsComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    OurMediaRoutingModule
  ]
})
export class OurMediaModule { }
