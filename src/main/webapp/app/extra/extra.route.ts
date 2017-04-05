import { Routes } from '@angular/router';

import {
    infoRoute
} from './';

let EXTRA_ROUTES = [
   infoRoute
];

export const extraState: Routes = [{
    path: '',
    children: EXTRA_ROUTES
}];
