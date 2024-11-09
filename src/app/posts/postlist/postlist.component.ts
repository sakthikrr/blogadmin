import { Component } from '@angular/core';
import {PostsService} from './../posts.service'
import { PostList } from '../postlist.interface';
import {FormGroup, FormControl} from '@angular/forms';
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
postquickedit: FormGroup;

 constructor(private postser:PostsService){
    this.postquickedit = new FormGroup({
        post_tile: new FormControl(''),
      });
 }
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

    showDialog(id:number) {
         this.visible = true;
    }
}
