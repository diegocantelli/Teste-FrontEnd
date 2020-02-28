import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { IAirplane } from './models/airplane.model';
import { AirplaneService } from '../airplane.service';


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

  constructor(private fb: FormBuilder,
    private service: AirplaneService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.airplaneForm = this.fb.group({
      modelo: ['', Validators.required],
      qtdPassageiros: ['', [Validators.required]]
    });

    this.subscription = this.service.Get()
      .subscribe((airplanes: IAirplane[]) => {
        this.airplanes = airplanes;
      },
        (erro: Error) => console.log(erro)
      );
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
      this.subscription = this.service.Get()
        .subscribe((airplanes: IAirplane[]) => {
          this.airplanes = airplanes;
        },
          (erro: Error) => console.log(erro)
        );
    },
      erro => console.log(erro));
    //console.log(this.airplaneForm.get('modelo').value);
  }

  openModal(template: TemplateRef<any>, id: number) {
    console.log(id);
    this.modalRef = this.modalService.show(template);
  }

}
