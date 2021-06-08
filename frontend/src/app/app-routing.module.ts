import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorsPageComponent } from "./operators/operators-page/operators-page.component";
import { LoginPageComponent } from "./auth/login-page/login-page.component";
import { DefaultLayout } from "./components/layouts/default-layout/default-layout.component";
import { ServicesPageComponent } from "./services/services-page/services-page.component";
import { ServiceGroupsPageComponent } from "./services/service-groups-page/service-groups-page.component";
import { ServiceTreePageComponent } from "./services/service-tree-page/service-tree-page.component";
import { WindowsPageComponent } from "./windows/windows-page/windows-page.component";

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
      },
      {
        path: 'service',
        children: [
          {
            path: 'services',
            component: ServicesPageComponent,
          },
          {
            path: 'groups',
            component: ServiceGroupsPageComponent,
          },
          {
            path: 'tree',
            component: ServiceTreePageComponent,
          }
        ]
      },
      {
        path: 'windows',
        component: WindowsPageComponent,
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
