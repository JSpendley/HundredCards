import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit, OnDestroy {
  @Input() post!: userPost;
  entryToDisplayFirstKey = 'title';

  postEntries: [string, any][] = [];
  currentIndexSignal = signal(0);
  initialDisplayIndexSignal = signal(0);
  destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.postEntries = Object.entries(this.post);
    const initialDisplayIndex = this.getFirstDisplayEntryIndex(
      this.postEntries,
      this.entryToDisplayFirstKey
    );
    this.initialDisplayIndexSignal.set(initialDisplayIndex);
    this.currentIndexSignal.set(this.initialDisplayIndexSignal());

    // Subscriptions
    this.store
      .select(selectCurrentPostId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(postId => this.resetPostDisplayIfNotSelected(postId));
  }

  private resetPostDisplayIfNotSelected(postId: number | undefined) {
    if (postId !== this.post.id) {
      this.currentIndexSignal.set(this.initialDisplayIndexSignal());
    }
  }

  private getFirstDisplayEntryIndex(
    postEntries: [string, any][],
    entryToDisplayFirstKey: string
  ): number {
    const indexOfFirstDisplayEntry = postEntries.findIndex(
      entry => entry[0] === entryToDisplayFirstKey
    );
    return indexOfFirstDisplayEntry === -1 ? 0 : indexOfFirstDisplayEntry;
  }

  increment() {
    if (this.currentIndexSignal() + 1 === this.postEntries.length) {
      this.currentIndexSignal.set(0);
    } else {
      this.currentIndexSignal.update(index => index + 1);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
