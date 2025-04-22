import {ValidatorFn} from '@angular/forms';

export class AppFormControl<T> {
  value: T | undefined;
  key: string;
  label: string;
  order: number;
  controlType: string;
  type: string;
  validators: ValidatorFn[];
  options: {key: string; value: string}[];

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      order?: number;
      controlType?: string;
      type?: string;
      validators?: ValidatorFn[];
      options?: {key: string; value: string}[];
    } = {},
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.validators = options.validators || [];
    this.options = options.options || [];
  }
}
