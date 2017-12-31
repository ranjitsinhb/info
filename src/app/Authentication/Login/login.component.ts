import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { ToasterService } from "angular2-toaster/angular2-toaster";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { DataService } from "../../shared/services/dataService";
import { AuthService } from "../../shared/services/auth.service";
import { Configuration } from "../../app.constants";
import { Observable } from "rxjs/Observable";

import { ErrorNotifierService } from "../../shared/services/error.notifier";

import { ConfirmComponent } from './confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
//import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import "rxjs/Rx";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

  private formSubmitAttempt: boolean = false;
  private formCPSubmitAttempt: boolean = false;

  public isVisibleCHForm = false;
  frmLogin: FormGroup;
  formChangePassword: FormGroup;
  RememberMe: boolean;

  public loading: false;
  public error: string;

  public message: string;
  public model: any = {};
  public data: any[];

  NewPassword = new FormControl("", [Validators.required, Validators.minLength(8),
  Validators.maxLength(15), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%&*_+=|{}\\[\\]-])[A-Za-z\\d!@#$%&*_+=|{}\\[\\]-]{8,15}')]);
  OldPassword: string;
  constructor(
    private _formBuilder: FormBuilder,
    private _dataService: DataService,
    private _toasterService: ToasterService,
    private _slimLoadingBarService: SlimLoadingBarService,
    private _router: Router,
    private _authService: AuthService,
    private _configuration: Configuration,
    private errorNotifier: ErrorNotifierService,
    private dialogService: DialogService
  ) {

	let remEmailAddress: string;
	let remPassowrd: string;
    var rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
    if(rememberedUser != null)
    {
		remEmailAddress = rememberedUser.EmailAddress;
		remPassowrd = rememberedUser.Password;
	}

    this.frmLogin = _formBuilder.group({
      EmailAddress: new FormControl(remEmailAddress, [Validators.required, Validators.email]),
      Password:  new FormControl(remPassowrd, Validators.required),
      RememberMe: this.RememberMe
    });

    this.formChangePassword = this._formBuilder.group({
      NewPassword: this.NewPassword,
      OldPassword: ''
    });


    this.message = "Login";
    this._dataService.actionUrl = _configuration.UserApiHost;

    this.errorNotifier.onError(err => {
      this.error = err.code;
    });
  }

  ngOnInit() {
    // reset login status
    this._authService.logout();
  }

  showConfirm() {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirm title',
      message: 'Confirm message'
    });
  }

  login() {

    this.formSubmitAttempt = true;

    if (this.frmLogin.valid) {
      //console.log(this.frmLogin.value);

      if (this.frmLogin.value.RememberMe == false || this.frmLogin.value.RememberMe == null) {
        localStorage.removeItem("rememberedUser");
      } else {
        localStorage.setItem("rememberedUser", JSON.stringify({ EmailAddress: this.frmLogin.value.EmailAddress, Password: this.frmLogin.value.Password }));
      }


      var requestedData = JSON.stringify({
        EmailAddress: this.frmLogin.value.EmailAddress,
        Password: this.frmLogin.value.Password
      });


      this._dataService
        .post<any[]>(this._configuration.ApiLogin
          .replace(this._configuration.buildingCode, this._configuration.BuildingCode)
        , requestedData)
        .subscribe(
        (data: any[]) => {
          if (data["status"] == "B0x003") {
            this._toasterService.pop(
            "error",
            "Error",
            data["message"]
          );
          }
          else if (data["token"] != null) {
            //console.log(data);
            this.data = data;
            localStorage.setItem(
              "currentUser",
              JSON.stringify({
                EmailAddress: this.frmLogin.value.EmailAddress,
                Password: this.frmLogin.value.password,
                Token: this.data["token"]
              })
            );
            this._dataService.setToken(this.data["token"]);
            this.formChangePassword.patchValue({
              OldPassword: this.frmLogin.value.Password
            });

            //tempPassword
            if (this.data["tempPassword"] === true) {
              //document.location.href = "/profile?temp=true";
              console.log(this.isVisibleCHForm);

              this.isVisibleCHForm = true;
              console.log(this.isVisibleCHForm);
            }
            else
              this._router.navigate(["/dashboard"]);

          }
        },
        error => () => {
          this._toasterService.pop(
            "error",
            "Error",
            "Something went wrong please contact support team."
          );
        },
        () => {
          this._slimLoadingBarService.complete();
        }
        );
    }
  }

  changePassword() {
    console.log(this.formChangePassword);
    this.formCPSubmitAttempt = true;
    if (this.formChangePassword.valid) {
      this._slimLoadingBarService.start();
      //this.close();
      this._dataService
        .post<any[]>(this._configuration.ApiChangePassword,
        JSON.stringify({
          currentPassWord: this.formChangePassword.value.OldPassword,
          newPassword: this.formChangePassword.value.NewPassword
        }))
        .subscribe((data: any[]) => {
          if (data["status"] == 'B0x003') {
            this.message = data["message"];
            this._toasterService.pop('error', 'Error', this.message);
          }
          else {
            this.message = 'Your password has been changed.';
            this._toasterService.pop('success', 'Success', this.message);
            this._router.navigate(["/dashboard"]);
          }
        },
        error => () => {
          this._toasterService.pop('error', 'Error', 'Please try again.');
        },
        () => {
          this._slimLoadingBarService.complete();
        });
    }
    this.formCPSubmitAttempt = false;
  }
}
