import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable({
    providedIn: 'root'
})
export class FormValidatorService {

    private getFormField(airplaneForm: FormGroup, field: string) {
        return airplaneForm.get(field);
    }

    public formFieldIsValid(airplaneForm: FormGroup, field: string): boolean {
        return (this.getFormField(airplaneForm, field).touched &&
            this.getFormField(airplaneForm, field).invalid)
    }
}
