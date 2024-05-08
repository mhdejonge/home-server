import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
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
  @Input() directory!: string;

  @Input() file!: AutoindexItem;

  fullPath!: string;

  ngOnInit(): void {
    this.fullPath = `${environment.nasRoot}/${this.directory}/${this.file.name}`;
  }
}
