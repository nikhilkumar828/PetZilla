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

  private serverApi = 'http://localhost:3000';

  public getAllLists(): Observable<Post[]> {

    const URI = `${this.serverApi}/ourmedia/`;
    return this.http.get(URI)
      .pipe(
        // tslint:disable-next-line: no-string-literal no-angle-bracket-type-assertion
        map(res => {
         return <Post[]>res['lists'].map(data => {
          return {
            ...data,
            likedByMe: this.isLikedByMe(data.likedUserIDs)
          }
         })
        })
      );
  }

  public isLikedByMe(ids) {
    if(!localStorage.getItem('user')){
      return false;
    }else {
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

  public addPost(post: any) {
    const URI = `${this.serverApi}/ourmedia/`;
    const headers = new HttpHeaders();
    const userName = JSON.parse(localStorage.getItem('user')).name;
    const body = { title: post.title, description: post.description, src: post.imgSrc, author: userName };
    console.log(body);
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body, { headers })
      .subscribe(res => console.log(JSON.stringify(res)));
  }

  public likePost(postId: string, val: boolean) {
    if(!this.auth.isLoggedIn()){
      alert('Login to like!');
    }else {
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
