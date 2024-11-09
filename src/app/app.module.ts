import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {PrimemodulesModule} from './primemodules/primemodules.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimemodulesModule,
    HttpClientModule, // Add HttpClientModule here
    LayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"blogadmin-ef12c","appId":"1:709759401901:web:6512f617f383f172f02b24","storageBucket":"blogadmin-ef12c.appspot.com","apiKey":"AIzaSyBcpUvRsBqLqWwEovj3gXX48jsAbZ0HROk","authDomain":"blogadmin-ef12c.firebaseapp.com","messagingSenderId":"709759401901"})),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
