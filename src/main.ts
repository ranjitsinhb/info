import { enableProdMode } from '@angular/core';
//import './assets/css/bootstrap-reboot.css';
//import './assets/css/bootstrap.css';
//import './assets/css/bootstrap-grid.css';
//import './assets/css/reset.css';
//import './assets/css/color.css';
import './vendor';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
