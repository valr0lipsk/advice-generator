import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Advice {
  slip: { id: string; advice: string };
}

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  public constructor(private readonly http: HttpClient) {}

  public getAdvice$(): Observable<Advice> {
    return this.http.get<Advice>('https://api.adviceslip.com/advice');
  }
}
