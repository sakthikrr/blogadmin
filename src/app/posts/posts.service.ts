import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PostList} from './postlist.interface'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'https://www.api.saktech.online/wp-json/wp/v2/posts';  // Replace with your API URL

  constructor(private httpcli :HttpClient) { }

  getPosts(): Observable<PostList[]> {
    const postslist =  this.httpcli.get<PostList[]>(this.apiUrl);
    return postslist;
  }
}
