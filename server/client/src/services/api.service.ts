import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutoindexItem } from 'entities';
import { map, Observable } from 'rxjs';
import { environment } from 'environments';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient, private readonly tokenService: TokenService) { }

  public getDirectoryInfo(path: string): Observable<AutoindexItem[]> {
    if (!path) {
      throw new Error('path must have a value');
    }
    path = `${environment.nasRoot}/${path}/`;
    return this.httpClient.get<AutoindexItem[]>(path).pipe(map(item => this.applyFullPath(path, item)));
  }

  private applyFullPath(path: string, items: AutoindexItem[]): AutoindexItem[] {
    items.forEach(item => {
      if (item.type === 'file') {
        item.downloadLink = path + item.name + `?authorization=${this.tokenService.accessToken}`;
      }
    });
    return items;
  }
}
