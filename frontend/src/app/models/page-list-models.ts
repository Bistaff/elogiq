import {AppFormControl} from './form/form-class';
import {TextboxControl, TextboxProtectedControl} from './form/form-controls';
import {Validators} from '@angular/forms';
import {ApiServiceEnum} from '../enums/api-enums';

export const ListFormControls: Record<string, AppFormControl<any>[]> = {
  [ApiServiceEnum.LOGIN]: [
    new TextboxControl({
      key: 'username',
      label: 'Username',
      type: 'text',
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      order: 1
    }),

    new TextboxProtectedControl({
      key: 'password',
      label: 'Password',
      type: 'password',
      validators: [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
      order: 2
    }),
  ],
  [ApiServiceEnum.COMPANY]: [
    new TextboxControl({
      key: 'holdingCost',
      label: 'Costo di mantenimento',
      type: 'number',
      validators: [Validators.required, Validators.min(1), Validators.max(10000)],
      order: 1
    }),

    new TextboxProtectedControl({
      key: 'annualDemand',
      label: 'Domanda annua',
      type: 'number',
      validators: [Validators.min(1), Validators.max(10000)],
      order: 2
    }),
  ]
}
