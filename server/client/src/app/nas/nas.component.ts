import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AutoindexItem } from 'entities';
import { ApiService } from 'services';

@Component({
  selector: 'app-nas',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatDividerModule
  ],
  templateUrl: './nas.component.html',
  styleUrl: './nas.component.scss'
})
export class NasComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute, private readonly apiService: ApiService) { }

  currentDirectory?: string;

  items?: AutoindexItem[];

  ngOnInit(): void {
    combineLatest([this.route.url, this.route.data]).subscribe(([segments, data]) => {
      const pathSegments = [data['basePath'], ...segments.map(segment => segment.path)];
      this.currentDirectory = pathSegments.join('/');
      this.apiService.getDirectoryInfo(this.currentDirectory).subscribe(directoryInfo => this.items = directoryInfo);
    });
  }
}
