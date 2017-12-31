import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Configuration } from '../../app.constants';
import { IUser } from './user.model';
import { UserService } from './user.service';
import { DataShareService } from '../../shared/services/dataShare.service';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { DialogService } from "ng2-bootstrap-modal";
import { User } from './../Create/createuser.component';
import { DeleteAlertComponent } from '../../shared/modules/deletealert/deletealert.componant';

@Component({
	selector: 'user-list-root',
	templateUrl: './user.component.html'
})

export class UsersListComponent {
	page: any = {};
	message: string;
	rows = new Array<IUser>();
	search: any;
	IsColumnSearch: boolean = false;
	userProfile: any;
	constructor(private _userService: UserService, private _dataShareService: DataShareService,
		private _toasterService: ToasterService,
		private _slimLoadingBarService: SlimLoadingBarService,
		private _configuration: Configuration, private dialogService: DialogService) {
		this.page = _configuration.dt_config;
		this.page.pageNumber = 1;
		this.page.size = 10;
		this.userProfile = JSON.parse(localStorage.getItem('UserProfile'));
	}


	showConfirm() {
		let disposable = this.dialogService.addDialog(User, {
			title: 'Create User',
			userId: null,
			message: 'Confirm message'
		}).subscribe((isConfirmed) => {

			//We get dialog result
			if (isConfirmed) {
				this.getUserData({ offset: 0 }, '');
			}
		});
	}


	@ViewChild(DatatableComponent) table: DatatableComponent;

	ngOnInit() {
		this.getUserData({ offset: 0 }, '');
	}

	setPage(pageInfo) {
		//console.log(pageInfo);
		this.page.pageNumber = pageInfo.offset;
		this.getUserData({ offset: 0 }, '?pageNo=' + (pageInfo.offset + 1) +
			'&pageSize=' + pageInfo.pageSize);
	}

	getUserData(pageInfo, data?: string) {
		this.page.pageNumber = pageInfo.offset;

		if (data.indexOf("orderby") == -1) {
			data = (data ? data + '&' : '?') + "usertypeid=" + this.userProfile.userTypeId + "&orderby=FirstName asc";
		}

		this._slimLoadingBarService.start();
		this._userService.getUserData(data).subscribe(pagedData => {
			if (pagedData != null) {
				this.page.totalElements = pagedData.params.count;
				this.page.totalPages = this.page.totalElements / this.page.size;
				this.rows = pagedData.data;
			}
			else {
				this.page.totalElements = 0;
				this.page.totalPages = 0;
				this.rows = new Array<IUser>();
			}
			this._slimLoadingBarService.complete();
		},
			error => () => {
				this._toasterService.pop('error', 'Error', 'Please try again.');
			},
			() => {
				// this._toasterService.pop('success', 'Complete', 'Getting all values complete');
				this._slimLoadingBarService.complete();
			});

	}

	onSort(event) {
		// event was triggered, start sort sequence
		//console.log('Sort Event', event);
		var order = this._dataShareService.capitalize(event.sorts[0].prop)
			+ ' ' + event.sorts[0].dir;

		this.getUserData({ offset: 0 }, '?orderby=' + order);
	}

	Sort(event) {
		this.IsColumnSearch = true;
		this.table.headerHeight = 80;
		// event was triggered, start sort sequence
		// console.log('Sort Event', event);
		// var order = this._dataShareService.capitalize(event.sorts[0].prop) 
		//             + ' ' + event.sorts[0].dir;

		// this.getUserData({ offset: 0 }, '?orderby=' + order);
	}


	updateFilter(event) {
		//console.log(event.target.value.toLowerCase());

		//console.log(this.search);
		const val = event.target.value.toLowerCase();
		//this.page.search = val;
		this.getUserData({ offset: 0 }, '?search=' + val);
	}

	updateFilter1(search) {
		const val = search;
		this.getUserData({ offset: 0 }, '?search=' + val);
	}

	columnSearch(search, columnName) {
		this.updateFilter1(search)
		this.IsColumnSearch = false;
		this.table.headerHeight = 50;
	}


	userUpdate(userId) {
		let disposable = this.dialogService.addDialog(User, {
			title: 'Update User',
			userId: userId,
			message: 'Confirm message',

		}).subscribe((isConfirmed) => {

			//We get dialog result
			if (isConfirmed) {
				this.getUserData({ offset: 0 }, '');
			}
		});;
	}

	userDeleteAlert(userId) {
		let disposable = this.dialogService.addDialog(DeleteAlertComponent, {
			title: 'Delete User',
			userId: userId,
			message: 'Are you sure you want to delete this user?',

		}).subscribe((isConfirmed) => {

			//We get dialog result
			if (isConfirmed) {

				this._slimLoadingBarService.start();
				this._userService.deleteUser(userId).subscribe(pagedData => {
					if (pagedData["httpStatus"] == '202') {
						this._toasterService.pop('success', 'Complete', 'User deleted successfully.');
						setTimeout(this.getUserData({ offset: 0 }, ''), 2000);
					}
				},
					error => () => {
						this._toasterService.pop('error', 'Error', 'Please try again.');
					},
					() => {
						this._slimLoadingBarService.complete();
					});

			}
		});

	}

	userDelete(userId) {
		//   requestedData = JSON.parse(requestedData);
		//this._userService
		//  .deleteUser(userId);
	}

}

