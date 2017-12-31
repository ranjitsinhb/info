import { Injectable } from '@angular/core';
import { DataService } from '../../shared/services/dataService';
import { Configuration } from '../../app.constants';

@Injectable()
export class UserService {
  

  constructor(private _dataService: DataService,
    private _configuration: Configuration)
  { }

  getUserData(data?: string) {
    var apiURL = this._configuration.ApiGetUserList.replace(this._configuration.buildingCode, this._configuration.BuildingCode);
    return this._dataService.get<any>(apiURL + data)
      .map(res => res);
  }

  deleteUser(userId?: string) {
    var apiURL = this._configuration.ApiDeleteUser.replace(this._configuration.buildingCode, this._configuration.BuildingCode);
	return this._dataService.deleteData(apiURL, userId);     
  }

  GetUserProfile() {
    var apiURL = this._configuration.ApiUserProfile;
    return this._dataService.get<any>(apiURL)
      .map(res => res);
  }

  UpdateUserProfile(userId: string, data?: string) {
    var apiURL = this._configuration.ApiPutUser.replace(this._configuration.buildingCode, this._configuration.BuildingCode) + userId;
    return this._dataService.put<any>(apiURL, data)
      .map(res => res);
  }
}
