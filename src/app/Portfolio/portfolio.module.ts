
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PortfolioComponent } from './List/portfolio.component';
import { PortfolioRoute } from './portfolio.route';
import { CreatePortfolioComponent } from './Create/portfolio.component';

@NgModule({
	declarations: [
		CreatePortfolioComponent
	],
	imports: [
	BrowserModule,
		FormsModule,
		HttpModule
	],
	entryComponents: [CreatePortfolioComponent],
	providers: [],
	bootstrap: [CreatePortfolioComponent]
})
export class PortfolioModule { }
