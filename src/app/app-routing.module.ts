import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginGuard} from "./auth/login.guard";
import {UserGuard} from "./auth/user.guard";
import {OfficerGuard} from "./auth/officer.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
  { path: 'resident-user', loadChildren: () => import('./resident-user/resident-user.module').then(m => m.ResidentUserModule), canLoad: [UserGuard]},
  { path: 'council-officer', loadChildren: () => import('./council-officer/council-officer.module').then(m => m.CouncilOfficerModule), canLoad: [OfficerGuard] },
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
