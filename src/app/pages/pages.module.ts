import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule
    ]
})
export class PagesModule { }
