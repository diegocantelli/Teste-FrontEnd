import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AirplaneComponent } from './airplane/airplane.component';
import { AirplaneService } from './airplane.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalAirplaneComponent } from './modal-airplane/modal-airplane.component';
import { AirplaneEditComponent } from './airplane-edit/airplane-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AirplaneComponent,
    ModalAirplaneComponent,
    AirplaneEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AirplaneComponent },
      { path: 'airplane/:id', component: AirplaneEditComponent }
    ]),
    ModalModule.forRoot()
  ],
  providers: [AirplaneService, BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
