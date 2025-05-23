import {HttpHeaders} from '@angular/common/http';

export interface IApiModelObjectOptions {
  body: any,
  headers: HttpHeaders
}

export interface IApiModelObject {
  showInApp: boolean
  name: string;
  method: string;
  url: string;
  appRoute: string;
  subAppRoute: string;
  internal: boolean; // internal means that the api points to the Angular server
  params: string;
  body: string;
}

export interface IApiModel {
  [key: string]: Partial<IApiModelObject>;
}

export interface IUrlPathParams {
  [key: string]: any;
}

export interface IApiOptions {
  urlPathParams: IUrlPathParams;
  params: string;
  body: any;
  headers: HttpHeaders
}

export interface IProductInfo {
  annualDemand: number;
  holdingCost: number;
  setupCost: number;
}

export interface IBaseApiService {
  execute(apiOptions: Partial<IApiOptions>, subUrl: string): void;
}
