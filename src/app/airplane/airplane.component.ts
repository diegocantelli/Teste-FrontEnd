import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { IAirplane } from './models/airplane.model';
import { AirplaneService } from '../airplane.service';
import { FormValidatorService } from './shared/formvalidator.service';


@Component({
  selector: 'app-airplane',
  templateUrl: './airplane.component.html',
  styleUrls: ['./airplane.component.css']
})
export class AirplaneComponent implements OnInit, OnDestroy {
  airplaneForm: FormGroup;
  airplanes: IAirplane[];
  subscription: Subscription;
  modalRef: BsModalRef;
  airplaneIdDelete = 0;

  constructor(private fb: FormBuilder,
    private service: AirplaneService,
    private modalService: BsModalService,
    private formValidatorService: FormValidatorService) { }

  ngOnInit() {
    this.airplaneForm = this.fb.group({
      modelo: ['', Validators.required],
      qtdPassageiros: ['', [Validators.required]]
    });
    this.subscription = this.GetAll();
  }

  private GetAll(): Subscription {
    return this.service.Get()
      .subscribe((airplanes: IAirplane[]) => {
        this.airplanes = airplanes;
      },
        (erro: Error) => console.log(erro)
      );
  }


  formFieldIsValid(field: string): boolean {
    return this.formValidatorService.formFieldIsValid(this.airplaneForm, field);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  Salvar(): void {

    let postAirplane: IAirplane = {
      id: 0,
      modelo: this.airplaneForm.get('modelo').value,
      qtdPassageiros: this.airplaneForm.get('qtdPassageiros').value,
      dataCriacaoRegistro: new Date()
    };

    this.service.Post(postAirplane).subscribe(() => {
      this.LimparTexts();
      this.subscription = this.service.Get()
        .subscribe((airplanes: IAirplane[]) => {
          this.airplanes = airplanes;
        },
          (erro: Error) => console.log(erro)
        );
    },
      erro => console.log(erro));
  }

  Deletar() {
    this.service.Delete(this.airplaneIdDelete)
      .subscribe(() => {
        this.service.Get()
          .subscribe((airplanes: IAirplane[]) => {
            this.airplanes = airplanes;
            this.modalRef.hide();
          })
        this.airplaneIdDelete = 0;

      });
  }

  Filtrar(valor: string): void {
    if (valor) {
      //busca por modelo
    }
  }

  private LimparTexts(): void {
    this.airplaneForm.reset();
  }

  openModal(template: TemplateRef<any>, id: number) {
    this.airplaneIdDelete = id;
    this.modalRef = this.modalService.show(template);
  }

}
