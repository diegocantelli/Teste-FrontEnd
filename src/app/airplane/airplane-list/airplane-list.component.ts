import { Component, OnInit, Input, TemplateRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { IAirplane } from '../models/airplane.model';
import { AirplaneService } from 'src/app/airplane.service';
import { Subscription } from 'rxjs';
import { AirplaneDTO } from '../models/airplaneDTO.model';

@Component({
  selector: 'app-airplane-list',
  templateUrl: './airplane-list.component.html',
  styleUrls: ['./airplane-list.component.css']
})
export class AirplaneListComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;
  subscription: Subscription;
  airplaneIdDelete = 0;

  @Input() filterInput: string;
  @Input() airplanes: AirplaneDTO[];

  constructor(private service: AirplaneService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.subscription = this.GetAll();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  Deletar() {
    this.service.Delete(this.airplaneIdDelete)
      .subscribe(() => {
        if (this.filterInput) {
          this.subscription = this.getByModelo(this.filterInput);
        } else {
          this.subscription = this.GetAll();
        }
        this.modalRef.hide();
        this.airplaneIdDelete = 0;
      });
  }

  getByModelo(valor: string) {
    return this.service.GetByModelo(valor)
      .subscribe((airplanes: AirplaneDTO[]) => {
        this.airplanes = airplanes;
      });
  }

  GetAll(): Subscription {
    return this.service.Get()
      .subscribe((airplanes: AirplaneDTO[]) => {
        this.airplanes = airplanes;
      },
        (erro: Error) => console.log(erro)
      );
  }

  openModal(template: TemplateRef<any>, id: number) {
    this.airplaneIdDelete = id;
    this.modalRef = this.modalService.show(template);
  }

}
