import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { DemoMaterialModule } from "../material/material.module";
import { AuthService } from "./auth.service";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth.interceptor";

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [LoginPageComponent]
})
export class AuthModule { }
