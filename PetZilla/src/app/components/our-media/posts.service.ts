import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from 'src/app/model/our-media-posts';
import { OurMediaModule } from './our-media.module';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  private serverApi = 'http://localhost:3000';

  public getAllLists(): Observable<Post[]> {

      const URI = `${this.serverApi}/ourmedia/`;
      return this.http.get(URI)
      .pipe(
          // tslint:disable-next-line: no-string-literal no-angle-bracket-type-assertion
          map(res => <Post[]> res['lists'])
          );
  }

  public deleteList(postId: string) {
      const URI = `${this.serverApi}/ourmedia/${postId}`;
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');

      return this.http.delete(URI , {headers} ).subscribe(res => console.log(JSON.stringify(res)));
  }

}
