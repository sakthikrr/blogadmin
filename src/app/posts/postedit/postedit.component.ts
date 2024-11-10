import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { PostService } from '../posts.service'; // Import your service for interacting with the API

@Component({
  selector: 'app-postedit',
  templateUrl: './postedit.component.html',
  styleUrl: './postedit.component.css'
})
export class PosteditComponent {
  postForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      post_title: ['', Validators.required],
      post_content: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }
}
