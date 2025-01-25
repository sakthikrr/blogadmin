import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service'; // Import your service for interacting with the API
import { ActivatedRoute } from '@angular/router';
import { Category } from '../types/categorylist.interface';
import { Status } from '../types/wpstatus.interface';
@Component({
  selector: 'app-postedit',
  templateUrl: './postedit.component.html',
  styleUrl: './postedit.component.css'
})
export class PosteditComponent {
  postForm: FormGroup;
  postId?:number
  category_list: any[] = [];
  post_status: any[] = []
  categories : Category[] = [];
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private postservice:PostsService) {
    this.postForm = this.fb.group({
      post_title: ['', Validators.required],
      post_content: ['', Validators.required],
      post_id: [''],
      select_status: [''],
      selectedCategory: ['']
    });

    this.postservice.postStatusList().subscribe(data => {
      this.post_status = data.map(status => ({ name: status.name, code: status.slug }));
  });
  this.postservice.postCategoryList().subscribe(data=>{
 
    this.categories=data
  
    this.category_list = this.categories.map(
      category => 
      (
        { name: category.name, code: category.id }
      )
    );
    this.loadPosts();
  })
  }


  ngOnInit(): void {


  }

  loadPosts(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    console.log("Hai",this.post_status[2])
    this.postservice.getSinglePost(this.postId).subscribe(
      {
        
        next: (data:any) => {
          const selectedCategories = this.category_list.filter(cat =>
            data.categories?.includes(cat.code)
          );
          const sel_stat = this.post_status.find(status => status.code === data.status)
          console.log(this.post_status)
          console.log(data.status)
          console.log(sel_stat)
          this.postForm.patchValue({
            post_title: data?.title?.rendered || '',
            post_content:data?.content?.rendered || '',
            post_id:data.id,
            select_status:sel_stat,
            selectedCategory:selectedCategories
          });
         
        }
      }
     )
  }
  onSubmit(): void 
    {
          if (this.postForm.valid) {
            const formData = {
                  title: this.postForm.value.post_title,
                  id: this.postForm.value.post_id,
              }
              this.postservice.postUpdate(this.postForm.value.post_id,formData).subscribe(data=>{
               
              });
        }
  }
}
