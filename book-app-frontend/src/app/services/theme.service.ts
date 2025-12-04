import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly KEY = 'theme';
  private themeSubject = new BehaviorSubject<Theme>(this.getInitialTheme());
  theme$ = this.themeSubject.asObservable();

  constructor() {
    // Apply initial theme to <html> immediately
    this.applyTheme(this.themeSubject.value);

    // Optional: react to system changes (prefers-color-scheme)
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', (e) => {
      const saved = localStorage.getItem(this.KEY);
      if (!saved) {
        const newTheme: Theme = e.matches ? 'dark' : 'light';
        this.setTheme(newTheme);
      }
    });
  }

  private getInitialTheme(): Theme {
    const saved = localStorage.getItem(this.KEY) as Theme | null;
    if (saved === 'dark' || saved === 'light') return saved;
    // fallback to system preference
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  setTheme(theme: Theme) {
    localStorage.setItem(this.KEY, theme);
    this.themeSubject.next(theme);
    this.applyTheme(theme);
  }

  toggle() {
    const next: Theme = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  current(): Theme {
    return this.themeSubject.value;
  }

  private applyTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
}
