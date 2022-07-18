import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticatedResponse } from '../models/iauthResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  invalidLogin: boolean = true;

  baseUrl : string = "https://localhost:44339/api/Account";
  headers = {'content-type': 'application/json'};

  constructor(private http : HttpClient, private router: Router) { }

  login(userName: string, password: string) : string {
    const body = {"userName": userName, "password": password};
    const url = this.baseUrl + "/Login";
    this.http.post<AuthenticatedResponse>(url, body, {'headers': this.headers})
    .subscribe({
      next:(res:AuthenticatedResponse) => {
      this.createSession(res.Token.toString());
      this.invalidLogin = false;
      this.router.navigate(["/"]);
      return true;
    }, error: error => {
      this.invalidLogin = true;
      console.log("error: ", error);
    
      }
    })
     return "success";
  }

  register(userName: string, password: string) {
    const body = {"userName": userName, "password": password};
    const url = this.baseUrl + "/Register";
    var token = this.http.post<AuthenticatedResponse>(url, body , {'headers': this.headers})
    .subscribe({
      next:(res:AuthenticatedResponse) => {
      this.createSession(res.Token);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
      return true;
    }, error: error => {
      this.invalidLogin = true;
      console.log("error: ", error);
      }
    })
     return "success";
  }

  createSession(token:any) {
    console.log("store token", token);
    localStorage.setItem('jwt', token)
  }

  logout() {
    localStorage.removeItem('jwt');
  }
}
