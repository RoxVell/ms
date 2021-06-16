import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistratorPageComponent } from './registrator-page/registrator-page.component';
import { ServiceTreeModule } from "../components/service-tree/service-tree.module";
import { RegistratorItemComponent } from './registrator-item/registrator-item.component';
import { DemoMaterialModule } from "../material/material.module";
import { TicketPageComponent } from './ticket-page/ticket-page.component';

@NgModule({
  declarations: [
    RegistratorPageComponent,
    RegistratorItemComponent,
    TicketPageComponent
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
