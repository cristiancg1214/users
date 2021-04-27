import { Injectable } from '@angular/core';
import { User } from '../models/user.interface'
import { Response } from '../models/response.interface'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "https://api.github.com/users"
  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  getUserByLogin(login: string): Observable<User> {
    return this.http.get<User>(this.url + "/" + login);
  }
  getFollowers(url: string): Observable<[]> {
    return this.http.get<[]>(url);
  }
}
