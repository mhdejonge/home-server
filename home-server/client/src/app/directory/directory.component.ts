import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'services';
import { DirectoryItem } from 'entities';
import { AsyncPipe } from "@angular/common";
import { FileComponent } from "app/file";

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
