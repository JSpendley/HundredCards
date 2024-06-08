import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userPost } from '../interfaces/dto.interface';

@Injectable({
  providedIn: 'root',
})
export class postsService {
  private apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getUserPosts(): Observable<userPost[]> {
    return this.http.get<userPost[]>(this.apiEndpoint);
  }
}
