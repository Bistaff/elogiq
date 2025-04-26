import { Injectable } from '@angular/core';
import {IUSer} from '../../interfaces/user-interfaces';
import {BaseApiService} from '../base-api/base-api.service';
import {HttpClient} from '@angular/common/http';
import {ApiServiceEnum} from '../../enums/api-enums';
import {catchError, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService extends BaseApiService {

  constructor(protected override http: HttpClient) {
    super(http, ApiServiceEnum.LOGOUT);
  }

  logout(): Observable<any> {
    return this.execute({}).pipe(
      map((response: any) => response),
      catchError((error: Error) => { throw error })
    );
  }
}
