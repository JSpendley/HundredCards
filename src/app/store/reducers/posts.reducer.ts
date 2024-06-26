import { createReducer, on } from '@ngrx/store';
import { userPost as UserPost } from '../../interfaces/dto.interface';
import { PostsAPIActions, setCurrentPost } from '../actions/posts.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export interface PostsState extends EntityState<UserPost> {
  selectedPost: UserPost | null;
}

export const adapter: EntityAdapter<UserPost> = createEntityAdapter<UserPost>();

export const initialState: PostsState = adapter.getInitialState({
  selectedPost: null,
});

export const postsReducer = createReducer(
  initialState,
  on(PostsAPIActions.getPostListSuccess, (state, { posts }) => {
    return adapter.setAll(posts, state);
  }),
  on(setCurrentPost, (state, { post }) => ({ ...state, selectedPost: post }))
);

export const { selectAll } = adapter.getSelectors();
