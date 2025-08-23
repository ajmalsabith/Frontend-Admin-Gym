import { Routes } from '@angular/router';
import { authGuard } from '@core';
import { AdminLayoutComponent } from '@theme/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { LoginComponent } from './component-sections/admin/Modules/login/login.component';
import { UserAuthGuard } from './guards/admin-route.guard';
import { DashboardComponentAdmin } from './component-sections/admin/Modules/dashboard/dashboard.component';

export const routes: Routes = [

  {
  path: 'admin',
  component: AdminLayoutComponent,
  canActivate: [UserAuthGuard],
  data: { auth: true }, 
  children: [
    { path:'dashboard', component: DashboardComponentAdmin},
    {
      path: 'modules',
      loadChildren: () => import('../app/component-sections/admin/admin.module').then(m => m.AdminModule)
    },
    { path: '**', redirectTo: 'dashboard' },
  ]
 },
 { path:'admin-login', component: LoginComponent, canActivate:[UserAuthGuard], data: { auth: false } },


 { path: '**', redirectTo: 'admin' },

];
