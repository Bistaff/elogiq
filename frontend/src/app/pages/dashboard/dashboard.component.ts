import {ChangeDetectionStrategy, Component, inject, Inject, PLATFORM_ID} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {filter} from 'rxjs';
import {CommonModule, isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    RouterLink,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  readonly router: Router = inject(Router);
  pages: {text: string, route: string}[] = [];

  constructor() {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
      ).subscribe((res) => {
        let lastRoute = ""
        let routes = [{text: "Home", route:  "home"}]
        if (res.url === '/home') {
          this.pages = routes;
          return;
        }
        res.url.split("/").filter(r => r !== "").forEach(r => {
          routes = [...routes, {text: r, route: lastRoute + r + "/"}]
        })
        this.pages = routes;
      });
  }
}
