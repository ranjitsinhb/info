import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TokenService {
  constructor(private http: HttpClient) { }

  refreshToken(): string {
    /*
        The call that goes in here will use the existing refresh token to call
        a method on the oAuth server (usually called refreshToken) to get a new
        authorization token for the API calls.
    */
    var currentUserDetail = JSON.parse(localStorage.getItem('currentUser'));

    var requestedData = JSON.stringify({ emailAddress: currentUserDetail.username, password: currentUserDetail.password });

    var token = '';

    const req = this.http.post('building/151NF/user/refreshtoken', requestedData)
      .subscribe(
      res => {
        
        console.log(res);
        token = res['token'];
      },
      (err) => {
        //
        //console.log(err.error);
        //console.log(err.name);
        //console.log(err.message);
        //console.log(err.status);
        
      }
      );

    //this.currentToken = this.authTokenNew;
    //this.currentToken = this.authTokenNew;
    return token;
  }
}
