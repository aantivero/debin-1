import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InfoComponent } from './info.component';

export const infoRoute: Route = {
  path: 'info',
  component: InfoComponent,
  data: {
    authorities: [],
    pageTitle: 'info.title'
  },
  canActivate: [UserRouteAccessService]
};
