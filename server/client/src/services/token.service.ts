import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly key: string = 'access-token';

  constructor(private readonly httpClient: HttpClient) { }

  get isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  get accessToken(): string | null {
    return localStorage.getItem(this.key);
  }

  set accessToken(value: string | null) {
    if (value) {
      localStorage.setItem(this.key, value);
    } else {
      localStorage.removeItem(this.key);
    }
  }

  login(passcode: string): Observable<void> {
    return this.httpClient.post('http://localhost:5140/api/auth/', { passcode }, { responseType: 'text' })
      .pipe(tap(accessToken => this.accessToken = accessToken), map(() => undefined));
  }
}
