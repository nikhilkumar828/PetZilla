import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

import { Post } from 'src/app/model/our-media-posts';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {

  postData: Post[] = [];
  isLiked = false;

  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [ 2, 6, 10];

  constructor(private postService: PostsService , public auth: AuthenticationService) { }

  ngOnInit() {
    this.postService.getAllLists(this.postsPerPage, this.currentPage).subscribe( data => {
      console.log(data);
      this.postData = data.posts;
      this.totalPosts = data.totalPosts;
    });
  }

  likePost(postId: string , value: boolean, index: number) {
    console.log(value);
    if (value) {
    this.postData[index].likedByMe = true;
    this.postData[index].likes++;
    } else {
      this.postData[index].likedByMe = false;
      this.postData[index].likes--;
    }
    this.postService.likePost(postId, value);
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

}
