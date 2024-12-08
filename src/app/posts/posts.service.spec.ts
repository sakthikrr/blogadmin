import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; 
import { PostsService } from './posts.service'; // Your service
import { HttpClient } from '@angular/common/http'; 

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [PostsService], // Provide PostsService
    });

    service = TestBed.inject(PostsService); // Get the instance of the service
    httpMock = TestBed.inject(HttpTestingController); // Get HttpTestingController for mocking HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts', () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }]; // Mock data

    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(1);
      expect(posts).toEqual(mockPosts);
    });

    // Mock the HTTP request
    const req = httpMock.expectOne('http://yourapi.com/posts');
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts); // Respond with mock data

    // Verify there are no outstanding requests
    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify(); // Verify no other HTTP requests are pending
  });
});
