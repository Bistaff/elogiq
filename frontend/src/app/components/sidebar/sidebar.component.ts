import {Component, Inject, inject, PLATFORM_ID} from '@angular/core';
import {ApiModels} from '../../models/api-models';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {IApiModelObject} from '../../interfaces/api-interfaces';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {AppStore} from '../../stores/app.store';
import {ApiServiceEnum} from '../../enums/api-enums';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly store = inject(AppStore);
  readonly router: Router = inject(Router);
  public menuItems: Partial<IApiModelObject>[] = [];
  currentPage: string = ApiServiceEnum.DASHBOARD;

  constructor() {
    let url = this.router.url.split('/')[1];
    this.menuItems = Object.keys(ApiModels)
      .map(k => {
        let page = ApiModels[k as keyof typeof ApiModels];
        this.currentPage = url.includes(k) ? k : this.currentPage;
        return page;
      })
      .filter(item => item.showInApp);
  }

  changeCurrentPage(pageEnum: string | undefined) {
    if (!pageEnum) return;
    this.currentPage = pageEnum;
    this.store.changeCurrentPage(pageEnum);
  }

  logout() {
    this.store.logoutUser({});
  }
}
