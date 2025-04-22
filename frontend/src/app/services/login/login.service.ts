import { Injectable } from '@angular/core';
import {IUSer} from '../../interfaces/user-interfaces';
import {BaseApiService} from '../base-api/base-api.service';
import {HttpClient} from '@angular/common/http';
import {ApiServiceEnum} from '../../enums/api-enums';
import {catchError, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseApiService {

  constructor(protected override http: HttpClient) {
    super(http, ApiServiceEnum.LOGIN);
  }

  login(credentials: Partial<IUSer>): Observable<{token: string}> {
    return this.execute({body: credentials}).pipe(
      map((response: { token: string }) => {
        return response
      }),
      catchError((error: Error) => { throw error })
    );
  }
}
