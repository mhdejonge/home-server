import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FileComponent } from 'app/file';
import { AutoindexItem } from 'entities';
import { ApiService } from 'services';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [
    CommonModule,
    FileComponent,
    RouterLink,
    MatDividerModule
  ],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.scss'
})
export class DirectoryComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute, private readonly apiService: ApiService) { }

  currentDirectory?: string;

  items?: AutoindexItem[];

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const pathSegments = segments.map(segment => segment.path);
      this.currentDirectory = pathSegments.join('/');
      this.apiService.getDirectoryInfo(this.currentDirectory).subscribe(directoryInfo => this.items = directoryInfo);
    });
  }
}
