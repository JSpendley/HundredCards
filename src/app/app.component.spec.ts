import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { PostsAPIActions, setCurrentPost } from './store/actions/posts.actions';
import {
  selectCurrentPostId,
  selectPosts,
} from './store/selectors/posts.selectors';
import { userPost } from './interfaces/dto.interface';
import { PostsState } from './store/reducers/posts.reducer';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore<PostsState>;
  const initialState = {
    posts: [],
    selectedPostId: undefined,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterOutlet, PostComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title "Hundred Cards"', () => {
    expect(component.title).toBe('Hundred Cards');
  });

  it('should dispatch getPostList action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(PostsAPIActions.getPostList());
  });

  it('should select posts from the store', () => {
    const posts: userPost[] = [
      { id: 1, title: 'Test Post', userId: '1', body: 'test' },
    ];
    store.overrideSelector(selectPosts, posts);
    component.ngOnInit();
    component.posts$?.subscribe(postsData => {
      expect(postsData).toEqual(posts);
    });
  });

  it('should select selectedPostId from the store', () => {
    const selectedPostId = 1;
    store.overrideSelector(selectCurrentPostId, selectedPostId);
    component.ngOnInit();
    component.selectedPostId$?.subscribe(id => {
      expect(id).toEqual(selectedPostId);
    });
  });

  it('should dispatch setCurrentPost action when setCurrentPost is called', () => {
    const post: userPost = {
      id: 1,
      title: 'Test Post',
      userId: '1',
      body: 'test',
    };
    const dispatchSpy = spyOn(store, 'dispatch');
    component.setCurrentPost(new Event('click'), post);
    expect(dispatchSpy).toHaveBeenCalledWith(setCurrentPost({ post }));
  });
});
