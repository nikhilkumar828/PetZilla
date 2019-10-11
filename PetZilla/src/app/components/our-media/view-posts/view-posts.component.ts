import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

import { Post } from 'src/app/model/our-media-posts';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {

  postData: Post[];
  isLiked = false;
  constructor(private postService: PostsService , public auth: AuthenticationService) { }

  ngOnInit() {
    this.postService.getAllLists().subscribe( data => {
      console.log(data);
      this.postData = data;
    });
  }

  likePost(postId: string , value: boolean) {
    console.log(value);
    this.postService.likePost(postId, value);
  }

}
