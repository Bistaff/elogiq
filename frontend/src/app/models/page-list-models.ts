import {AppFormControl} from './form/form-class';
import {TextboxControl, TextboxProtectedControl} from './form/form-controls';
import {Validators} from '@angular/forms';
import {ApiServiceEnum} from '../enums/api-enums';
import {numberValidator} from './form/custom-validators';

export const ListFormControls: Record<string, AppFormControl<any>[]> = {
  [ApiServiceEnum.LOGIN]: [
    new TextboxControl({
      key: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      order: 1
    }),

    new TextboxProtectedControl({
      key: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      validators: [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
      order: 2
    }),
  ],
  [ApiServiceEnum.COMPANY]: [
    new TextboxControl({
      key: 'holdingCost',
      label: 'Costo di mantenimento',
      type: 'text',
      required: true,
      validators: [Validators.required, Validators.min(1), Validators.max(10000), numberValidator],
      order: 1
    }),
    new TextboxControl({
      key: 'setupCost',
      label: "Costo d'ordine",
      type: 'text',
      required: true,
      validators: [Validators.required, Validators.min(1), Validators.max(10000), numberValidator],
      order: 2
    }),
    new TextboxControl({
      key: 'annualDemand',
      label: 'Domanda annua',
      type: 'text',
      validators: [Validators.min(1), Validators.max(10000), numberValidator],
      order: 3
    }),
  ]
}
