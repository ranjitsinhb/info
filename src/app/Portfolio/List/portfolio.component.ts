import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Configuration } from '../../app.constants';
import { PortfolioService } from '../portfolio.service';
import { IPortfolio } from './portfolio.interface';
import { DataShareService } from '../../shared/services/dataShare.service';
import { DialogService } from "ng2-bootstrap-modal";
import { CreatePortfolioComponent } from './../Create/portfolio.component';

@Component({
	selector: 'app-portfolio',
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.css']
})



export class PortfolioComponent  {

	
	message: string;
	rows: IPortfolio[];
	
	

	constructor(private _portfolioService: PortfolioService,
		private _dataShareService: DataShareService,
		private _toasterService: ToasterService,
		private _slimLoadingBarService: SlimLoadingBarService,
		private _configuration: Configuration, private dialogService: DialogService) {
	
	}

	showConfirm() {
		let disposable = this.dialogService.addDialog(CreatePortfolioComponent, {
			title: 'Create Portfolio',
			message: 'Confirm message'
		});
	}

	

	ngOnInit() {
		this.getData('');
	}

	

	getData(data?: string) {

		this._slimLoadingBarService.start();
		this._portfolioService.getPortfolios(data).subscribe(pagedData => {
			
			if (pagedData != null) {
				this.rows = pagedData.data;
			}
			console.log(this.rows)
		},
			error => () => {
				this._toasterService.pop('error', 'Error', this._configuration.errorMessage);
			},
			() => {
				this._slimLoadingBarService.complete();
			});

	}

	dataUpdate(userId) {
		console.log(userId);
		//let disposable = this.dialogService.addDialog(CreatePortfolioComponent, {
		//	title: 'Update Portfolio',
		//	userId: userId,
		//	message: 'Confirm message',
		//});
	}

}
