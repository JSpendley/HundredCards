import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState, selectAll } from '../reducers/posts.reducer';

export const postsStateKey = 'postsState';

export const selectPostsState =
  createFeatureSelector<PostsState>(postsStateKey);

export const selectPosts = createSelector(selectPostsState, selectAll);
