import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postsService } from '../../services/posts.service';
import { PostsAPIActions } from '../actions/posts.actions';
import { Injectable } from '@angular/core';
import { exhaustMap, map, catchError, EMPTY, of } from 'rxjs';

@Injectable()
export class PostsEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsAPIActions.getPostList),
      exhaustMap(() =>
        this.postsService.getUserPosts().pipe(
          map(
            posts => PostsAPIActions.getPostListSuccess({ posts }),
            catchError(error => of(PostsAPIActions.getPostListFailure(error)))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private postsService: postsService
  ) {}
}
