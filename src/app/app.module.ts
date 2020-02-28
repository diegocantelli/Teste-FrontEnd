import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AirplaneComponent } from './airplane/airplane.component';
import { AirplaneService } from './airplane.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalAirplaneComponent } from './modal-airplane/modal-airplane.component';

@NgModule({
  declarations: [
    AppComponent,
    AirplaneComponent,
    ModalAirplaneComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [AirplaneService, BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
