import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectoryItem } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) { }

  requestAccess(passcode: string): Observable<string> {
    return this.httpClient.post<string>(`http://localhost:5140/api/auth/`, { passcode }, {responseType:'text' as any});
  }

  getDirectoryInfo(path: string | undefined): Observable<DirectoryItem[]> {
    const params = path ? { path } : undefined;
    return this.httpClient.get<DirectoryItem[]>(`http://localhost:5140/api/ls/`, { params });
  }
}
