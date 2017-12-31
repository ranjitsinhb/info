import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Configuration } from '../../app.constants';
import { PortfolioService } from '../portfolio.service';


	
export interface ConfirmModel {
	title: string;
	message: string;
}

@Component({
  selector: 'app-portfolio',
  //templateUrl: './portfolio.component.html',
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

export class CreatePortfolioComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

	title: string;
	message: string;

  constructor(dialogService: DialogService,
		private _formBuilder: FormBuilder,
		private _toasterService: ToasterService,
		private _slimLoadingBarService: SlimLoadingBarService,
		private _configuration: Configuration,
		private router: Router,
		private _portfolioService: PortfolioService) { 
		super(dialogService);
  }

  ngOnInit() {
  }
	confirm() {
		this.result = true;
		}
	
	//close model popup.
	CloseModel() {
		this.close();
	}
}
