import { Injectable } from '@angular/core';
import {BaseApiService} from '../base-api/base-api.service';
import {HttpClient} from '@angular/common/http';
import {ApiServiceEnum} from '../../enums/api-enums';
import {catchError, map, Observable} from 'rxjs';
import {ICompany} from '../../interfaces/page-list-interfaces';
import {ICompanyRequest} from '../../interfaces/companies-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService extends BaseApiService {

  constructor(protected override http: HttpClient) {
    super(http, ApiServiceEnum.COMPANIES);
  }

  get(): Observable<ICompany[]> {
    return this.execute({}).pipe(
      map((response: ICompany[]) => {
        return response
      }),
      catchError((error: string) => { throw error })
    );
  }

  getCompany(req: Partial<ICompanyRequest>): Observable<ICompany> {
    let subUrl = `${req.companyId}/`;

    if (req.holdingCost) {
      subUrl = `${subUrl}?holdingCost=${req.holdingCost}`;
    }

    if (req.annualDemand) {
        subUrl = `${subUrl}${subUrl.includes('?') ? '&' : '?'}annualDemand=${req.annualDemand}`;
    }
    return this.executeSub(`${subUrl}`, {}).pipe(
      map((response: ICompany) => response),
      catchError((error: string) => { throw error })
    );
  }
}
