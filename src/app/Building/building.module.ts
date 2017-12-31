import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BuildingRoute } from './building.routing';

import { DialogService } from "ng2-bootstrap-modal";
import { TagInputModule } from 'ngx-chips';
import { BuildingComponent } from './List/building.component';
import { CreateBuildingComponent } from './Create/createbuilding.component';

@NgModule({
  declarations: [
    BuildingComponent,
    CreateBuildingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    BuildingRoute,
    TagInputModule,
  ],
  providers: [DialogService],
  bootstrap: [BuildingComponent],

})
export class BuildingModule { }
