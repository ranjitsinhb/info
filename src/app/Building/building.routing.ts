import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingComponent } from './List/building.component';
import { CreateBuildingComponent } from './Create/createbuilding.component';

export const BuildingRoutes: Routes = [
	{ path: '', component: BuildingComponent },
	{ path: 'add', component: CreateBuildingComponent }
];

export const BuildingRoute: ModuleWithProviders = RouterModule.forChild(BuildingRoutes);



