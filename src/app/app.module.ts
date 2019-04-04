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
  MatDialogModule
} from '@angular/material';

import { AppComponent } from './app.component';
import {AppDialogModalComponent} from './app-dialog-modal.component';
import { MapComponent } from './map/map/map.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';

@NgModule({
  imports:      [ BrowserModule, HttpClientModule, FormsModule, BrowserAnimationsModule, MatTableModule, MatToolbarModule, MatTabsModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatRadioModule, MatSidenavModule, MatCardModule, MatSortModule, MatDialogModule],
  entryComponents: [AppComponent, AppDialogModalComponent ],
  declarations: [ AppComponent, AppDialogModalComponent, MapComponent, SidebarComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
