import {Component, inject, OnInit} from '@angular/core';
import {CompaniesStore} from '../../stores/companies.store';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-companies',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './companies.component.html',
  standalone: true,
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit {
  readonly router: Router = inject(Router);
  store = inject(CompaniesStore);

  constructor() { }

  ngOnInit(): void {
    this.store.getCompanies();
  }

}
