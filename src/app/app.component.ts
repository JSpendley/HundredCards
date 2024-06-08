import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { postsService } from './services/posts.service';
import { Observable } from 'rxjs';
import { userPost } from './interfaces/dto.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'HundredCards';
  posts$: Observable<userPost[]> = this.postsService.getUserPosts();

  constructor(private postsService: postsService) {}

  ngOnInit(): void {
    this.posts$.subscribe((post) => {
      debugger;
    });
  }
}
