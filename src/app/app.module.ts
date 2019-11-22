import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { firebaseConfig } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersService } from './shared/orders.service';
import { AddComponent } from './add/add.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { BookShelfComponent } from './book-shelf/book-shelf.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    AddDialogComponent,
    BookShelfComponent,
    BookDetailsComponent,
    HomeComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    OrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
