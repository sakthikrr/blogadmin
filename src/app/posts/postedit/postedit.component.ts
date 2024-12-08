import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service'; // Import your service for interacting with the API
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-postedit',
  templateUrl: './postedit.component.html',
  styleUrl: './postedit.component.css'
})
export class PosteditComponent {
  postForm: FormGroup;
  postId?:number
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private postservice:PostsService) {
    this.postForm = this.fb.group({
      post_title: ['', Validators.required],
      post_content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id')) || 0;

    this.postservice.getSinglePost(this.postId).subscribe(
      {
        next: (data:any) => {
          this.postForm.patchValue({
            post_title: data?.title?.rendered || '',
            post_content:data?.content?.rendered || '',
          });
         
        }
      }
     )
  }
  onSubmit(): void {
    if (this.postForm.valid) {
      console.log(this.postForm.value);
    }
  }
}
