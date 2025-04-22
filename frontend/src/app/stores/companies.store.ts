import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState
} from '@ngrx/signals';
import {inject} from '@angular/core';
import {CompaniesService} from '../services/companies/companies.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from 'rxjs';
import {tapResponse} from '@ngrx/operators';
import {toObservable} from '@angular/core/rxjs-interop';
import {ICompany} from '../interfaces/page-list-interfaces';
import {ICompanyRequest} from '../interfaces/companies-interfaces';


type CompaniesStore = {
  companies: ICompany[];
  error: string;
  isLoading: boolean;
  selectedCompany: ICompany | null;
}

const initialState: CompaniesStore = {
  companies: [],
  error: "",
  isLoading: false,
  selectedCompany: null
}

export const CompaniesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    companiesService: inject(CompaniesService),
  })),

  withMethods(({companiesService, ...store}) => ({
    getCompanies: rxMethod<void>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap(() => {
          return companiesService.get().pipe(
            tapResponse({
              next: (r: ICompany[]) => {
                patchState(store, {companies: r, isLoading: false})
              },
              error: (error: string) => {
                console.error('Error during get companies: ', error);
                patchState(store, {isLoading: false, error: error});
              }
            })
          )
        }),
      )
    ),
    getCompany: rxMethod<Partial<ICompanyRequest>>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap((companyReq: Partial<ICompanyRequest>) => {
          return companiesService.getCompany(companyReq).pipe(
            tapResponse({
              next: (r: ICompany) => {
                console.log("[CompaniesStore] Response: ", r);
                patchState(store, {selectedCompany: r, isLoading: false})
              },
              error: (error: string) => {
                patchState(store, {isLoading: false, error: error});
                console.error('Error during get company: ', error);
              }
            })
          )
        }),
      )
    )
  })),
  withProps(({ isLoading }) => ({
    isLoading$: toObservable(isLoading),
  }))
)
