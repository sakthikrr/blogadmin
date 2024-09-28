import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {PrimemodulesModule} from './primemodules/primemodules.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimemodulesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
