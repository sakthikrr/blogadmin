import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service'; // Import your service for interacting with the API
import { ActivatedRoute } from '@angular/router';
import { Category } from '../types/categorylist.interface';
import { Status } from '../types/wpstatus.interface';
import { MessageService } from 'primeng/api';
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
  featureImageUrl: string = '';
  uploadedFiles: any[] = [];
  uploadInProgress: boolean = false;
  featureImageId: number = 0;
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private postservice:PostsService,private messageService: MessageService) {
    this.postForm = this.fb.group({
      post_title: ['', Validators.required],
      post_content: ['', Validators.required],
      post_id: [''],
      select_status: [''],
      selectedCategory: [''],
      feature_image_id: [''] // Add this control for the image ID
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
    let feature_image_url = 0;
    this.postservice.getSinglePost(this.postId).subscribe(
      {
        
        next: (data:any) => {
          const selectedCategories = this.category_list.filter(cat =>
            data.categories?.includes(cat.code)
          );

          this.postservice.getPostFeatureImage(data.featured_media).subscribe((data:any)=>{
            console.log(data.link)
            this.featureImageUrl = data.link;
          })
          const sel_stat = this.post_status.find(status => status.code === data.status)
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
                    content: this.postForm.value.post_content,
                    status: this.postForm.value.select_status.code,
                    categories: this.postForm.value.selectedCategory.map((cat: any) => cat.code),
                    featured_media: this.featureImageId || 0
                }
                this.postservice.postUpdate(this.postForm.value.post_id,formData).subscribe(data=>{
                    console.log(data);
                    this.showSuccess();
                });
        }
  }

  onFileSelect(event: any): void {
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    
    if (this.uploadedFiles.length > 0) {
      this.uploadImage();
    }
  }
  
  uploadImage(): void {
    if (this.uploadedFiles.length === 0) return;
    
    this.uploadInProgress = true;
    const fileToUpload = this.uploadedFiles[0];
    
    this.postservice.uploadMedia(fileToUpload).subscribe({
      next: (response: any) => {
        this.featureImageId = response.id;
        this.featureImageUrl = response.source_url;
        this.postForm.patchValue({
          feature_image_id: response.id
        });
        this.uploadInProgress = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Image Uploaded',
          detail: 'Feature image uploaded successfully'
        });
      },
      error: (error) => {
        console.error('Upload error:', error);
        this.uploadInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Upload Failed',
          detail: 'Failed to upload image'
        });
      }
    });
  }
  
  removeImage(): void {
    this.featureImageUrl = '';
    this.featureImageId = 0;
    this.postForm.patchValue({
      feature_image_id: ''
    });
  }


  showSuccess() {
    this.messageService.add({
      severity: 'success',  // Options: 'success', 'info', 'warn', 'error'
      summary: 'Post Updated',
      detail: 'Post Updated Successfully'
    });
  }
}
