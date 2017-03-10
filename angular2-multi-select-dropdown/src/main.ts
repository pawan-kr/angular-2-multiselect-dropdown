import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app';

export function run(appLocalized: any) {
  platformBrowserDynamic()
    .bootstrapModule(AppModule);
}