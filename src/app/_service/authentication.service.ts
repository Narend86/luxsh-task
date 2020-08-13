import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  login(data) {
  //   const headers: HttpHeaders = new HttpHeaders({
  //     'deviceType': 'pc',
  //     'os': 'web'
  // });
    // const options ={
    //   headers:headers
    // }
    return this.http.get<any>(`http://165.22.123.1/WebServices/SignIn.php?Login_Id=${data.Login_Id}&Password=${data.Password}`)
        .pipe(map(user => {
          console.log(user)
            // login successful if there's a jwt token in the response
            if (user && user[0].token_no) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user[0]));
                this.currentUserSubject.next(user[0]);
            }

            return user[0];
        }));
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}
