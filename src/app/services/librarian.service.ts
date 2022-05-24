import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibrarianService {
  constructor(private http: HttpClient) {}

  auth(obj: { email: string; password: string }) {
    let obs = new Observable((observer) => {
      this.http.post('/login', obj, { observe: 'response' }).subscribe({
        next: (data) => {
          observer.next(data);
        },
        error: (err) => {
          console.log(err);
          observer.next(false);
        },
      });
    });
    return obs;
  }
}
