import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AirplaneService } from '../airplane.service';
import { IAirplane } from '../airplane/models/airplane.model';
import { error } from 'util';
import { FormValidatorService } from '../airplane/shared/formvalidator.service';

@Component({
  selector: 'app-airplane-edit',
  templateUrl: './airplane-edit.component.html',
  styleUrls: ['./airplane-edit.component.css']
})
export class AirplaneEditComponent implements OnInit {


  airplaneEditForm: FormGroup;
  airplane: IAirplane;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private service: AirplaneService, private router: Router,
    private formValidatorService: FormValidatorService) { }

  ngOnInit() {
    //refatorar ngOnInit

    this.airplaneEditForm = this.fb.group({
      modelo: ['', Validators.required],
      qtdPassageiros: [0, Validators.required]
    })

    let id = +this.route.snapshot.paramMap.get('id');

    this.service.GetById(id)
      .subscribe((airplane: IAirplane) => {
        this.airplane = airplane;

        this.fb.control('modelo').setValue(this.airplane.modelo);
        this.airplaneEditForm.patchValue(
          { modelo: this.airplane.modelo, qtdPassageiros: this.airplane.qtdPassageiros }
        );
      });
  }

  Salvar() {
    let airplane: IAirplane = {
      id: this.airplane.id,
      modelo: this.airplaneEditForm.get('modelo').value,
      qtdPassageiros: +this.airplaneEditForm.get('qtdPassageiros').value,
      dataCriacaoRegistro: this.airplane.dataCriacaoRegistro
    }

    this.service.Post(airplane)
      .subscribe(() => console.log('Editado com sucesso!'));
  }

  formFieldIsValid(field: string): boolean {
    return this.formValidatorService.formFieldIsValid(this.airplaneEditForm, field);
  }
}
