import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/model/our-media-posts';

@Injectable({
  providedIn: 'root'
})
export class RescueService {

  constructor(private http: HttpClient) { }

  private serverApi = 'https://petzilla.herokuapp.com/api';

  public getAllLists(postsPerPage: number, currentPage: number): Observable<{posts: Post[] , totalPosts: number}> {

    const URI = `${this.serverApi}/rescue/`;
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
            followedByMe: this.isFollowedByMe(data.follwedIDs)
          };
         }),
         totalPosts: res.maxPosts
        };
        })
      );
  }

  public isFollowedByMe(ids) {
    if (!localStorage.getItem('user')) {
      return false;
    } else {
    const presentUser = JSON.parse(localStorage.getItem('user')).id;
    return ids.includes(presentUser);
    }
  }

  public deletePost(postId: string) {
    const URI = `${this.serverApi}/rescue/${postId}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.delete(URI, { headers }).subscribe(res => console.log(JSON.stringify(res)));
  }

  public addPost(post: Post) {
    const URI = `${this.serverApi}/rescue/`;
    const headers = new HttpHeaders();
    const postData = new FormData();
    const userName = JSON.parse(localStorage.getItem('user')).name;
    const userId = JSON.parse(localStorage.getItem('user')).id;
    // const body = { title: post.title, description: post.description, src: post.imgSrc, author: userName };
    // console.log(body);
    // postData.append('title', post.title);
    postData.append('description', post.description);
    postData.append('author', userName );
    postData.append('image', post.image , post.title);
    postData.append('mobileNo', post.mobileNo);
    postData.append('authorId', userId);
    // headers.append('Content-Type', 'application/json');
    console.log('rescuePost', postData);
    return this.http.post(URI, postData)
      .subscribe(res => console.log(JSON.stringify(res)));
  }

  public followPost(postId: string, val: boolean) {
    const URI = `${this.serverApi}/rescue/follow/${postId}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const body = { value: val, userId: JSON.parse(localStorage.getItem('user')).id };
    console.log(body);
    return this.http.put(URI, body, { headers })
      .subscribe(res => console.log(JSON.stringify(res)));
}

}
