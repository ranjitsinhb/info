import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Configuration } from '../../app.constants';
import { Router } from '@angular/router';
import { debuglog, log } from 'util';
import { NgModule } from '@angular/core';
import { BuildingModel } from '../building.model';
import { BuildingService } from '../building.service';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';


declare var $: any;

export interface ConfirmModel {
  title: string;
  message: string;
}
@Component({
  selector: 'create-building',
  templateUrl: './createbuilding.component.html',
  styles: [`:host /deep/ ng2-dropdown-menu div { left: inherit !important; top: inherit !important; }`],
  providers: [BuildingService]
})

export class CreateBuildingComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {

  BuildingModel = new BuildingModel();
  portfolioList: any = [];
  featureList: any = [];
  title: string;
  message: string;
  isSubmitted: boolean = false;
  featuresAutoSuggestArray: any = [];
  mydata: any = [];
  
  constructor(private _buildingService: BuildingService,
    private _toasterService: ToasterService,
    private _slimLoadingBarService: SlimLoadingBarService,
    private _configuration: Configuration,
    dialogService: DialogService,
    private router: Router) {
    super(dialogService);
  }

  ngOnInit() {
    this.getPortfolioList();
    //this.getFeatureList();

  }


  /**
   * get portfolio data
   */
  public getPortfolioList() {

    this._buildingService.getPortfolioData()
      .subscribe((data: any[]) => {
        if (data["httpStatus"]) {
          this.message = data["message"];
          this._toasterService.pop('error', 'Error', this.message);
          this.close();
        }
        else {
          this.portfolioList = data;
        }
      },
      error => () => {
        this._toasterService.pop('error', 'Error', 'Something went wrong...');
      },
      () => {

      });
  }

  /**
   * get feature list
   */
  // public getFeatureList() {

  //   this._buildingService.getFeatureData()
  //     .subscribe((data: any[]) => {
  //       this.featureList = data;
  //       if (this.featureList.data) {
  //         this.featureList.data.forEach(fdata => {
  //           this.featuresAutoSuggestArray.push({
  //             display: fdata.featureName,
  //             value: fdata.featureId
  //           });
  //         });
  //       }
  //     },
  //     error => () => {
  //       this._toasterService.pop('error', 'Error', 'Something went wrong...');
  //     },
  //     () => { });
  // }


  /**
   * create or update object 
   */
  public onSubmit(fielddata) {

    console.log(fielddata);


    // Save modal feature for display and submit 
    // let featureSaveTemporary = fielddata.buildingFeatures;    
    // let buildingFeaturesArrData = [];
    // if(fielddata.buildingFeatures.length>0){
    //   fielddata.buildingFeatures.forEach(fetureArr => {
    //     buildingFeaturesArrData.push({
    //       'featureName':fetureArr.display,
    //       'description':''
    //     });
    //   });      
    // }

    // let data = fielddata;
    // data.buildingFeatures = buildingFeaturesArrData;
    // data = JSON.stringify(data);

    // this.isSubmitted = true;    
    // this._buildingService.postBuildingData(fielddata)
    //   .subscribe((data: any[]) => {

    //     this.BuildingModel.buildingFeatures = featureSaveTemporary;
    //     if (data["httpStatus"]) {
    //       this.message = data["message"];
    //       this._toasterService.pop('error', 'Error', this.message);
    //     }
    //     else {
    //       this.message = 'Building created successfully.';
    //       this._toasterService.pop('success', 'Success', this.message);
    //       //this.close();
    //     }
    //   },
    //   error => () => {
    //     this._toasterService.pop('error', 'Error', 'Please try again.');
    //   },
    //   () => {

    //     this.isSubmitted = false;
    //     this._slimLoadingBarService.complete();
    //   });

  }



  /**
   * Return On cancel button
   */
  private CloseModel() {
    this.close();
  }


  /**
   * Clear form
   */
  private clearform() {

    this.BuildingModel = {
      buildingName: '',
      buildingCode: '',
      portfolioId: '',
      description: '',
      buildingFeatures: []
    }

  }


  /*
  ** Feature Tags Events
  */
  onFeatureAdded(e) {

    console.log('onItemAdded');
    console.log(e);

  }

	/*
  ** On Item Removed
  */
  onFeatureRemoved(e) {

    console.log('onItemRemoved');
    console.log(e);

    // if (e.value == this.userEmail) {
    // 	//this.eventModel.emailTags.splice(_i, 1);
    // 	this.eventModel.include_me = false;
    // }
  }


  // Tags input function for validation
  transformer(e) {

    console.log('transformer');
    console.log(e);

    // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // var isEmail = re.test(e);
    // if (this.spaceCapacityLength < 1) {
    // 	swal("Select first space");
    // 	return false;
    // } else if (isEmail == false) {
    // 	swal("Enter valid email");
    // 	return false;
    // } else {
    // 	return e;
    // }
  }


  public requestAutocompleteFeatures = (text: string): Observable<Response> => {    
    return this._buildingService.getFeatureList(text);
  };

}










