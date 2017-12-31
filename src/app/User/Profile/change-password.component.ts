import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DataService } from '../../shared/services/dataService';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Configuration } from '../../app.constants';

export interface ConfirmModel {
  title: string;
  message: string;
}
@Component({
  selector: 'confirm',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  public model: any = {};
  formChangePassword: FormGroup;
  private formSubmitAttempt: boolean = false;

  CurrentPassword = new FormControl("", [Validators.required]);
  //NewPassword = new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[a-zA-Z][a-zA-Z0-9 ]+')]);
  NewPassword = new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%&*_+=|{}\\[\\]-])[A-Za-z\\d!@#$%&*_+=|{}\\[\\]-]{8,15}')]);
  ConfirmPassword = new FormControl("", [Validators.required]);

  constructor(dialogService: DialogService,
    private _toasterService: ToasterService,
    private _slimLoadingBarService: SlimLoadingBarService,
    private _dataService: DataService,
    private _configuration: Configuration,
    private _formBuilder: FormBuilder) {
    super(dialogService);

    //this.formChangePassword = _formBuilder.group({
    //  Password: this.NewPassword,
    //  ConfirmPassword: this.ConfirmPassword
    //}, { validator: this.checkPasswords.bind(this) });

    this.formChangePassword = _formBuilder.group({
      CurrentPassword: this.CurrentPassword,
      NewPassword: this.NewPassword,
      ConfirmPassword: this.ConfirmPassword
    }, { validator: this.checkConfirmPasswords.bind(this) });

  }

  submitChangePassword() {
    this.formSubmitAttempt = true;
    if (this.formChangePassword.valid) {
      this._slimLoadingBarService.start();
      this.result = true;
      //this.close();
      this._dataService
        .post<any[]>(this._configuration.ApiChangePassword,
        JSON.stringify({
          currentPassWord: this.formChangePassword.value.CurrentPassword,
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
          this.close();
          }
        },
        error => () => {
          this._toasterService.pop('error', 'Error', 'Please try again.');
        },
        () => {
          this._slimLoadingBarService.complete();
        });

      this.formSubmitAttempt = false;
    }
  }

  checkConfirmPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.NewPassword.value;
    let confirmPass = group.controls.ConfirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }
  }

}
