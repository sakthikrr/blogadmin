import { Component } from '@angular/core';
import {PostsService} from './../posts.service'
import { PostList } from '../types/postlist.interface';
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
  showSuccessMessage: boolean = false;
  isLoading: boolean = true;


 constructor(private postser:PostsService){
    this.postquickedit = new FormGroup({
      post_title: new FormControl(''),
      post_slug: new FormControl(''),
      post_id:new FormControl('')
      });
 }
  ngOnInit(): void {
    this.isLoading = true;
    this.postser.getPosts('any').subscribe((data)=>{
        this.PostsList = data;
        this.createIdSlugArray();
        this.isLoading = false;
    });
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
      this.showSuccessMessage = false; // Reset success message state when opening dialog

         this.postser.getSinglePost(id).subscribe(
          {
            next: (data) => {
              this.postquickedit.patchValue({
                post_title: data?.title?.rendered || '',
                post_slug: data?.slug || '',
                post_id:data.id
              });
              this.visible = true;
            },
            error: (error) => {
              console.error('Failed to fetch the post:', error);
            }
          }
         )
    }

    onSubmit(): void {
      
      const formData = {
        id: this.postquickedit.value.post_id,
        title: this.postquickedit.value.post_title,
        slug: this.postquickedit.value.post_slug
      };
      this.postser.postQuickUpdate(this.postquickedit.value.post_id, formData).subscribe({
        next: (data) => {
          console.log(data);
          // Show success message inside dialog
          this.showSuccessMessage = true;
        },
        error: (error) => {
          console.error('Failed to update the post:', error);
        }
      });
    }
    poststatus(status:string):void{
      console.log(status);
      this.isLoading = true;
      this.postser.getPosts(status).subscribe((data)=>{
        this.PostsList = data;
        this.createIdSlugArray();
        this.isLoading = false;
      });
    }
}
