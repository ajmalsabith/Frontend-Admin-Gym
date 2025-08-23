import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymComponent } from './Modules/gym/gym.component';
import { UsersComponent } from './Modules/users/users.component';
import { DashboardComponent } from 'app/admin-components/dashboard/dashboard.component';
import { UserAuthGuard } from 'app/guards/admin-route.guard';

const routes: Routes = [
  { path:'gym-manage', component: GymComponent },
  { path:'user-manage', component: UsersComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
