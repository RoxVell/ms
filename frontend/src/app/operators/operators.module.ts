import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperatorsPageComponent } from './operators-page/operators-page.component';
import { DemoMaterialModule } from "../material/material.module";
import { OperatorsService } from "./operators.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    OperatorsPageComponent
  ],
  providers: [OperatorsService],
  imports: [
    CommonModule,
    DemoMaterialModule,
    HttpClientModule
  ]
})
export class OperatorsModule { }
