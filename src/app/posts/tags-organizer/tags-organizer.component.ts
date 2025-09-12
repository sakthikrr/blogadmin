import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Tag } from '../types/taglist.interface';
import { PostsService } from '../posts.service';
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tags-organizer',
  templateUrl: './tags-organizer.component.html',
  styleUrl: './tags-organizer.component.css'
})
export class TagsOrganizerComponent implements OnInit, OnChanges {
  @Input() selectedTagIds: number[] = [];
  @Output() tagsChange = new EventEmitter<number[]>();

  allTags: Tag[] = [];
  filteredTags: Tag[] = [];
  selectedTags: Tag[] = [];
  tagInputControl = new FormControl('');
  suggestedTags: any[] = [];
  
  ngOnChanges(changes: SimpleChanges): void {
    // When selectedTagIds input changes
    if (changes['selectedTagIds'] && this.allTags.length > 0) {
      console.log('Selected tag IDs changed:', this.selectedTagIds);
      this.updateSelectedTagsFromIds();
    }
  }
  loading: boolean = false;

  constructor(
    private postsService: PostsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadAllTags();
  }

  loadAllTags(): void {
    this.loading = true;
    this.postsService.getTagsList().subscribe({
      next: (tags) => {
        this.allTags = tags;
        console.log('All tags loaded:', this.allTags);
        this.loading = false;
        
        // If there are selectedTagIds, find the corresponding tags
        if (this.selectedTagIds && this.selectedTagIds.length > 0) {
          console.log('Initializing with selected tag IDs:', this.selectedTagIds);
          this.updateSelectedTagsFromIds();
        }
      },
      error: (error) => {
        console.error('Error loading tags', error);
        this.loading = false;
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Failed to load tags' 
        });
      }
    });
  }

  filterTags(event: any): void {
    let query = event.query;
    console.log('Filtering tags with query:', query);
    
    this.filteredTags = this.allTags.filter(tag => 
      tag.name.toLowerCase().includes(query.toLowerCase()) &&
      !this.selectedTags.some(selectedTag => selectedTag.id === tag.id)
    );

    // If no exact match found and query has content, suggest creating new tag
    if (query.trim() !== '' && !this.exactMatchExists(query)) {
      this.suggestedTags = [{ name: `Create new tag: "${query}"`, id: 'new', query: query }];
      this.filteredTags = [...this.suggestedTags, ...this.filteredTags];
    } else {
      this.suggestedTags = [];
    }
    
    console.log('Filtered tags:', this.filteredTags);
  }

  exactMatchExists(query: string): boolean {
    return this.allTags.some(tag => 
      tag.name.toLowerCase() === query.toLowerCase()
    );
  }

  /**
   * PrimeNG AutoComplete onSelect emits an event object whose selected item
   * is available on event.value. Our previous implementation assumed the
   * item itself was the event which prevented existing tags from being added.
   */
  onSelectTag(event: any): void {
    const item = event?.value; // PrimeNG pattern
    console.log('AutoComplete onSelect raw event:', event, 'extracted item:', item);

    if (!item) {
      return;
    }

    // New tag sentinel (id === 'new') inserted in suggestions list
    if (item.id === 'new') {
      this.createNewTag(item.query);
      return;
    }

    // Normal existing tag
    if (!this.selectedTags.some(t => t.id === item.id)) {
      this.selectedTags.push(item as Tag);
      this.updateSelectedTags();
      console.log('Existing tag added:', item);
    } else {
      console.log('Tag already selected, ignoring:', item);
    }

    // Clear input so user can type another
    this.tagInputControl.setValue('');
  }

  onRemoveTag(tag: Tag): void {
    this.selectedTags = this.selectedTags.filter(t => t.id !== tag.id);
    this.updateSelectedTags();
  }

  createNewTag(tagName: string): void {
    if (tagName.trim() !== '') {
      console.log('Creating new tag:', tagName);
      
      this.postsService.createTag(tagName).subscribe({
        next: (createdTag) => {
          console.log('Tag created successfully:', createdTag);
          
          // Add to all tags
          this.allTags.push(createdTag);
          
          // Add to selected tags
          this.selectedTags.push(createdTag);
          this.updateSelectedTags();
          
          // Clear input
          this.tagInputControl.setValue('');
          
          // Show success message
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Success', 
            detail: `Tag "${createdTag.name}" created successfully` 
          });
        },
        error: (error) => {
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Failed to create tag' 
          });
          console.error('Error creating tag:', error);
        }
      });
    }
  }

  updateSelectedTags(): void {
    const tagIds = this.selectedTags.map(tag => tag.id);
    console.log('Emitting updated tag IDs:', tagIds);
    this.tagsChange.emit(tagIds);
  }
  
  updateSelectedTagsFromIds(): void {
    // Clear current selection
    this.selectedTags = [];
    
    // Add tags based on selectedTagIds
    if (this.selectedTagIds && this.selectedTagIds.length > 0) {
      this.selectedTags = this.allTags.filter(tag => 
        this.selectedTagIds.includes(tag.id)
      );
      
      console.log('Updated selected tags from IDs:', this.selectedTags);
    }
  }
  
  onEnterPress(event: any): void {
    event.preventDefault();
    this.addTagFromInput();
  }
  
  addTagFromInput(): void {
    const inputValue = this.tagInputControl.value?.trim();
    if (!inputValue) return;
    
    // Check if it's an existing tag
    const existingTag = this.allTags.find(tag => 
      tag.name.toLowerCase() === inputValue.toLowerCase()
    );
    
    if (existingTag) {
      // Add existing tag if not already selected
      if (!this.selectedTags.some(tag => tag.id === existingTag.id)) {
        this.selectedTags.push(existingTag);
        this.updateSelectedTags();
        console.log('Existing tag added:', existingTag);
      }
      this.tagInputControl.setValue('');
    } else {
      // Create new tag
      this.createNewTag(inputValue);
    }
  }
}
