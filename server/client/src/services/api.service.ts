import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutoindexItem } from 'entities';
import { Observable } from 'rxjs';
import { environment } from 'environments';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) { }

  getDirectoryInfo(path: string): Observable<AutoindexItem[]> {
    if (!path) {
      throw new Error('path must have a value');
    }
    path = `${environment.nasRoot}/${path}/`;
    return this.httpClient.get<AutoindexItem[]>(path);
  }
}
