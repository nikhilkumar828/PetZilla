import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/our-media-posts';
import { PageEvent } from '@angular/material';
import { RescueService } from '../rescue.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-rescue-dashboard',
  templateUrl: './rescue-dashboard.component.html',
  styleUrls: ['./rescue-dashboard.component.css']
})
export class RescueDashboardComponent implements OnInit {

  postData: Post[] = [];
  isLiked = false;
  loading:boolean = true
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [ 2, 6, 10];

  constructor(private postService: RescueService  , public auth: AuthenticationService) { }

  ngOnInit() {
    this.postService.getAllLists(this.postsPerPage, this.currentPage).subscribe( data => {
      console.log(data);
      this.postData = data.posts;
      this.totalPosts = data.totalPosts;
      this.loading = false
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getAllLists(this.postsPerPage, this.currentPage).subscribe( data => {
      console.log(data);
      this.postData = data.posts;
      this.totalPosts = data.totalPosts;
    });
  }

  isRoleRescue() {
    const presentUser = JSON.parse(localStorage.getItem('user')).role;
    if (presentUser.toLowerCase() === 'rescue') {
      return true;
    }  else {
      return false;
    }
  }

  followPost(postId: string , value: boolean, index: number) {
    console.log(value);
    if (value) {
    this.postData[index].followedByMe = true;
    this.postData[index].followers++;
    } else {
      this.postData[index].followedByMe = false;
      this.postData[index].followers--;
    }
    this.postService.followPost(postId, value);
  }
}
