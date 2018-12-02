import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';


import {
  MatToolbarModule,
  MatTabsModule,
  MatButtonModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSidenavModule,
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material';

import { AppComponent } from './app.component';
import {AppDialogModalComponent} from './app-dialog-modal.component';

@NgModule({
  imports:      [ BrowserModule, HttpClientModule, FormsModule, BrowserAnimationsModule, MatTableModule, MatToolbarModule, MatTabsModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatRadioModule, MatSidenavModule, MatCardModule, MatSortModule, MatDialogModule],
  entryComponents: [AppComponent, AppDialogModalComponent ],
  declarations: [ AppComponent, AppDialogModalComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
