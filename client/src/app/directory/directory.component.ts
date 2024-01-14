import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { DirectoryItem } from '../../entities';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.scss'
})
export class DirectoryComponent implements OnInit {
  constructor(private readonly apiService: ApiService) { }

  @Input() directory?: DirectoryItem;

  items!: Observable<DirectoryItem>

  ngOnInit(): void {
    this.items = this.apiService.getDirectoryInfo(this.directory?.fullPath);
  }
}
