import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { postsReducer, PostsState } from './posts.reducer';

export interface AppState {
  postsState: PostsState;
}

export const reducers: ActionReducerMap<AppState> = {
  postsState: postsReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
