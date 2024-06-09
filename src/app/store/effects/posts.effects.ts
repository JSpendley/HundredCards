import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postsService } from '../../services/posts.service';
import { PostsActions } from '../actions/posts.actions';
import { Injectable } from '@angular/core';
import { exhaustMap, map, catchError, EMPTY, of } from 'rxjs';

@Injectable()
export class PostsEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.getPostList),
      exhaustMap(() =>
        this.postsService.getUserPosts().pipe(
          map(
            posts => PostsActions.getPostListSuccess({ posts }),
            catchError(error => of(PostsActions.getPostListFailure(error)))
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
