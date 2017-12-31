import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Configuration } from '../../app.constants';
import { BuildingModel } from '../building.model';
import { BuildingService } from '../building.service';
import { DataShareService } from '../../shared/services/dataShare.service';
//import { DatatableComponent } from "@swimlane/ngx-datatable";
import { DialogService } from "ng2-bootstrap-modal";
import { CreateBuildingComponent } from './../Create/createbuilding.component';

@Component({
  selector: 'building-list',
  templateUrl: './building.component.html',
  providers: [BuildingService]
})

export class BuildingComponent {
  page: any = {};
  message: string;
  rows = new Array<BuildingModel>();
  search: any;
  IsColumnSearch: boolean = false;
  constructor(
    private _buildingService: BuildingService,
    private _dataShareService: DataShareService,
    private _toasterService: ToasterService,
    private _slimLoadingBarService: SlimLoadingBarService,
    private _configuration: Configuration,
    private dialogService: DialogService) {
    this.page = _configuration.dt_config;
    this.page.pageNumber = 1;
    this.page.size = 10;
  }

  //@ViewChild(DatatableComponent) table: DatatableComponent;

  ngOnInit() {
    this.getBuildingData();
  }


  showConfirm() {
    let disposable = this.dialogService.addDialog(CreateBuildingComponent, {
      title: 'Create Building',
      message: 'Confirm message'
    });
  }

  setPage(pageInfo) {
    //console.log(pageInfo);
    //this.page.pageNumber = pageInfo.offset;
    //this.getBuildingData({ offset: 0 }, '?pageNo=' + (pageInfo.offset + 1) +
      //'&pageSize=' + pageInfo.pageSize);
  }

  getBuildingData() {
    //this.page.pageNumber = pageInfo.offset;

    //this._slimLoadingBarService.start();
    // this._buildingService.getBuildingData(data)
    // .subscribe((data: any[]) => {
    //   if (data["httpStatus"]) {
    //     this.message = data["message"];
    //     this._toasterService.pop('error', 'Error', this.message);
    //   }
    //   else {
    //     this._toasterService.pop('success', 'Success', this.message);
    //   }
    // },
    // error => () => {
    //   this._toasterService.pop('error', 'Error', 'Please try again.');
    // },
    // () => {
    //   this._slimLoadingBarService.complete();
    // });
    
  }



}

