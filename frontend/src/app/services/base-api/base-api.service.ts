import { Injectable } from '@angular/core';
import {IApiModelObject, IApiOptions, IBaseApiService, IUrlPathParams} from '../../interfaces/api-interfaces';
import {ApiServiceEnum} from '../../enums/api-enums';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {getApiModel} from '../../models/api-models';
import {catchError, map, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService implements IBaseApiService {

  private readonly serviceType: ApiServiceEnum;
  protected apiModel: Partial<IApiModelObject>;

  protected constructor(protected http: HttpClient, serviceType: ApiServiceEnum) {
    this.serviceType = serviceType;
    this.apiModel = getApiModel(this.serviceType);
  }

  getApiUrl(params: string | undefined, urlPathParams: IUrlPathParams | undefined, subUrl: string): string {
    let apiUrl = `${this.apiModel.url}`;
    if (urlPathParams) {
      Object.keys(urlPathParams).forEach((key) => {
        apiUrl = apiUrl.replace(`:${key}`, urlPathParams[key]);
      });
    }
    if (subUrl) {
      apiUrl = `${apiUrl}${subUrl}`;
    }
    if (params) {
      apiUrl = `${apiUrl}?${params}`;
    }
    return apiUrl;
  }

  /** Execute that makes the api call using the HttpClient module
   * - Using serviceType type to get the http method
   * - Using serviceType type to get the url
   */
  execute(apiOptions: Partial<IApiOptions>, subUrl = ""): Observable<any> {
    if (this.apiModel === undefined)
      return throwError(() => new Error(`Api model not found for ${this.serviceType}`));

    if (this.apiModel.method === undefined)
      return throwError(() => new Error(`Method not found for ${this.serviceType}`));

    let apiUrl = this.getApiUrl(apiOptions.params, apiOptions.urlPathParams, subUrl);
    if (apiUrl === undefined)
      return throwError(() => new Error(`Url not found for ${this.serviceType}`));

    return this.http.request(this.apiModel.method, apiUrl, {body: apiOptions.body, headers: apiOptions.headers}).pipe(
      map((response: any) => {
        console.log(`[BaseApiService] ${this.serviceType.toString()} response: `, response);
        return response
      }),
      catchError((error: HttpErrorResponse) => {
        throw this.getErrorMessage(error);
      })
    )
  }

  executeSub(subUrl: string, apiOptions: Partial<IApiOptions>): Observable<any> {
    return this.execute(apiOptions, subUrl);
  }

  getErrorMessage(error: HttpErrorResponse): string {
    let message = `Errore:`;
    if (error?.error) message = `${message} ${error.error}`
    else if (error?.message) message = `${message} ${error.message}`
    else if (error?.statusText) message = `${message} ${error.statusText}`
    else message = `${message} ${error.toString()}}`
    console.log(`[${this.serviceType.toString()}] ${message}`)
    return message;
  }
}
