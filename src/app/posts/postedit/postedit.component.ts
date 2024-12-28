import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service'; // Import your service for interacting with the API
import { ActivatedRoute } from '@angular/router';
import { Category } from '../types/categorylist.interface';
@Component({
  selector: 'app-postedit',
  templateUrl: './postedit.component.html',
  styleUrl: './postedit.component.css'
})
export class PosteditComponent {
  postForm: FormGroup;
  postId?:number
  cities: any[] = [];
  post_status: any[] = []
  categories : Category[] = [];
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private postservice:PostsService) {
    this.postForm = this.fb.group({
      post_title: ['', Validators.required],
      post_content: ['', Validators.required],
      post_id: [''],
      select_status: [''],
    });
  }


  ngOnInit(): void {
    this.postservice.postCategoryList().subscribe(data=>{
      this.categories=data
    
      this.cities = this.categories.map(
        category => 
        (
          { name: category.name, code: category.slug }
        )
      );
    })

    this.postservice.postStatusList().subscribe(data => {
      console.log(data);
     this.post_status = data.map(status => ({ name: status.name, code: status.slug }));
      console.log("Post Status");
      console.log(this.post_status);
    });
 
    this.postId = Number(this.route.snapshot.paramMap.get('id')) || 0;

    this.postservice.getSinglePost(this.postId).subscribe(
      {
        next: (data:any) => {
          this.postForm.patchValue({
            post_title: data?.title?.rendered || '',
            post_content:data?.content?.rendered || '',
            post_id:data.id
          });
         
        }
      }
     )
  }
  onSubmit(): void {
    if (this.postForm.valid) {
      const formData = {
        title: this.postForm.value.post_title,
        id: this.postForm.value.post_id,
    }
    this.postservice.postUpdate(this.postForm.value.post_id,formData).subscribe(data=>{
      console.log(data);
    });
  }
}
}
