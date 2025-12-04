import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./them-toggle.component.html`,
})
export class ThemeToggleComponent {
  theme$: Observable<'light' | 'dark'>;

  constructor(private theme: ThemeService) {
    this.theme$ = this.theme.theme$;
  }

  toggle() {
    this.theme.toggle();
  }
}
