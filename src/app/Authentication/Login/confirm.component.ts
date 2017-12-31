import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DataService } from '../../shared/services/dataService';

export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({  
    selector: 'confirm',
    templateUrl: './forgot-password.component.html'
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  public model: any = {};
  private formSubmitAttempt: boolean = false;
  forgotPassword: FormGroup;

  constructor(dialogService: DialogService,
    private _toasterService: ToasterService,
    private _slimLoadingBarService: SlimLoadingBarService,
    private _dataService: DataService, private _formBuilder: FormBuilder) {
    super(dialogService);
  this.forgotPassword = _formBuilder.group({
      EmailAddress: new FormControl(null, [Validators.required, Validators.email])
    });

  }
  submit() {
      this.formSubmitAttempt = true;
    if(this.forgotPassword.valid)
    {
      //this.result = true;
     
      //this._dataService
      //  .post<any[]>('user/forgetpassword', JSON.stringify({ emailAddress: this.forgotPassword.value.EmailAddress }))
      //  .subscribe((data: any[]) => {
      //  debugger
      //    this.message = 'Temporary password has been successfully sent to ' + this.forgotPassword.value.EmailAddress;
      //    this._toasterService.pop('success', 'Complete', this.message);
      //  },
      //  error => () => {
      //    this._toasterService.pop('error', 'Damn', 'Something went wrong...');
      //  },
      //  () => { 
      //    this._slimLoadingBarService.complete();
      //    this.close();
      //  });
    }
  }
}
