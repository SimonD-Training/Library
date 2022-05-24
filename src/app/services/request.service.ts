import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  addRequest(obj: { student_id: number; book_id: number }) {
    let obs = new Observable((observer) => {
      this.http.post('/request', obj, { observe: 'response' }).subscribe({
        next: (data) => {
          observer.next(data);
        },
        error: (err) => {
          console.log(err);
          observer.next(false);
        },
      });
    });
  }

  getRequests() {
    let obs = new Observable((observer) => {
      this.http.get('/api/requests', { observe: 'response' }).subscribe({
        next: (data) => {
          observer.next(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
    return obs;
  }

  approve(id: number) {
    let obs = new Observable((observer) => {
      this.http
        .put('/request/approval', { id: id }, { observe: 'response' })
        .subscribe({
          next: (data) => {
            observer.next(data);
          },
          error: (err) => {
            console.log(err);
          },
        });
    });
    return obs;
  }

  disapprove(id: number) {
    let obs = new Observable((observer) => {
      this.http
        .put('/request/approval', { id: id }, { observe: 'response' })
        .subscribe({
          next: (data) => {
            observer.next(data);
          },
          error: (err) => {
            console.log(err);
          },
        });
    });
    return obs;
  }

  books() {
    let obs = new Observable((observer) => {
      this.http.get('/api/books', { observe: 'response' }).subscribe({
        next: (data) => {
          observer.next(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
    return obs;
  }
}
