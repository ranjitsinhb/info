import { Component, OnInit } from '@angular/core';
import { ToasterService } from "angular2-toaster/angular2-toaster";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { UserService } from '../User/List/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {

  data: any;

  constructor(public userService: UserService,
    private _toasterService: ToasterService,
    private _slimLoadingBarService: SlimLoadingBarService) { }


  ngOnInit() {
    //console.log("profile calling")
    this.GetUserProfile();
  }

  GetUserProfile() {
    this._slimLoadingBarService.start();
    this.userService.GetUserProfile().subscribe(pagedData => {
      //console.log(pagedData)
      this.data = pagedData;
      localStorage.setItem(
        "UserProfile",
        JSON.stringify({
          userId: this.data["userId"],
          emailAddress: this.data["emailAddress"],
          firstName: this.data["firstName"],
          lastName: this.data["lastName"],
          middleName: this.data["middleName"],
          userTypeId: this.data["userTypeId"]
        })
      );

    },
      error => () => {
        this._toasterService.pop('error', 'Damn', 'Something went wrong...');
      },
      () => {
        this._slimLoadingBarService.complete();
      });;
  }

}
