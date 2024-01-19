import { Component, Input } from '@angular/core';
import { DirectoryItem } from 'entities';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [],
  templateUrl: './file.component.html',
  styleUrl: './file.component.scss'
})
export class FileComponent {
  @Input() file!: DirectoryItem;
}
