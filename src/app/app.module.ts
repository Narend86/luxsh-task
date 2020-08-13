import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login/login.component';
import {MaterialModule} from './material.module';
import {AppRoutingModule} from './app.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helper/jwt-interceptor';
import {ErrorInterceptor} from './_helper/error-interceptor';
import {UserService} from './_service/user.service';
import {AppConfig} from './config-file/config';
import { DialoBoxComponent } from './dialog-box/dialo-box/dialo-box.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DialoBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },  
               { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },UserService,AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
