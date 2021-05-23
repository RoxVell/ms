import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorsPageComponent } from "./operators/operators-page/operators-page.component";
import { LoginPageComponent } from "./auth/login-page/login-page.component";
import { DefaultLayout } from "./components/layouts/default-layout/default-layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'operators',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayout,
    children: [
      {
        path: 'operators',
        component: OperatorsPageComponent
      }
    ]
  },
  {
    path: 'auth/login',
    component: LoginPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
