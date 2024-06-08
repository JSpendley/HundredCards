import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JSONPlaceholderService {
  private apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getUserPosts() {
    return this.http.get(this.apiEndpoint);
  }
}
