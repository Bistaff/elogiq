import {IUSer} from '../interfaces/user-interfaces';
import {patchState, signalStore, withMethods, withProps, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {LoginService} from '../services/login/login.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from 'rxjs';
import {tapResponse} from '@ngrx/operators';
import {toObservable} from '@angular/core/rxjs-interop';
import {ApiServiceEnum} from '../enums/api-enums';
import {LogoutService} from '../services/login/logout.service';

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
  withMethods((store, loginService = inject(LoginService),
               logoutService = inject(LogoutService)) => ({
    loginUser: rxMethod<Partial<IUSer>>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap(credentials => {
          return loginService.login(credentials).pipe(
            tapResponse({
              next: (r: {token: string}) => patchState(store, {logged: true, isLoading: false}),
              error: (error: string) => {
                console.error('Error during login: ', error);
                patchState(store, {isLoading: false, error: error});
              }
            })
          )
        })
      )
    ),
    logoutUser: rxMethod<Partial<IUSer>>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap(() => {
          return logoutService.logout().pipe(
            tapResponse({
              next: (r: {token: string}) => patchState(store, initialState),
              error: (error: string) => {
                console.error('Error during logout: ', error);
                patchState(store, {isLoading: false, error: error});
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
