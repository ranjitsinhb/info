import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../../shared/services/dataService';
import { AuthService } from '../../shared/services/auth.service';
import { Configuration } from '../../app.constants';
import { Observable } from 'rxjs/Observable';
import { ErrorNotifierService } from '../../shared/services/error.notifier';
import { ChangePasswordComponent } from './change-password.component';
import { UserService } from '../List/user.service';
import { DialogService } from "ng2-bootstrap-modal";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { IPersonalDetails } from './profile.interface';


//import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})


export class ProfileComponent implements OnInit {

  public loading: false;
  public error: string;

  public message: string;
  public model: any = {};
  public data: any[];


  formPersonalDetails: FormGroup;
  private isEditPersonalDetails: boolean = false;
  private formPDSubmitAttempt: boolean = false;

  //#region Form Personal Details
  UserName: string
  FirstName = new FormControl("", [Validators.required])
  LastName = new FormControl("", [Validators.required])
  MiddleName = new FormControl("")
  Email = new FormControl("", [Validators.required])
  PhoneNumber: string
  Designation: string
  Department: string
  UserTypeId: string
  UserId: string
  //endregion

  constructor(private _dataService: DataService,
    private _toasterService: ToasterService,
    private _slimLoadingBarService: SlimLoadingBarService,
    private _router: Router,
    private _authService: AuthService,
    private _configuration: Configuration,
    private errorNotifier: ErrorNotifierService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private _formBuilder: FormBuilder) {

    //#region Create Form Personal Details
    this.formPersonalDetails = this._formBuilder.group({
      UserName: this.UserName,
      Email: this.Email,
      PhoneNumber: '555-555-5555',
      Designation: 'System Admin',
      Department: 'Marketing',
      UserDetails: this._formBuilder.group({
        FirstName: this.FirstName,
        LastName: this.LastName,
        MiddleName: this.MiddleName,
        UserTypeId: this.UserTypeId
      })
    })
    //endregion

    this.message = 'profile';
    this._dataService.actionUrl = _configuration.UserApiHost;

    this.errorNotifier.onError(err => {
      this.error = err.code;
    });


    /*
      Open password change popup if new user login first time.
    */
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params["temp"] == 'true') {
        // Launch Modal here
        setTimeout(
          this.changePassword(), 300);
      }
    });

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params["temp"] == 'true') {
        this.GetUserProfile();
      }
      else {
        this.SetUserProfile();
      }
    });
  }

  //#region Set user profile details
  SetUserProfile() {
    var userProfile = JSON.parse(localStorage.getItem('UserProfile'));
    this.formPersonalDetails.patchValue({
      UserName: userProfile.firstName + ' ' + userProfile.lastName,
      Email: userProfile.emailAddress,
      UserDetails: {
        FirstName: userProfile.firstName,
		LastName: userProfile.lastName,
		MiddleName: userProfile.middleName
      }
    });
  }
  //endregion

  //#region Change password popup
  changePassword() {
    let disposable = this.dialogService.addDialog(ChangePasswordComponent, {
      title: 'Confirm title',
      message: 'Confirm message'
    });
  }
  //endregion


  //#region Save user profile details
  submitPersonalDertails(model: IPersonalDetails, isValid: boolean) {
    var userProfile = JSON.parse(localStorage.getItem('UserProfile'));
    this.formPDSubmitAttempt = true;
    //console.log(this.formPersonalDetails);
    if (isValid) {
      this.isEditPersonalDetails = false;
      model.UserDetails['UserTypeId'] = userProfile.userTypeId;
      this.userService.UpdateUserProfile(userProfile.userId, JSON.stringify(model.UserDetails)).subscribe(pagedData => {
        //console.log(pagedData);
        this.GetUserProfile();
        this._toasterService.pop('success', 'Complete', "Profile updated successfully.");
      },
        error => () => {
          this._toasterService.pop('error', 'Damn', 'Something went wrong...');
        },
        () => {
          this._slimLoadingBarService.complete();
        });
    }
    else {
      this.isEditPersonalDetails = true;
    }
   // this.formPDSubmitAttempt = false;

  }
  //endregion

  //#region Get user profile details
  GetUserProfile() {
    this._slimLoadingBarService.start();
    this.userService.GetUserProfile().subscribe(pagedData => {
      //console.log(pagedData)
      this.data = pagedData;
      this.UserName = this.data["firstName"];


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

      this.SetUserProfile();
    },
      error => () => {
        this._toasterService.pop('error', 'Damn', 'Something went wrong...');
      },
      () => {
        this._slimLoadingBarService.complete();
      });;
  }

  cancelPersonalDetails()
  {
	  this.GetUserProfile();
	  this.isEditPersonalDetails = false
  }
  //endregion

}

