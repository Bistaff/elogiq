import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppStore} from './stores/app.store';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  providers: [
    AppStore
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'frontend';
}
