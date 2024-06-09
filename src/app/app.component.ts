import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { PostsState } from './store/reducers/posts.reducer';
import { PostsAPIActions, setCurrentPost } from './store/actions/posts.actions';
import {
  selectCurrentPostId,
  selectPosts,
} from './store/selectors/posts.selectors';
import { PostComponent } from './components/post/post.component';
import { userPost } from './interfaces/dto.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Hundred Cards';
  posts$: Observable<userPost[]> | undefined;
  selectedPostId$: Observable<number | undefined> | undefined;

  constructor(private store: Store<PostsState>) {}

  ngOnInit(): void {
    this.store.dispatch(PostsAPIActions.getPostList());
    this.posts$ = this.store.select(selectPosts);
    this.selectedPostId$ = this.store.select(selectCurrentPostId);
  }

  setCurrentPost(post: userPost) {
    this.store.dispatch(setCurrentPost({ post }));
  }
}
