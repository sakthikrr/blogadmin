import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {PrimemodulesModule} from './primemodules/primemodules.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
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
    MessageService  //  Provide MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
