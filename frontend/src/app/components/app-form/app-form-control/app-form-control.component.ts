import {Component, input, InputSignal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AppFormControl} from '../../../models/form/form-class';
import {convertErrorKeyToString} from '../../../models/form/custom-validators';
import {isValidDate} from 'rxjs/internal/util/isDate';

@Component({
  selector: 'app-form-control',
  templateUrl: './app-form-control.component.html',
  styleUrl: './app-form-control.component.scss',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class AppFormControlComponent {

  control: InputSignal<AppFormControl<string>> = input(new AppFormControl<string>({}));
  form: InputSignal<FormGroup> = input(new FormGroup({}))
  horizontal: InputSignal<boolean> = input<boolean>(false);

  showContent = false;

  get isDirty() {
    return this.form()?.get(this.control().key)?.dirty;
  }

  get errorMessage(): string {
    const errors = this.form()?.get(this.control().key)?.errors;
    if (!errors) return "";
    const errorKey: string = Object.keys(errors).pop() || '';
    return convertErrorKeyToString(errorKey);
  }

  protected readonly isValidDate = isValidDate;
}
