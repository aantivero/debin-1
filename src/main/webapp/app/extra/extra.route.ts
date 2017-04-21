import { Routes } from '@angular/router';

import {
    infoRoute
} from './';

const EXTRA_ROUTES = [
   infoRoute
];

export const extraState: Routes = [{
    path: '',
    children: EXTRA_ROUTES
}];
