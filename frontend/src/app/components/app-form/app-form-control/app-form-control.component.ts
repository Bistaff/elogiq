import {Component, input, Input, InputSignal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AppFormControl} from '../../../models/form/form-class';

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

  get isValid() {
    return this.form()?.controls[this.control().key].valid;
  }
}
