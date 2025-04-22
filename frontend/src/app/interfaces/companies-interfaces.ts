export interface ICompanyRequest {
  companyId: number;
}

export interface IProductRequest {
  companyId: number,
  productId: number;
  holdingCost: number;
  setupCost: number;
  annualDemand: number;
}
