import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {PrimemodulesModule} from './primemodules/primemodules.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BasicAuthInterceptor } from './auth/basic-auth.interceptor';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
  WelcomeComponent,
  LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimemodulesModule,
    HttpClientModule, 
    LayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService , //  Provide MessageService
    {provide:HTTP_INTERCEPTORS,useClass:BasicAuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
