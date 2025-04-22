import { Injectable } from '@angular/core';
import {BaseApiService} from '../base-api/base-api.service';
import {HttpClient} from '@angular/common/http';
import {ApiServiceEnum} from '../../enums/api-enums';
import {catchError, map, Observable} from 'rxjs';
import {ICompany, IProduct} from '../../interfaces/page-list-interfaces';
import {ICompanyRequest, IProductRequest} from '../../interfaces/companies-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseApiService {

  constructor(protected override http: HttpClient) {
    super(http, ApiServiceEnum.PRODUCT);
  }

  get(req: Partial<IProductRequest>): Observable<IProduct> {
    let urlPathParams = {
      companyId: req.companyId,
      productId: req.productId
    }
    let params: string = `holdingCost=${req.holdingCost}&setupCost=${req.setupCost}`;
    if (req.annualDemand) params = `${params}&annualDemand=${req.annualDemand}`;
    console.log("AAA 1", params, urlPathParams);
    return this.execute({params: params, urlPathParams}).pipe(
      map((response: IProduct) => {
        return response
      }),
      catchError((error: string) => { throw error })
    );
  }
}
