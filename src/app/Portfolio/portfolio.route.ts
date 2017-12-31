import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioComponent } from './List/portfolio.component';
import { PortfolioModule } from './portfolio.module';

export const PortfolioRoutes: Routes = [
	{ path: '', component: PortfolioComponent }
];

export const PortfolioRoute: ModuleWithProviders = RouterModule.forChild(PortfolioRoutes);
