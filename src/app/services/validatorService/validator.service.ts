import { Injectable } from '@angular/core';
import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  public notEmpty: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    let ok = true;
    const val: string | number = control.value;
    if (val === '' || val === 0) {
      ok = false;
    }
    return !ok ? {'empty': true}: null;
  };

}
