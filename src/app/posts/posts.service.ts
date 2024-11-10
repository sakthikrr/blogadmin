import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PostList} from './postlist.interface'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'https://www.api.saktech.online/wp-json/wp/v2/posts';  // Replace with your API URL
  private baseUrl = environment.apiUrl;

  constructor(private httpcli :HttpClient) { }

  getPosts(): Observable<PostList[]> {
    const postslist =  this.httpcli.get<PostList[]>(`${this.baseUrl}posts`);
    return postslist;
  }
  getSinglePost(id:number):Observable<PostList>{
    const post = this.httpcli.get<PostList>(`${this.baseUrl}posts/${id}`)
    return post;
  }
}
