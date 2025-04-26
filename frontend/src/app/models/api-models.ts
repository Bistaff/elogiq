import {IApiModel, IApiModelObject} from '../interfaces/api-interfaces';
import {ApiServiceEnum} from '../enums/api-enums';

export const ApiModels: IApiModel = {
  [ApiServiceEnum.LOGIN]: {
    showInApp: false,
    name: ApiServiceEnum.LOGIN,
    method: 'POST',
    internal: true,
    appRoute: 'login',
    url: `/api/login/`,
  },
  [ApiServiceEnum.LOGOUT]: {
    showInApp: false,
    name: ApiServiceEnum.LOGOUT,
    method: 'POST',
    internal: true,
    appRoute: 'logout',
    url: `/api/logout/`,
  },
  [ApiServiceEnum.DASHBOARD]: {
    showInApp: false,
    name: ApiServiceEnum.DASHBOARD,
    internal: true,
    appRoute: '',
  },
  [ApiServiceEnum.HOME]: {
    showInApp: true,
    name: ApiServiceEnum.HOME,
    method: 'GET',
    internal: true,
    appRoute: 'home',
  },
  [ApiServiceEnum.COMPANIES]: {
    showInApp: true,
    name: ApiServiceEnum.COMPANIES,
    method: 'GET',
    internal: true,
    appRoute: 'companies',
    subAppRoute: 'companies/:id',
    url: `/api/market/companies/`,
  },
  [ApiServiceEnum.PRODUCT]: {
    showInApp: false,
    name: ApiServiceEnum.PRODUCT,
    method: 'GET',
    internal: false,
    url: `api/market/companies/:companyId/products/:productId/`,
  }
}

export const getApiModel = (apiName: ApiServiceEnum): Partial<IApiModelObject> =>
  ApiModels[apiName.toString()];
