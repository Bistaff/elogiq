import {
  afterNextRender,
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
import {ICompanyRequest} from '../../interfaces/companies-interfaces';
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
  styleUrl: './company.component.scss'
})
export class CompanyComponent implements OnInit {
  store = inject(CompaniesStore);
  id: InputSignal<number> = input(0);
  eoq: WritableSignal<boolean> = signal(false);
  formControls: AppFormControl<any>[] = [];
  isLoading: Observable<boolean>;
  annualDemand: number = 0;
  holdingCost: number = 0;
  predictedEoq = computed(() => {
    const selectedCompany = this.store.selectedCompany();
    if (!selectedCompany) return false
    return selectedCompany.predictedEoq
  })

  constructor() {
    this.isLoading = this.store.isLoading$;
    this.formControls = ListFormControls[ApiServiceEnum.COMPANY.toString()];
  }

  ngOnInit(): void {
    this.store.getCompany({companyId: this.id()})
  }

  showEOQ() {
    this.eoq.set(!this.eoq());
  }

  onSubmit(companyReq: Partial<ICompanyRequest>) {
    this.annualDemand = companyReq.annualDemand ? companyReq.annualDemand : 0;
    this.holdingCost = companyReq.holdingCost ? companyReq.holdingCost : 0;
    this.store.getCompany({companyId: this.id(), ...companyReq});
  }

}
