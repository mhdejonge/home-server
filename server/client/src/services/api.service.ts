import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectoryItem } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) { }

  getDirectoryInfo(path: string | undefined): Observable<DirectoryItem[]> {
    const params = path ? { path } : undefined;
    return this.httpClient.get<DirectoryItem[]>('/api/ls/', { params });
  }
}
