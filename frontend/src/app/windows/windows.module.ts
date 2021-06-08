import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowsPageComponent } from './windows-page/windows-page.component';
import { DemoMaterialModule } from "../material/material.module";

@NgModule({
  declarations: [
    WindowsPageComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
  ]
})
export class WindowsModule { }
