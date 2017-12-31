import { UserService } from '../../../../app/User/List/user.service';
import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { NgModule } from '@angular/core';
declare var $: any;



export interface ConfirmModel {
	title: string;
	userId: string;
	message: string;
}
@Component({
	selector: 'confirm',
	template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                   </div>
                   <div class="modal-body">
                     <p>{{message || 'Are you sure?'}}</p>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
                     <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                   </div>
                 </div>
              </div>`

})
export class DeleteAlertComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
	title: string;
	message: string;
	userId: string;
	
	constructor(dialogService: DialogService, private _userService: UserService) {
		super(dialogService);
	}
	
	//Model popup for create user.
	confirm() {
		
		this.result = true;
		this.close();
		
	}
}




