import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor.fn';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // 👇 Detta registrerar din interceptor
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
