import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal, NgModuleRef,
  OnInit,
  signal, TemplateRef,
  WritableSignal
} from '@angular/core';
import {CompaniesStore} from '../../stores/companies.store';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from '../../components/loading/loading.component';
import {AppFormControl} from '../../models/form/form-class';
import {ListFormControls} from '../../models/page-list-models';
import {ApiServiceEnum} from '../../enums/api-enums';
import {Observable} from 'rxjs';
import {IProductRequest} from '../../interfaces/companies-interfaces';
import {AppFormComponent} from '../../components/app-form/app-form.component';
import {NgbModal, NgbModalRef, NgbTooltip, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {IProduct} from '../../interfaces/page-list-interfaces';
import {IProductInfo} from '../../interfaces/api-interfaces';

@Component({
  selector: 'app-company',
  imports: [
    CommonModule,
    LoadingComponent,
    AppFormComponent,
    NgbTooltip
  ],
  templateUrl: './company.component.html',
  standalone: true,
  styleUrl: './company.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent implements OnInit {
  store = inject(CompaniesStore);
  id: InputSignal<number> = input(0);
  eoq: WritableSignal<number> = signal(-1);
  formControls: AppFormControl<any>[] = [];
  isLoading: Observable<boolean>;
  private modalRef: NgbModalRef | null = null;
  productInfo: { [key: number]: IProductInfo } = {}
  annualDemand: number = 0;
  holdingCost: number = 0;
  setupCost: number = 0;
  product: IProduct = {} as IProduct;
  productSales: any[] = [];


  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');

  constructor() {
    this.isLoading = this.store.isLoading$;
    this.formControls = ListFormControls[ApiServiceEnum.COMPANY.toString()];
  }

  ngOnInit(): void {
    this.store.getCompany({companyId: this.id()})
  }

  showEOQ(content: TemplateRef<any>, index: number) {
    let company = this.store.selectedCompany();
    if (company === null) return;
    let products: IProduct[] | undefined = company.products;
    if (products === undefined || products.length === 0) return;
    this.product = products[index];
    this.productSales = Object.keys(this.product.historicalSales).reduce((acc: any, year: string) => {
      let salesOrd = this.orderedSales(this.product.historicalSales[year])
      return [
        ...acc,
        [
          year,
          salesOrd.reduce((acc: any, month: any) => {
            return [...acc, ...Object.entries(month)]
          }, [])
        ]
      ]
    }, [])
    this.eoq.set(index);
    this.modalRef = this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' });
  }

  orderedSales(months: any) {
    let values: {[key: string]: number} = {"January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
      "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11}

    months = Object.keys(months).sort((a: string, b: string) => {
      return values[a] - values[b]
    }).map((month: string) => ({[this.translateMonths(month)]: months[month]}))
    return months
  }

  translateMonths(month: string) {
    let translated: {[key: string]: string} = {"January": "Gennaio", "February": "Febbraio", "March": "Marzo",
      "April": "Aprile", "May": "Maggio", "June": "Giugno", "July": "Luglio", "August": "Agosto",
      "September": "Settembre", "October": "Ottobre", "November": "Novembre", "December": "Dicembre"}
    return translated[month]
  }

  onSubmit(companyReq: Partial<IProductRequest>, productId: number) {
    this.annualDemand = companyReq.annualDemand ? companyReq.annualDemand : 0;
    this.holdingCost = companyReq.holdingCost ? companyReq.holdingCost : 0;
    this.setupCost = companyReq.setupCost ? companyReq.setupCost : 0;
    this.productInfo[productId] = {
      annualDemand: companyReq.annualDemand || 0,
      holdingCost: companyReq.holdingCost || 0,
      setupCost: companyReq.setupCost || 0
    }
    this.store.getProduct({
      companyId: this.id(),
      productId,
      annualDemand: this.annualDemand,
      holdingCost: this.holdingCost,
      setupCost: this.setupCost
    });
    if (this.modalRef != null)
      this.modalRef?.close()
  }

}
