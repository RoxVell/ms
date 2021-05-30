import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesPageComponent } from './services-page/services-page.component';
import { DemoMaterialModule } from "../material/material.module";
import { ServicesListComponent } from './services-list/services-list.component';
import { ServiceGroupsPageComponent } from './service-groups-page/service-groups-page.component';
import { ServiceTreePageComponent } from './service-tree-page/service-tree-page.component';

@NgModule({
  declarations: [
    ServicesPageComponent,
    ServicesListComponent,
    ServiceGroupsPageComponent,
    ServiceTreePageComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
  ]
})
export class ServicesModule { }
