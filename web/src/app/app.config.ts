import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    MessageService,
    provideHttpClient(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Lara
      },
    }),
  ],
};
