import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {SigninComponent} from "./auth/signin/signin.component";
import {HomeComponent} from "./home/home.component";
import {ApiService} from "./services/api.service";
import { ActuListComponent } from './actulist/actulist.component';
import {ActusService} from "./services/actus.service";
import { SingleActuComponent } from './singleactu/singleactu.component';
import { ActuFormComponent } from './actu-form/actu-form.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'actus', component: ActuListComponent },
  { path: 'actus/new', canActivate: [AuthGuardService], component: ActuFormComponent },
  { path: 'actus/view/:id', component: SingleActuComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    ActuListComponent,
    SingleActuComponent,
    ActuFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuardService, ApiService, ActusService, { provide: LOCALE_ID, useValue: "fr-FR" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
