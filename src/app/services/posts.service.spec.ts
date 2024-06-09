import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { postsService } from './posts.service';
import { userPost } from '../interfaces/dto.interface';

describe('postsService', () => {
  let service: postsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [postsService],
    });

    service = TestBed.inject(postsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user posts from the API via GET', () => {
    const dummyPosts: userPost[] = [
      { id: 1, title: 'Test Post', userId: '1', body: 'test' },
      { id: 2, title: 'Test Post 2', userId: '2', body: 'test 2' },
    ];

    service.getUserPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${service['apiEndpoint']}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });
});
