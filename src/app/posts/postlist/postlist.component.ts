import { Component } from '@angular/core';
import {PostsService} from './../posts.service'
import { PostList } from '../postlist.interface';
 interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}
interface POSTS{
    id:number;
    slug:string;
    title:string
}
@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrl: './postlist.component.css'
})
export class PostlistComponent {

PostListdata:POSTS[]=[];
PostsList:PostList[]=[]
 constructor(private postser:PostsService){}
  ngOnInit(): void {
    this.postser.getPosts().subscribe((data)=>{
        this.PostsList = data;
        this.createIdSlugArray()

    })
  }  
 createIdSlugArray(): void {
    this.PostListdata = this.PostsList.map(post => ({
      id: post.id,
      slug: post.slug,
      title:post.title.rendered
    }));
    
  }
  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}
