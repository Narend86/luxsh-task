import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        // add authorization header with jwt token if available

        let currentUser = this.authenticationService.currentUserValue;
        console.log(currentUser)
        if (currentUser && currentUser.token_no) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token_no}`,
                    login_Id:`${currentUser.Login_Id}`,
                    user_Id:`${currentUser.user_Id}`,
                    token_no:`${currentUser.token_no}`
                }
            });
            return next.handle(request);
        }else{
            return next.handle(request);
        }

     
    }
}