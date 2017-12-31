import 'rxjs/add/operator/map';

import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { Configuration } from '../../app.constants';
import { ErrorCode } from '../../app.errorcode';
import { AuthService } from "./auth.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { ErrorResponse } from '../model/ErrorResponse';
import 'rxjs/Rx';

import { ErrorNotifierService } from './error.notifier';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

	public actionUrl: string;


	constructor(private http: HttpClient, private _configuration: Configuration, private authService: AuthService) {
		this.actionUrl = _configuration.ServerWithApiUrl;
	}

	public getAll<T>(): Observable<T> {
		return this.http.get<T>(this.actionUrl);
	}

	public get<T>(URL: string): Observable<T> {
		if (URL != '')
			this.actionUrl = URL;

		return this.http.get<T>(this.actionUrl);
	}

	public getSingle<T>(id: number): Observable<T> {
		return this.http.get<T>(this.actionUrl + id);
	}

	public add<T>(itemName: string): Observable<T> {
		const toAdd = JSON.stringify({ ItemName: itemName });
		return this.http.post<T>(this.actionUrl, toAdd);
	}

	public post<T>(url: string, body: string): Observable<T> {
		return this.http.post<T>(url, body);
	}

	public put<T>(url: string, body: string): Observable<T> {
		return this.http.put<T>(url, body);
	}

	public update<T>(url: string, body: string): Observable<T> {
		return this.http
			.put<T>(url, body);
	}

	public deleteData(url: string, body: string): Observable<any> {
		return this.http.delete(url + body);
	}

	public setToken(token: string) {
		this.authService.setToken(token);
	}

	public extractData(res: Response) {
		let body = res != null ? res.json() : '';
		return body || {};
	}

	private handleError(error: any): Promise<any> {
		return Promise.reject(error.message || error);
	}
}


@Injectable()
export class CustomInterceptor implements HttpInterceptor {

	isRefreshingToken: boolean = false;
	tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

	constructor(private authService: AuthService, private errorCode: ErrorCode, private errorService: ErrorNotifierService) {

	}

	addToken(req: HttpRequest<any>, token: any): HttpRequest<any> {
		return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (!req.headers.has('Content-Type')) {
			req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
		}

		///var exceptArray = ['login', 'forgetPassword'];

		//if (!req.url.endsWith("login")) {

		if (req.url.endsWith("login") || req.url.endsWith("forgetpassword")) {
			return next.handle(req).catch(error => {
				if (error instanceof HttpErrorResponse) {
					switch ((<HttpErrorResponse>error).status) {
						case 412:
							var status = error.error.code;
							var msg = error.error.msg;
							const res = new HttpResponse({
								body: { status: status, message: msg, httpStatus: error.status },
								headers: error.headers,
								status: error.status,
								statusText: error.statusText,
								url: error.url
							});
							return Observable.of(res);

						default:
							this.errorService.notifyError(error.error);
					}
					//this.errorService.notifyError(error.error);
				} else {
					return Observable.throw(error);
				}
			})
		}
		else {
			return next.handle(this.addToken(req, this.authService.getAuthToken())).catch(error => {
				if (error instanceof HttpErrorResponse) {
					switch ((<HttpErrorResponse>error).status) {
						case 400:
							return this.handle400Error(error);
						case 401:
							if (error.error.code === this.errorCode.TokenExpired) {
								//return this.handle401Error(req, next);
							} else {
								this.errorService.notifyError(error.error);
							}
						case 412:
						case 201:
						case 500:
						case 202:
						case 409:
							var status = error.error.code;
							var msg = error.error.msg;
							const res = new HttpResponse({
								body: { status: status, message: msg, httpStatus: error.status },
								headers: error.headers,
								status: error.status,
								statusText: error.statusText,
								url: error.url
							});
							return Observable.of(res);
					}
				} else {
					return Observable.throw(error);
				}
			})
		}

	}

	handle400Error(error) {
		if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
			// If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
			return this.logoutUser();
		}

		return Observable.throw(error);
	}

	handle401Error(req: HttpRequest<any>, next: HttpHandler) {
		if (!this.isRefreshingToken) {
			this.isRefreshingToken = true;

			// Reset here so that the following requests wait until the token
			// comes back from the refreshToken call.
			this.tokenSubject.next(null);

			//return this.authService.refreshToken()
			return this.authService.refreshToken()
				.switchMap((newToken: string) => {
					if (newToken) {
						this.tokenSubject.next(newToken);
						return next.handle(this.addToken(req, this.authService.getAuthToken()));
					}

					// If we don't get a new token, we are in trouble so logout.
					return this.logoutUser();
				})
				.catch(error => {
					// If there is an exception calling 'refreshToken', bad news so logout.
					return this.logoutUser();
				})
				.finally(() => {
					this.isRefreshingToken = false;
				});
		} else {
			return this.tokenSubject
				.filter(token => token != null)
				.take(1)
				.switchMap(token => {
					return next.handle(this.addToken(req, this.authService.getAuthToken()));
				});
		}
	}

	logoutUser() {
		// Route to the login page (implementation up to you)
		return Observable.throw('');
	}
}
