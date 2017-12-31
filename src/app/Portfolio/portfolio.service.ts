import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/dataService';
import { Configuration } from '../app.constants';

@Injectable()
export class PortfolioService {

	constructor(private _dataService: DataService,
		private _configuration: Configuration)
	{ }

	getPortfolios(data?: string) {
		var apiURL = this._configuration.ApiPortfolio.replace(this._configuration.clientCode, this._configuration.ClientCode);
		return this._dataService.get<any>(apiURL + data)
			.map(res => res);
	}
	
	GetPortfolio(portfolioId: string) {
		var apiURL = this._configuration.ApiPortfolioById.replace(this._configuration.clientCode, this._configuration.ClientCode) + portfolioId;
		return this._dataService.get<any>(apiURL)
			.map(res => res);
	}

	CreatePortfolio(data: string) {
		var apiURL = this._configuration.ApiPortfolio.replace(this._configuration.clientCode, this._configuration.ClientCode);
		return this._dataService.post<any>(apiURL, data)
			.map(res => res);
	}

	UpdatePortfolio(portfolioId: string, data?: string) {
		var apiURL = this._configuration.ApiPortfolioById.replace(this._configuration.clientCode, this._configuration.ClientCode) + portfolioId;
		return this._dataService.put<any>(apiURL, data)
			.map(res => res);
	}
}
