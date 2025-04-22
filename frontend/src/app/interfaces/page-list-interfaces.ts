export interface ISector {
  id: number;
  name: string;
}

export interface ICompany {
  id: number;
  name: string;
  sector: ISector;
  predictedEoq: boolean;
  products: IProduct[];
}

export interface IProduct {
  id: number;
  yearLaunched: number;
  name: string;
  description: string;
  price: number;
  orderingCost: string;
  priceTiers: IPriceTier[];
  eoq: IEOQ;
  eoqPre: IEOQ;
}

export interface IPriceTier {
  id: number;
  minQuantity: number;
  unitPrice: number;
}

export interface IEOQ {
  eoq: number;
  reqUnitPrice: number;
  unitPrice: number;
  minQuantity: number;
  totalCost: number;
  bestMinQuantity: number;
  bestTotalCost: number;
}
