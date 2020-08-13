import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_service/authentication.service';
import { User } from './_model/user';
import {UserService} from './_service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  constructor(private router: Router, 
              private authenticationService:AuthenticationService,
              private userService: UserService,
              ){
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}


}
