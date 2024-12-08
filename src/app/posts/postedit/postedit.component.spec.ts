import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PosteditComponent } from './postedit.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // To create observables for testing

describe('PosteditComponent', () => {
  let component: PosteditComponent;
  let fixture: ComponentFixture<PosteditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosteditComponent],
      providers: [
        // Mock ActivatedRoute to return a sample param or query param
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '123' } }, // Mocking route params
            params: of({ id: '123' }) // Example mock params
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PosteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});