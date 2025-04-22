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
import {ICompany, IProduct} from '../interfaces/page-list-interfaces';
import {ICompanyRequest, IProductRequest} from '../interfaces/companies-interfaces';
import {ProductService} from '../services/product/product.service';


type CompaniesStore = {
  companies: ICompany[];
  error: string;
  isLoading: boolean;
  selectedCompany: Partial<ICompany> | null;
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
    productService: inject(ProductService)
  })),

  withMethods(({companiesService, productService, ...store}) => ({
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
    ),
    getProduct: rxMethod<Partial<IProductRequest>>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap((productReq: Partial<IProductRequest>) => {
          return productService.get(productReq).pipe(
            tapResponse({
              next: (r: IProduct) => {
                console.log("[CompaniesStore] Product response: ", r);
                patchState(store, {
                  selectedCompany: {
                    ...store.selectedCompany(),
                    products: store.selectedCompany()?.products?.map((product) => {
                      if (product.id === r.id) return r;
                      return product;
                    }) || []
                  },
                  isLoading: false
                })
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
