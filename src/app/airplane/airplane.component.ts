import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IAirplane } from './models/airplane.model';
import { AirplaneService } from '../airplane.service';
import { FormValidatorService } from './shared/formvalidator.service';
import { AirplaneListComponent } from './airplane-list/airplane-list.component';


@Component({
  selector: 'app-airplane',
  templateUrl: './airplane.component.html',
  styleUrls: ['./airplane.component.css']
})
export class AirplaneComponent implements OnInit, OnDestroy {

  airplaneForm: FormGroup;
  airplanes: IAirplane[];
  subscription: Subscription;
  airplaneIdDelete = 0;
  valorFiltro = '';
  @ViewChild(AirplaneListComponent, { static: false }) airplaneListComponent: AirplaneListComponent;


  constructor(private fb: FormBuilder,
    private service: AirplaneService,
    private formValidatorService: FormValidatorService) { }

  ngOnInit() {
    this.airplaneForm = this.fb.group({
      modelo: ['', Validators.required],
      qtdPassageiros: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }


  formFieldIsValid(field: string): boolean {
    return this.formValidatorService.formFieldIsValid(this.airplaneForm, field);
  }


  private NewAirplane(): IAirplane {
    return {
      id: 0,
      modelo: this.airplaneForm.get('modelo').value,
      qtdPassageiros: this.airplaneForm.get('qtdPassageiros').value,
      dataCriacaoRegistro: new Date()
    };
  }

  Salvar(): void {
    this.service.Post(this.NewAirplane()).subscribe(() => {
      this.LimparTexts();
      this.subscription = this.airplaneListComponent.GetAll();
    },
      erro => console.log(erro));
  }

  Filtrar(value: string) {
    if (value) {
      this.airplaneListComponent.getByModelo(value);
    } else {
      this.airplaneListComponent.GetAll();
    }
  }

  private LimparTexts(): void {
    this.airplaneForm.reset();
  }

}
