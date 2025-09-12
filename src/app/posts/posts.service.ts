import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import {PostList} from './types/postlist.interface'
import { map, Observable,tap } from 'rxjs';
import { environment } from '../../environments/environment';
import {Category} from './types/categorylist.interface'
import {Status} from './types/wpstatus.interface'
import {Tag} from './types/taglist.interface'
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl = environment.apiUrl;
  private username = "od5bp";
  private appPassword ="wxNQ vGTr HET4 W61D 2z0L zV0Z";
  private authHeader = 'Basic ' + btoa(this.username + ':' + this.appPassword);
  constructor(private httpcli :HttpClient) {}

  getPosts(poststatus:string='any'): Observable<PostList[]> {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authHeader
    });
      const postslist =  this.httpcli.get<PostList[]>(`${this.baseUrl}posts?status=${poststatus}`, { headers: headers });
      return postslist;
  }
  getSinglePost(id:number):Observable<PostList>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authHeader
    });
      const post = this.httpcli.get<PostList>(`${this.baseUrl}posts/${id}`, { headers: headers });
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
  getPostFeatureImage(postid:number):Observable<any>{
    const url = `${this.baseUrl}media/${postid}`;
    return this.httpcli.get(url);
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authHeader
    });
    return this.httpcli.get<{ [key: string]: Status }>(url,{ headers: headers }).pipe(
      tap(
        statuses => console.log('Fetched statuses:', Object.keys(statuses))
        
    ), // Log the statuses
      map((statuses) => 
        Object.keys(statuses).map(key => ({
          name: statuses[key].name,
          public: statuses[key].public,
          protected: statuses[key].protected,
          private: statuses[key].private,
          queryable: statuses[key].queryable,
          slug: statuses[key].slug
        }))
      )
    );
  }
    // Get media by ID
    getMediaById(id: number): Observable<any> {
      return this.httpcli.get(`${this.baseUrl}/media/${id}`);
    }

    // Upload media file to WordPress
  uploadMedia(file: File): Observable<any> {
    const url = `${this.baseUrl}media`;
    const formData = new FormData();
    formData.append('file', file);
    
    const headers = new HttpHeaders({
      'Authorization': this.authHeader
      // Note: Don't set Content-Type as browser will set it with correct boundary for multipart/form-data
    });
    
    return this.httpcli.post(url, formData, { headers: headers });
  }
  
  // Get tags list
  getTagsList(): Observable<Tag[]> {
    const url = `${this.baseUrl}tags`;
    return this.httpcli.get<Tag[]>(url).pipe(
      map((tags) =>
        tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
          description: tag.description,
          count: tag.count
        }))
      )
    );
  }

  // Create a new tag
  createTag(tagName: string): Observable<Tag> {
    const url = `${this.baseUrl}tags`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authHeader
    });
    
    console.log('Creating tag with name:', tagName);
    
    return this.httpcli.post<Tag>(url, { name: tagName }, { headers: headers }).pipe(
      tap(response => console.log('Tag creation response:', response))
    );
  }
}
