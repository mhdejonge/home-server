import { Component, Input, OnInit } from '@angular/core';
import { FileComponent } from 'app/file';
import { DirectoryItem } from 'entities';
import { ApiService } from 'services';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [
    FileComponent
  ],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.scss'
})
export class DirectoryComponent implements OnInit {
  constructor(private readonly apiService: ApiService) { }

  @Input() directory?: DirectoryItem;

  items: DirectoryItem[] = [];

  ngOnInit(): void {
    this.apiService.getDirectoryInfo(this.directory?.fullPath).subscribe(directoryInfo => this.items = directoryInfo);
  }
}
