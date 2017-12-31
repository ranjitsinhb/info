import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { DataService } from '../../shared/services/dataService';
import { Configuration } from '../../app.constants';
import { CustomValidators } from '../../shared/CustomValidator/customvalidator';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { debuglog } from 'util';
import { NgModule } from '@angular/core';
import { UserDetail } from './createuser.model';

import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { UserService } from '../List/user.service';
//import { DataTableResource } from 'angular-4-data-table-bootstrap-4';
//import persons from './data-table-demo1-data';
//import * as $ from 'jquery';
declare var $: any;



export interface ConfirmModel {
	title: string;
	userId: string;
	message: string;
}
@Component({
	selector: 'confirm',
	templateUrl: './createuser.component.html'

})
export class User extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
	title: string;
	message: string;
	userId: string;
	userForm: FormGroup;
	public userData: any[];
	private formSubmitAttempt: boolean = false;

	FirstName = new FormControl("", Validators.required);
	LastName = new FormControl("", Validators.required);
	MiddleName = new FormControl("");
	EmailAddress = new FormControl("", [Validators.required, Validators.email]);
	TenantId = new FormControl("");
	UserTypeId = new FormControl("", Validators.required);
	PhoneNumber = new FormControl("")

	userTypes = [
		{
			userType: String,
			userTypeId: Int32Array
		}
	];

	tenantList = [
		{
			tenantId: "string",
			tenantName: "string",
			tenantDescription: "string"
		}
	];

	constructor(dialogService: DialogService, private _dataService: DataService,
		private _formBuilder: FormBuilder,
		private _toasterService: ToasterService,
		private _slimLoadingBarService: SlimLoadingBarService,
		private _configuration: Configuration,
		private router: Router,
		private _userService: UserService) {
		super(dialogService);

		this.userForm = _formBuilder.group({
			EmailAddress: this.EmailAddress,
			FirstName: this.FirstName,
			LastName: this.LastName,
			MiddleName: this.MiddleName,
			UserTypeId: this.UserTypeId,
			TenantId: this.TenantId,
			PhoneNumber: this.PhoneNumber

		}, { validator: this.checkUserType.bind(this) });

		this.GetUserType();
		this.GetTenantList();

	}

	//Initilize method
	ngOnInit() {
		;//
		//console.log(this.userId);
		//console.log(this.userId)
		if (this.userId != null) {


			this.GetUserDetail(this.userId);
		} else {
			this.userForm.value.UserId = null;
		}
	}

	//Model popup for create user.
	confirm() {

		// we set dialog result as true on click on confirm button, 
		// then we can get dialog result from caller code 
		this.result = true;
		this.formSubmitAttempt = true;
		if (this.userForm.valid) {

			if (this.userId == null) { this.createUser(); }
			else {
				this.UpdateUser(this.userId);

			}
			this.formSubmitAttempt = false;
			

		}
		//  

	}

	checkUserType(group: FormGroup) { // here we have the 'passwords' group

		return ((group.controls.UserTypeId.value == 5 || group.controls.UserTypeId.value == 6)
			&& (group.controls.TenantId.value == undefined || group.controls.TenantId.value == null)) ? { isTenantUser: true } : null

	}

	//Create new user 
	createUser() {

		this._slimLoadingBarService.start();
		var requestedData = JSON.stringify({
			firstName: this.userForm.value.FirstName,
			lastName: this.userForm.value.LastName,
			middleName: this.userForm.value.MiddleName,
			emailAddress: this.userForm.value.EmailAddress,
			userTypeId: parseInt(this.userForm.value.UserTypeId),
			tenantId: this.userForm.value.TenantId
		});

		//   requestedData = JSON.parse(requestedData);
		var createUserApi = this._configuration.ApiCreateUser.replace(this._configuration.buildingCode, this._configuration.BuildingCode);
		this._dataService
			.post<any[]>(createUserApi, requestedData)
			.subscribe((data: any[]) => {
				if (data["status"] != undefined) {
					this.message = data["message"];
					this._toasterService.pop('error', 'Error', this.message);
				}
				else {
					this.message = 'User created successfully.';
					this._toasterService.pop('success', 'Success', this.message);
					this.result = true;
					this.close();
				}								
				// //add contact detail
				// var contactDetail = JSON.stringify({
				//   Type:2,
				//   Value:this.userForm.value.PhoneNumber  
				// });

				// this.AddContact(contactDetail,data);
			},
			error => () => {
				this._toasterService.pop('error', 'Error', 'Something went wrong...');
			},
			() => {
				this._slimLoadingBarService.complete();
			});

	}

	//Update user detail
	UpdateUser(id) {

		this._slimLoadingBarService.start();
		var requestedData = JSON.stringify({
			firstName: this.userForm.value.FirstName,
			lastName: this.userForm.value.LastName,
			middleName: this.userForm.value.MiddleName,
			userTypeId: parseInt(this.userForm.value.UserTypeId),
			tenantId: this.userForm.value.TenantId
		});
		//debugger;
		var updateUserType = this._configuration.ApiUpdateUser.replace(this._configuration.buildingCode, this._configuration.BuildingCode);   
		//   requestedData = JSON.parse(requestedData);
		this._dataService
			.update<any[]>(updateUserType + this.userId, requestedData)
			.subscribe((data: any[]) => {
				
				if (data["status"] != undefined) {
					this.message = data["message"];
					this._toasterService.pop('error', 'Error', this.message);
				}
				else {
					this.message = 'User updated successfully.';
					this._toasterService.pop('success', 'Success', this.message);
					this.result = true;
					this.close();
				}	
			},
			error => () => {
				this._toasterService.pop('error', 'Error', 'Something went wrong...');
			},
			() => {
				this._slimLoadingBarService.complete();
			});

	}

	//Conteact add api.
	AddContact(contactDetail, userId) {
		this._slimLoadingBarService.start();
		this._dataService
			.post<any[]>('http://dev-esd-contact-api-wi.azurewebsites.net/api/v1/contact/user/' + userId, contactDetail.toString())
			.subscribe((data: any[]) => {
				this.router.navigate(['/user']);
				//this.authService.refreshToken();

				//add contact detail
				var contactDetail = {
					Type: 2,
					Value: data
				};

			},
			error => () => {
				this._toasterService.pop('error', 'Damn', 'Something went wrong...');
			},
			() => {
				this._slimLoadingBarService.complete();
			});
	}



	//Gets list of user type.
	GetUserType() {
		var apiUserType = this._configuration.ApiUserType;
		this._slimLoadingBarService.start();
		this._dataService.get<any[]>(apiUserType)
			.subscribe((data: any[]) => {

				this.userTypes = data;


			},
			error => () => {
				this._toasterService.pop('error', 'Damn', 'Something went wrong...');
			},
			() => {
				this._slimLoadingBarService.complete();
			});
	}

	//Gets tenant list.
	GetTenantList() {
		this._slimLoadingBarService.start();
		var apiTenantList = this._configuration.ApiTenantList.replace(this._configuration.buildingCode, this._configuration.BuildingCode);
		//debugger;
		this._dataService.get<any[]>(apiTenantList)
			.subscribe((data: any) => {

				this.tenantList = data.data;
				this.userForm.patchValue(
					{
						TenantId: this.tenantList[0]["tenantId"]
					});
			},
			error => () => {
				this._toasterService.pop('error', 'Damn', 'Something went wrong...');
			},
			() => {
				this._slimLoadingBarService.complete();
			});
	}

	//Gets user detail.
	GetUserDetail(userId) {

		this._slimLoadingBarService.start();
		this._dataService.get<any[]>('http://dev-esd-user-api-wi.azurewebsites.net/api/v1/building/151NF/user/' + userId)
			.subscribe((data: any[]) => {
				//
				this.userData = data;
				this.userForm.patchValue({
					FirstName: this.userData["firstName"],
					LastName: this.userData["lastName"],
					MiddleName: this.userData["middleName"],
					TenantId: this.userData["tenantId"],
					EmailAddress: this.userData["emailAddress"],
					UserTypeId: this.userData["userTypeId"]
				});
				this.userForm.value.UserId = this.userId;
			},
			error => () => {
				this._toasterService.pop('error', 'Error', 'Something went wrong...');
			},
			() => {
				this._slimLoadingBarService.complete();
			});
	}

	//Clear form.
	clearform() {
		this.userForm.reset();
	}

	//close model popup.
	CloseModel() {
		this.close();
	}

}
