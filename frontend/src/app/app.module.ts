import { LOCALE_ID, NgModule } from '@angular/core';
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
import { EditServiceModalComponent } from './components/modals/edit-service-modal/edit-service-modal.component';
import { ServicesModule } from "./services/services.module";
import { MultilevelMenuService, NgMaterialMultilevelMenuModule } from "ng-material-multilevel-menu";
import { ServicesSelectModalComponent } from './components/modals/services-select-modal/services-select-modal.component';
import { EditWindowModalComponent } from './components/modals/edit-window-modal/edit-window-modal.component';
import { WindowsModule } from "./windows/windows.module";
import { RegistratorModule } from "./registrator/registrator.module";
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from "@angular/common";

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmModalComponent,
    EditOperatorModalComponent,
    DefaultLayout,
    EditServiceModalComponent,
    ServicesSelectModalComponent,
    EditWindowModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    OperatorsModule,
    ReactiveFormsModule,
    AuthModule,
    ServicesModule,
    NgMaterialMultilevelMenuModule,
    WindowsModule,
    RegistratorModule,
  ],
  providers: [
    MultilevelMenuService,
    { provide: LOCALE_ID, useValue: "ru" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
