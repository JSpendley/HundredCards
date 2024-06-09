import { Component, Input } from '@angular/core';
import { userPost } from '../../interfaces/dto.interface';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post!: userPost | null;
}
