import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { PostsState } from './store/reducers/posts.reducer';
import { PostsActions } from './store/actions/posts.actions';
import { selectPosts } from './store/selectors/posts.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Hundred Cards';
  posts$: Observable<any> | undefined;

  constructor(private store: Store<PostsState>) {}

  ngOnInit(): void {
    this.store.dispatch(PostsActions.getPostList());
    this.posts$ = this.store.select(selectPosts);
  }
}
