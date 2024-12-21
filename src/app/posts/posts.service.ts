import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import {PostList} from './types/postlist.interface'
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Category} from './types/categorylist.interface'
import {Status} from './types/wpstatus.interface'
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl = environment.apiUrl;
  private username = "od5bp";
  private appPassword ="wxNQ vGTr HET4 W61D 2z0L zV0Z";
  private authHeader = 'Basic ' + btoa(this.username + ':' + this.appPassword);
  constructor(private httpcli :HttpClient) {}

  getPosts(): Observable<PostList[]> {
      const postslist =  this.httpcli.get<PostList[]>(`${this.baseUrl}posts`);
      return postslist;
  }
  getSinglePost(id:number):Observable<PostList>{
      const post = this.httpcli.get<PostList>(`${this.baseUrl}posts/${id}`)
      return post;
  }
  postQuickUpdate(id:number,formdata:{ id: number,title: string}){
    const url = `${this.baseUrl}posts/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authHeader
    });

    return this.httpcli.put(url, formdata, { headers: headers });

  }

  postUpdate(id:number,formdata:{ id: number,title: string}){
    const url = `${this.baseUrl}posts/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authHeader
    });

    return this.httpcli.put(url, formdata, { headers: headers });

  }
  postCategoryList():Observable<Category[]>{
      const url = `${this.baseUrl}categories`;
      return this.httpcli.get<Category[]>(url).pipe(
        map((categories) =>
          categories.map((category) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description,
            count: category.count
          }))
        )
      );

  }

  postStatusList():Observable<Status[]>{
    const url = `${this.baseUrl}statuses`;
    return this.httpcli.get<Status[]>(url).pipe(
      map((statuses) =>
        statuses.map((status) => ({
          name: status.name,
          public: status.public,
          protected: status.protected,
          private: status.private,
          queryable: status.queryable,
          slug: status.slug
        }))
      )
    );
  }
  
}
