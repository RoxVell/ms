import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from "./material/material.module";
import { OperatorsModule } from "./operators/operators.module";
import { DeleteConfirmModalComponent } from './components/modals/delete-confirm-modal/delete-confirm-modal.component';
import { EditOperatorModalComponent } from './components/modals/edit-operator-modal/edit-operator-modal.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AuthModule } from "./auth/auth.module";
import { DefaultLayout } from './components/layouts/default-layout/default-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmModalComponent,
    EditOperatorModalComponent,
    DefaultLayout,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    OperatorsModule,
    ReactiveFormsModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }