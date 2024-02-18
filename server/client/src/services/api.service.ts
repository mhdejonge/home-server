import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutoindexItem } from 'entities';
import { environment } from 'environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) { }

  getDirectoryInfo(path: string): Observable<AutoindexItem[]> {
    path = `${environment.nasRoot}/${path}/`
    return this.httpClient.get<AutoindexItem[]>(path);
  }
}
