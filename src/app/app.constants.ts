import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {

  dt_config = {
    size: 10,
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
    sort: [],
    search: '',
    page_limits: [
      { key: '10', value: 10 },
      { key: '25', value: 25 },
      { key: '50', value: 50 },
      { key: '100', value: 100 }
    ]
	};

  public pageNo = 'pageNo';
  public pageSize = 'pageSize';
  public orderby = 'orderby';
  public search = 'search';

  public errorMessage = 'Please try again.';

  public Server = 'http://dev-esd-user-api-wi.azurewebsites.net/';
  public buildingServer = 'http://dev-esd-building-api-wi.azurewebsites.net/';
  public BuildingCode = '151NF';
  public ClientCode = 'JBC';
  
  public ApiUrl = 'api/';
  public ApiVersion = 'v1/';
  public ApiBuilding = 'building/';
  public ApiBuildingCode = 'buildingcode/';
  public ApiClientCode = 'clientcode/';
  public ApiUser = 'user/';
  public ApiClient = 'client/';
  public ApiUserTypeUrl = 'user/type';
  public ServerWithApiUrl = this.Server + this.ApiUrl + this.ApiVersion;
  public buildingServerWithApiUrl = this.buildingServer + this.ApiUrl + this.ApiVersion;
  //public ServerWithApiUrl = 'http://dev-esd-building-api-wi.azurewebsites.net/api/v1/building/151NF'

  public buildingCode = 'buildingcode';
  public clientCode = 'clientcode';

  public ApiGetUserList = this.ServerWithApiUrl + this.ApiBuilding + this.ApiBuildingCode + 'users';
  public ApiDeleteUser = this.ServerWithApiUrl + this.ApiBuilding + this.ApiBuildingCode + 'user/';
  public ApiCreateUser = this.ServerWithApiUrl + this.ApiBuilding + this.ApiBuildingCode + 'user';
  public ApiUpdateUser = this.ServerWithApiUrl + this.ApiBuilding + this.ApiBuildingCode + 'user/';
  public ApiUserType = this.ServerWithApiUrl + this.ApiUserTypeUrl;
  public ApiTenantList = this.buildingServer + this.ApiBuilding + this.ApiBuildingCode + 'tenant';
  /* User related APIs */
  public UserApiHost = 'https://dev-esd-user-api-wi.azurewebsites.net/api/v1/';

  public ApiChangePassword = this.ServerWithApiUrl + this.ApiUser + 'changepassword/';
  public ApiLogin = this.ServerWithApiUrl + this.ApiBuilding + this.ApiBuildingCode + this.ApiUser + 'login';

  public ApiUserProfile = this.ServerWithApiUrl + this.ApiUser + 'profile';


  public ApiPutUser = this.ServerWithApiUrl + this.ApiBuilding + this.ApiBuildingCode + 'user/';

  public ApiGetBuildingList = this.buildingServerWithApiUrl + this.ApiBuilding + this.ApiBuildingCode;
  public ApiPostBuilding = this.buildingServerWithApiUrl + this.ApiBuilding;
  public ApiGetBuildingPortfolioList  = this.buildingServerWithApiUrl + this.ApiClient + this.ApiClientCode + 'portfolio';
  public ApiGetBuildingFeatureList  = this.buildingServerWithApiUrl +  this.ApiBuilding + this.ApiBuildingCode + 'feature';
  
  public ApiPortfolio = this.buildingServerWithApiUrl + this.ApiClient + this.ApiClientCode + 'portfolio';
  public ApiPortfolioById = this.buildingServerWithApiUrl + this.ApiClient + this.ApiClientCode + 'portfolio/';

}
