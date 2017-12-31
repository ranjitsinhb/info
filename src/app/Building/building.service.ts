import { Injectable } from '@angular/core';
import { DataService } from './../shared/services/dataService';
import { Configuration } from './../app.constants';
import { Http, Response } from '@angular/http';

@Injectable()
export class BuildingService {


  constructor(
    private _dataService: DataService,
    private http: Http,
    private _configuration: Configuration) { }

  getBuildingData(data?: string) {
    var apiURL = this._configuration.ApiGetBuildingList.replace(this._configuration.buildingCode, this._configuration.BuildingCode);
    return this._dataService.get<any>(apiURL + data)
      .map(res => res);
  }

  postBuildingData(data?: string) {
    var apiURL = this._configuration.ApiPostBuilding.replace(this._configuration.buildingCode, this._configuration.BuildingCode);
    return this._dataService.post<any>(apiURL, data)
      .map(res => res);
  }

  getPortfolioData() {
    var apiURL = this._configuration.ApiGetBuildingPortfolioList.replace(this._configuration.clientCode, this._configuration.ClientCode);
    return this._dataService.get<any>(apiURL)
      .map(res => res);
  }

  getFeatureData() {
    var apiURL = this._configuration.ApiGetBuildingFeatureList.replace(this._configuration.buildingCode, this._configuration.BuildingCode);
    return this._dataService.get<any>(apiURL)
      .map(res => res);
  }

  getFeatureList(text: string) {
    const url = `https://api.github.com/search/repositories?q=${text}`;
    return this.http
      .get(url)
      .map(res => res.json().items.map(item => item.full_name));
  }

  // getFeatureList(text: string) {
  //   //const apiURL = `https://api.github.com/search/repositories?q=${text}`;
  //   const apiURL = this._configuration.ApiGetBuildingFeatureList.replace(this._configuration.buildingCode, this._configuration.BuildingCode);

  //   return this._dataService
  //     .get<any>(apiURL)
  //     .map(res => res.json());
  // }


}
