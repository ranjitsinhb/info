//import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';
import { Configuration } from './app.constants';
import { ErrorCode } from './app.errorcode';
import { Routes, RouterModule } from '@angular/router';
import { CustomInterceptor, DataService } from './shared/services/dataService';
import { DataShareService } from './shared/services/dataShare.service';
import { TokenService } from './shared/services/tokenService';
import { AuthService } from './shared/services/auth.service';
import { ErrorNotifierService } from './shared/services/error.notifier';
import { AuthGuard } from './shared/services//auth.guard';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//import { AppRoutes } from './app.routes';

import { SiteLayoutComponent } from './shared/modules/sitelayout/sitelayout.component';
import { NavMenuComponent } from './shared/modules/navmenu/navmenu.component';
import { TopHeaderComponent } from './shared/modules/topheader/topheader.component';
import { SubHeaderComponent } from './shared/modules/subheader/subheader.component';
import { DeleteAlertComponent } from './shared/modules/deletealert/deletealert.componant';

//import { BuildingComponent } from './Building/List/building.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { UserListComponent } from './User/List/user.component';
import { LoginComponent } from './Authentication/Login/login.component';
import { UsersListComponent } from './User/List/user.component';
import { UserService } from './User/List//user.service';
import { ConfirmComponent } from './Authentication/Login/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
import { User } from './User/Create/createuser.component';
import { ProfileComponent } from './User/Profile/profile.component';
import { ChangePasswordComponent } from './User/Profile/change-password.component';
import { PortfolioComponent } from './Portfolio/List/portfolio.component';
import { PortfolioService } from './Portfolio/portfolio.service';
import { CreatePortfolioComponent } from './Portfolio/Create/portfolio.component';





const appRoutes: Routes = [

	//Site routes goes here
	{
		path: '',
		component: SiteLayoutComponent,
		children: [
			{ path: '**', redirectTo: 'login' },
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: 'dashboard', component: DashboardComponent, data: { pageTitle: 'DashboardComponent' }, canActivate: [AuthGuard] },
			//{ path: 'building', component: BuildingComponent, data: { pageTitle: 'Building Management' }, canActivate: [AuthGuard] },
			{ path: 'user', component: UsersListComponent, data: { pageTitle: 'User Management' }, canActivate: [AuthGuard] },
			{ path: 'createuser', component: User, data: { pageTitle: 'User' }, canActivate: [AuthGuard] },
			{ path: 'profile', component: ProfileComponent, data: { pageTitle: 'User Profile' }, canActivate: [AuthGuard] },
			{ path: 'portfolio', component: PortfolioComponent, data: { pageTitle: 'Portfolio' }, canActivate: [AuthGuard] },
            { path: 'creatportfolio', component: CreatePortfolioComponent, data: { pageTitle: 'Create Portfolio' }, canActivate: [AuthGuard] },
            { path: 'deletealert', component: DeleteAlertComponent, data: { pageTitle: 'Delete User' }, canActivate: [AuthGuard] }
			//{
			// path: 'portfolio',
			// loadChildren: 'app/portfolio/portfolio.module#PortfolioModule',
			// data: { pageTitle: 'Portfolio' }
			//},
			,{ 
				path: 'building', 
				loadChildren:'app/Building/building.module#BuildingModule',        
				data: { title: 'Building Management' }
			},

		]
	},

	{ path: 'login', component: LoginComponent, data: { title: 'Login' } }

];

@NgModule({
	declarations: [
		AppComponent,
		SiteLayoutComponent,
		TopHeaderComponent,
		SubHeaderComponent,
		NavMenuComponent,
		//BuildingComponent,
		//UserListComponent,
		UsersListComponent,
		LoginComponent,
		DashboardComponent,
		ConfirmComponent,
		User,
		ProfileComponent,
		ChangePasswordComponent,
		PortfolioComponent,
        CreatePortfolioComponent,
        DeleteAlertComponent
	],
	imports: [
		//CommonModule,
		//FormsModule,
		BrowserModule,
		HttpClientModule,
		NgxDatatableModule,
		//AppRoutes,        
		BrowserAnimationsModule,
		ToasterModule,
		SlimLoadingBarModule.forRoot(),
		BootstrapModalModule,
		//RouterModule.forRoot([{
		//  path: '',
		//  component: SiteLayoutComponent,
		//  children: [
		//    { path: '**', redirectTo: 'login' },
		//    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
		//    { path: 'dashboard', component: DashboardComponent, data: { title: 'DashboardComponent' }, canActivate: [AuthGuard] },
		//    { path: 'building', component: BuildingComponent, data: { title: 'Building Management' }, canActivate: [AuthGuard] },
		//    { path: 'user', component: UsersListComponent, data: { title: 'User Management', pageTitle: 'User Management' }, canActivate: [AuthGuard] },
		//    { path: 'createuser', component: User, data: { title: 'User' }, canActivate: [AuthGuard] },
		//    { path: 'profile', component: ProfileComponent, data: { title: 'User Profile' }, canActivate: [AuthGuard] },
		//  ]
		//}]),
		RouterModule.forRoot(appRoutes),
		ReactiveFormsModule
	],
	//Don't forget to add the component to entryComponents section
	entryComponents: [
		ConfirmComponent,
		ChangePasswordComponent,
		CreatePortfolioComponent
	],
	providers: [Configuration, DataService, UserService, DataShareService, TokenService,
		ErrorCode, AuthService, ErrorNotifierService, AuthGuard, DialogService, PortfolioService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CustomInterceptor,
			multi: true,
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
