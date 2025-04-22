import {IUSer} from '../interfaces/user-interfaces';
import {patchState, signalStore, withMethods, withProps, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {LoginService} from '../services/login/login.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from 'rxjs';
import {tapResponse} from '@ngrx/operators';
import {toObservable} from '@angular/core/rxjs-interop';
import {ApiServiceEnum} from '../enums/api-enums';

type AppStore = {
  user: Partial<IUSer>;
  error: string;
  logged: boolean;
  isLoading: boolean;
  currentPage: string;
}

const initialState: AppStore = {
  user: {},
  error: "",
  logged: false,
  isLoading: false,
  currentPage: ApiServiceEnum.DASHBOARD,
}

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, loginService = inject(LoginService)) => ({
    loginUser: rxMethod<Partial<IUSer>>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap(credentials => {
          return loginService.login(credentials).pipe(
            tapResponse({
              next: (r: {token: string}) => patchState(store, {logged: true, isLoading: false}),
              error: (error: Error) => {
                patchState(store, {isLoading: false, error: error.message});
                console.error('Error during login: ', error.message);
              }
            })
          )
        })
      )
    ),
    changeCurrentPage: (page: string) => {
      patchState(store, {currentPage: page});
    }
  })),
  withProps(({ isLoading }) => ({
    isLoading$: toObservable(isLoading),
  }))
)
