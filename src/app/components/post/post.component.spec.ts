import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { PostComponent } from './post.component';
import { AppState } from '../../store/reducers';
import { userPost } from '../../interfaces/dto.interface';
import { of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectCurrentPostId } from '../../store/selectors/posts.selectors';
import { PostsState } from '../../store/reducers/posts.reducer';
import { Dictionary } from '@ngrx/entity';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let store: MockStore<AppState>;
  let initialState: PostsState;

  beforeEach(async () => {
    initialState = {
      entities: {} as unknown as Dictionary<userPost>,
      ids: [],
      selectedPost: null,
    };

    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore<AppState>;
    store.overrideSelector(selectCurrentPostId, 1);

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = {
      userId: '1',
      id: 1,
      title: 'Test Title',
      body: 'Test Content',
    } as userPost;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize post entries', () => {
    expect(component.postEntries).toEqual([
      ['userId', '1'],
      ['id', 1],
      ['title', 'Test Title'],
      ['body', 'Test Content'],
    ]);
  });

  it('should set initial display index to the index of the entry with key "title"', () => {
    expect(component.initialDisplayIndexSignal()).toBe(2);
  });

  it('should reset post display if not selected', () => {
    component.initialDisplayIndexSignal.set(1);
    component.currentIndexSignal.set(3);
    component.resetPostDisplayIfNotSelected(2);
    expect(component.currentIndexSignal()).toBe(1);
  });

  it('should increment index correctly', () => {
    component.currentIndexSignal.set(0);
    component.increment();
    expect(component.currentIndexSignal()).toBe(1);

    component.increment();
    expect(component.currentIndexSignal()).toBe(2);

    component.increment();
    expect(component.currentIndexSignal()).toBe(3);

    component.increment();
    expect(component.currentIndexSignal()).toBe(0);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const spy = spyOn(component.destroy$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(component.destroy$.isStopped).toBeTrue();
  });
});
