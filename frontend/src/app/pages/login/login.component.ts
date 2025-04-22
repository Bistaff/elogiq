import {ChangeDetectionStrategy, Component, effect, Inject, inject, PLATFORM_ID, signal} from '@angular/core';
import {AppStore} from '../../stores/app.store';
import {ReactiveFormsModule} from '@angular/forms';
import {AppFormControl} from '../../models/form/form-class';
import {ApiServiceEnum} from '../../enums/api-enums';
import {ListFormControls} from '../../models/page-list-models';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {AppFormComponent} from '../../components/app-form/app-form.component';
import {IUSer} from '../../interfaces/user-interfaces';
import {Router, RouterModule} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AppFormComponent,
    RouterModule
  ],
  providers: [AppStore],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  readonly store = inject(AppStore);
  readonly router: Router = inject(Router);
  loginFormControls: AppFormControl<any>[] = [];

  error = signal<string>("");
  isLoading: Observable<boolean> | undefined;

  constructor() {
      this.isLoading = this.store.isLoading$;
      this.loginFormControls = ListFormControls[ApiServiceEnum.LOGIN.toString()];
      effect(() => {
        this.error.set(this.store.error())
      });
      effect(() => {
        if (this.store.logged()) this.router.navigate(['/home'])
      });
  }

  onSubmit(credentials: Partial<IUSer>) {
    this.store.loginUser(credentials);
  }

}
