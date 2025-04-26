import {AbstractControl, ValidationErrors} from '@angular/forms';

export function numberValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value === null || value === '') {
    return null;
  }
  const parsed = Number(value);
  if (isNaN(parsed)) {
    return { notANumber: true };
  }
  return null;
}

export const convertErrorKeyToString = (key: string) => {
  switch (key) {
    case 'required':
      return 'Campo obbligatorio';
    case 'pattern':
      return 'Formato non valido';
    case 'min':
      return 'Valore minimo non rispettato';
    case 'max':
      return 'Valore massimo non rispettato';
    case 'minlength':
      return 'Lunghezza minima non rispettata';
    case 'maxlength':
      return 'Lunghezza massima non rispettata';
    case 'email':
      return 'Email non valida';
    case 'notANumber':
      return 'Il valore inserito non è un numero';
    default:
      return 'Il valore inserito non è corretto';
  }
}
