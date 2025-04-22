import {
  afterNextRender, ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {CompaniesStore} from '../../stores/companies.store';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from '../../components/loading/loading.component';
import {AppFormControl} from '../../models/form/form-class';
import {ListFormControls} from '../../models/page-list-models';
import {ApiServiceEnum} from '../../enums/api-enums';
import {Observable} from 'rxjs';
import {ICompanyRequest, IProductRequest} from '../../interfaces/companies-interfaces';
import {AppFormComponent} from '../../components/app-form/app-form.component';

@Component({
  selector: 'app-company',
  imports: [
    CommonModule,
    LoadingComponent,
    AppFormComponent
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
  annualDemand: number = 0;
  holdingCost: number = 0;
  setupCost: number = 0;

  constructor() {
    this.isLoading = this.store.isLoading$;
    this.formControls = ListFormControls[ApiServiceEnum.COMPANY.toString()];
  }

  ngOnInit(): void {
    this.store.getCompany({companyId: this.id()})
  }

  showEOQ(index: number) {
    console.log('showEOQ', index);
    this.eoq.set(index);
  }

  onSubmit(companyReq: Partial<IProductRequest>, productId: number) {
    this.annualDemand = companyReq.annualDemand ? companyReq.annualDemand : 0;
    this.holdingCost = companyReq.holdingCost ? companyReq.holdingCost : 0;
    this.setupCost = companyReq.setupCost ? companyReq.setupCost : 0;
    console.log("AAA 0", companyReq, productId, this.annualDemand, this.holdingCost, this.setupCost);
    this.store.getProduct({
      companyId: this.id(),
      productId,
      annualDemand: this.annualDemand,
      holdingCost: this.holdingCost,
      setupCost: this.setupCost
    });
  }

}
