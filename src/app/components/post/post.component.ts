import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { userPost } from '../../interfaces/dto.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { Subject, takeUntil } from 'rxjs';
import { selectCurrentPostId } from '../../store/selectors/posts.selectors';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit, OnDestroy {
  @Input() post!: userPost;

  postEntries: [string, any][] = [];
  currentIndex = 0;
  destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.postEntries = Object.entries(this.post);
    
    // Subscriptions
    this.store
      .select(selectCurrentPostId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(postId => this.resetPostDisplayIfNotSelected(postId));
  }

  resetPostDisplayIfNotSelected(postId: number | undefined) {
    if (postId === this.post.id) {
      return;
    }

    this.currentIndex = 0;
  }

  increment() {
    this.currentIndex =
      this.currentIndex + 1 === this.postEntries.length
        ? 0
        : this.currentIndex + 1;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
