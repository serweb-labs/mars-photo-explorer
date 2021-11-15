import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkError } from '../errors';

@Injectable({
  providedIn: 'any'
})
export class RestClientService {

  constructor(private client: HttpClient) { }

  async retrieve<T>(url: string, options: any): Promise<T> {
    if (!navigator.onLine) {
      throw new NetworkError();
    }
    const res = await this.client.get<T>(url, {
      observe: 'response',
      responseType: 'json',
    }).toPromise();

    return res.body;
  }
}
