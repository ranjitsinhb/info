import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
//import { HttpClient, HttpErrorResponse } from "@angular/common/http";
//import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
//import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
//import { RefreshTokenService } from "./refreshTokenService";
import { TokenService } from './tokenService';

@Injectable()
export class AuthService {

  public Token: string;

  // Assuming this would be cached somehow from a login call.
  //public AuthTokenStale: string = 'SUJQMnBJakhSJDJwSWoxMrLvusLFecr8x6DLvWm0BbPgQFuFX2A9X5qWvHRiwdVQVU5bWqA4SQ+xElKjbqZOFDi + VRm4n + 89ylVtZZTPazWVz2ZHiRM4jnB7Ibow9W4HuspF6c2+q + /mT62DKasoinc+PTf+m0jj/qgZ4M4xfWgcCg1xm8Hc2oTXStE / OlykWN94Ngj9BpbIG3Y8 / Al / fQ ==';
  //public AuthTokenNew: string = 'SUJQMnBJakhSJDJwSWoxMrLvusLFecr8x6DLvWm0BbNKZEQz4zB9GqyJi6ysZrzItI8Ktb/1C+AQeyyeyn0pBZVWznnL8X42jfw3Zc74sU3lyB+yVRneoWPpxMYX75oVAYjNWjM6mbbcITMDjWa/dN+hwazurIa7fBLbzKXYa0YH9hc5vwW3dI3Jl4EAmRI17oCujo/lZ0nd5duJLH23/Q==';
  public AuthTokenStale: string = '';
  public AuthTokenNew: string = '';
  public CurrentToken: string;


  constructor() {

    this.CurrentToken = this.AuthTokenStale;
    // set Token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.Token = currentUser && currentUser.Token;
    
  }

  getAuthToken() {
    return this.Token;
  }

  public setToken(token: string)
  {
    this.Token = token;
  }

  refreshToken(): Observable<string> {
    /*
        The call that goes in here will use the existing refresh Token to call
        a method on the oAuth server (usually called refreshToken) to get a new
        authorization Token for the API calls.
    */

    this.CurrentToken = this.AuthTokenNew;
    return Observable.of(this.AuthTokenNew).delay(200);
  }

  logout(): void {
    // clear Token remove user from local storage to log user out
    this.Token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('UserProfile');
    localStorage.removeItem('rememberedUser');
  }
}
