import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistratorPageComponent } from './registrator-page/registrator-page.component';
import { ServiceTreeModule } from "../components/service-tree/service-tree.module";
import { RegistratorItemComponent } from './registrator-item/registrator-item.component';
import { DemoMaterialModule } from "../material/material.module";

@NgModule({
  declarations: [
    RegistratorPageComponent,
    RegistratorItemComponent
  ],
  imports: [
    CommonModule,
    ServiceTreeModule,
    DemoMaterialModule,
  ],
  exports: [

  ]
})
export class RegistratorModule { }
