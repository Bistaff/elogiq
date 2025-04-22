import {AppFormControl} from './form-class';

export class TextboxControl extends AppFormControl<string> {
  override controlType = 'textbox';
}

export class TextboxProtectedControl extends AppFormControl<string> {
  override controlType = 'textbox-protected';
}
