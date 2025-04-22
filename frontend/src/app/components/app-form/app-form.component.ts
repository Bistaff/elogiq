import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  model,
  output,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AppFormControl} from '../../models/form/form-class';
import {CommonModule} from '@angular/common';
import {AppFormControlComponent} from './app-form-control/app-form-control.component';

@Component({
  selector: 'app-form',
  imports: [CommonModule, AppFormControlComponent, ReactiveFormsModule],
  templateUrl: './app-form.component.html',
  standalone: true,
  styleUrl: './app-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFormComponent {
  controls: InputSignal<AppFormControl<string>[]> = input<AppFormControl<string>[]>([]);
  form!: FormGroup<any>
  horizontal: InputSignal<boolean> = input<boolean>(false);
  light: InputSignal<boolean> = input<boolean>(true);
  isLoading: InputSignal<boolean | null> = input<boolean | null>(false);
  formSubmittedOutput = output<any>();

  error = model<string>("")

  constructor() {
    effect(() => {
      if (!this.isLoading()) {
        this.form.enable();
        this.form.reset();
      }
    });
  }

  ngOnInit() {
    this.form = this.toFormGroup(this.controls() as AppFormControl<string>[]);
  }

  onSubmit() {
    this.form.disable();
    this.formSubmittedOutput.emit(this.form.getRawValue());
  }

  toFormGroup(controls: AppFormControl<string>[]) {
    const group: any = {};
    controls
      .sort((a, b) => a.order - b.order)
      .forEach((control) => {
        group[control.key] = new FormControl(control.value || '', control.validators)
      });
    return new FormGroup(group);
  }
}
