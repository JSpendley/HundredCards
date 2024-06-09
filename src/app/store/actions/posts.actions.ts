import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { userPost } from '../../interfaces/dto.interface';

export const PostsActions = createActionGroup({
  source: 'Posts API',
  events: {
    'Get Post List': emptyProps(),
    'Get Post List Success': props<{ posts: userPost[] }>(),
    'Get Post List Failure': (error: Error) => ({ error }),
  },
});
