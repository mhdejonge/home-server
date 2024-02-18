import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AutoindexItem } from 'entities';
import { environment } from 'environments';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    RouterLink
  ],
  templateUrl: './file.component.html',
  styleUrl: './file.component.scss'
})
export class FileComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute) { }

  fullPath!: string;

  @Input() file!: AutoindexItem;

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      this.fullPath = `${environment.nasRoot}/${segments.map(segment => segment.path).join('/')}/${this.file.name}`;
    });
  }
}
