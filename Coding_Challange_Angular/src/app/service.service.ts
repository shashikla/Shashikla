import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userSubject!: BehaviorSubject<User>;

  constructor(private http: HttpClient) { }


  getUrl = "http://localhost:3000/user";
  postUrl = "http://localhost:3000/user/signup";
  loginUrl = "http://localhost:3000/user/login";

  getData(): Observable<any> {
    return this.http.get(this.getUrl);
  }

  addData(user: User): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this.http.post(this.postUrl, user, { headers: httpHeaders });
  }

  loginUser(user: User) {
    return this.http.post<User>(this.loginUrl, user)
      .pipe(map(user => {
        this.userSubject.next(user);
        return user;
      }));
  }

}
