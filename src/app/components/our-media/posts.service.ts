import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from 'src/app/model/our-media-posts';
import { OurMediaModule } from './our-media.module';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  private serverApi = 'https://petzilla.herokuapp.com/';

  public getAllLists(postsPerPage: number, currentPage: number): Observable<{posts: Post[] , totalPosts: number}> {

    const URI = `${this.serverApi}/ourmedia/`;
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{ message: string; lists: any; maxPosts: number }>(URI + queryParams)
      .pipe(
        // tslint:disable-next-line: no-string-literal no-angle-bracket-type-assertion
        map(res => {
         return {
           // tslint:disable-next-line: no-string-literal no-angle-bracket-type-assertion
          posts: res.lists.map(data => {
          return {
            ...data,
            likedByMe: this.isLikedByMe(data.likedUserIDs)
          };
         }),
         totalPosts: res.maxPosts
        };
        })
      );
  }

  public isLikedByMe(ids) {
    if (!localStorage.getItem('user')) {
      return false;
    } else {
    const presentUser = JSON.parse(localStorage.getItem('user')).id;
    return ids.includes(presentUser);
    }
  }

  public deleteList(postId: string) {
    const URI = `${this.serverApi}/ourmedia/${postId}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.delete(URI, { headers }).subscribe(res => console.log(JSON.stringify(res)));
  }

  public addPost(post: Post) {
    const URI = `${this.serverApi}/ourmedia/`;
    const headers = new HttpHeaders();
    const postData = new FormData();
    const userName = JSON.parse(localStorage.getItem('user')).name;
    // const body = { title: post.title, description: post.description, src: post.imgSrc, author: userName };
    // console.log(body);
    postData.append('title', post.title);
    postData.append('description', post.description);
    postData.append('author', userName );
    postData.append('image', post.image , post.title);
    // headers.append('Content-Type', 'application/json');
    console.log(postData);
    return this.http.post(URI, postData)
      .subscribe(res => console.log(JSON.stringify(res)));
  }

  public likePost(postId: string, val: boolean) {
    if (!this.auth.isLoggedIn()) {
      alert('Login to like!');
    } else {
    const URI = `${this.serverApi}/ourmedia/like/${postId}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const body = { value: val, userId: JSON.parse(localStorage.getItem('user')).id };
    console.log(body);
    return this.http.put(URI, body, { headers })
      .subscribe(res => console.log(JSON.stringify(res)));
  }
}

}
