import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service'; // Import your service for interacting with the API
import { ActivatedRoute } from '@angular/router';
import { Category } from '../types/categorylist.interface';
import { Status } from '../types/wpstatus.interface';
import { Tag } from '../types/taglist.interface';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-postedit',
  templateUrl: './postedit.component.html',
  styleUrl: './postedit.component.css'
})
export class PosteditComponent {
  postForm: FormGroup;
  postId?: number
  category_list: any[] = [];
  post_status: any[] = []
  categories: Category[] = [];
  tag_list: any[] = [];
  tags: Tag[] = [];
  selectedTagIds: number[] = [];
  featureImageUrl: string = '';
  uploadedFiles: any[] = [];
  uploadInProgress: boolean = false;
  featureImageId: number = 0;
  isLoading: boolean = true;
  newTagName: string = '';
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private postservice: PostsService, private messageService: MessageService) {
    this.postForm = this.fb.group({
      post_title: ['', Validators.required],
      post_content: ['', Validators.required],
      post_id: [''],
      select_status: [''],
      selectedCategory: [''],
      selectedTags: [''],
      feature_image_id: [''], // Add this control for the image ID
      publish_date: [null]
    });

    this.postservice.postStatusList().subscribe(data => {
      this.post_status = data.map(status => ({ name: status.name, code: status.slug }));
    });

    this.postservice.postCategoryList().subscribe(data => {
      this.categories = data;
      this.category_list = this.categories.map(
        category => (
          { name: category.name, code: category.id }
        )
      );

      // Load tags
      this.postservice.getTagsList().subscribe(tagsData => {
        this.tags = tagsData;
        this.tag_list = this.tags.map(tag => (
          { name: tag.name, code: tag.id }
        ));
        this.loadPosts();
      });
    })
  }
  private formatDateToWp(dt: Date | null): string | null {
    if (!dt) return null;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`;
  }

  ngOnInit(): void {


  }

  loadPosts(): void {
    this.isLoading = true;
    this.postId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    let feature_image_url = 0;
    this.postservice.getSinglePost(this.postId).subscribe({
      next: (data: any) => {
        const selectedCategories = this.category_list.filter(cat =>
          data.categories?.includes(cat.code)
        );

        // Get selected tags
        const selectedTags = this.tag_list.filter(tag =>
          data.tags?.includes(tag.code)
        );

        // Set selected tag IDs for the tags organizer component
        this.selectedTagIds = data.tags || [];

        this.postservice.getPostFeatureImage(data.featured_media).subscribe((data: any) => {
          this.featureImageUrl = data.link;
        });
        const sel_stat = this.post_status.find(status => status.code === data.status)
        this.postForm.patchValue({
          post_title: data?.title?.rendered || '',
          post_content: data?.content?.rendered || '',
          post_id: data.id,
          select_status: sel_stat,
          selectedCategory: selectedCategories,
          selectedTags: selectedTags
        });
        if (data.date) {
          const d = new Date(data.date);            // assumes data.date is ISO
          if (!isNaN(d.getTime())) {
            this.postForm.patchValue({ publish_date: d });
          }
        }
        this.isLoading = false;


      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
  onSubmit(): void {
    if (this.postForm.valid) {
      const publishIso = this.formatDateToWp(this.postForm.value.publish_date);
      const formData = {
        title: this.postForm.value.post_title,
        id: this.postForm.value.post_id,
        content: this.postForm.value.post_content,
        status: this.postForm.value.select_status.code,
        categories: this.postForm.value.selectedCategory.map((cat: any) => cat.code),
        tags: this.selectedTagIds, // Use the updated selectedTagIds directly
        featured_media: this.featureImageId || 0,
        date: publishIso
      }

      console.log('Submitting tags:', this.selectedTagIds);

      this.postservice.postUpdate(this.postForm.value.post_id, formData).subscribe(data => {
        console.log(data);
        this.showSuccess();
      });
    }
  }

  // Method to handle tag changes from the TagsOrganizer component
  onTagsChange(tagIds: number[]): void {
    console.log('Tags changed in parent component:', tagIds);
    this.selectedTagIds = tagIds;

    // We don't need to update the form value anymore, as we're using selectedTagIds directly
    // in the onSubmit method
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
