import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesPageComponent } from './services-page/services-page.component';
import { DemoMaterialModule } from "../material/material.module";

@NgModule({
  declarations: [
    ServicesPageComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
  ]
})
export class ServicesModule { }
