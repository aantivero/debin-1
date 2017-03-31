import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Debin1SharedModule } from '../../shared';

import {
    SucursalService,
    SucursalPopupService,
    SucursalComponent,
    SucursalDetailComponent,
    SucursalDialogComponent,
    SucursalPopupComponent,
    SucursalDeletePopupComponent,
    SucursalDeleteDialogComponent,
    sucursalRoute,
    sucursalPopupRoute,
    SucursalResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...sucursalRoute,
    ...sucursalPopupRoute,
];

@NgModule({
    imports: [
        Debin1SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SucursalComponent,
        SucursalDetailComponent,
        SucursalDialogComponent,
        SucursalDeleteDialogComponent,
        SucursalPopupComponent,
        SucursalDeletePopupComponent,
    ],
    entryComponents: [
        SucursalComponent,
        SucursalDialogComponent,
        SucursalPopupComponent,
        SucursalDeleteDialogComponent,
        SucursalDeletePopupComponent,
    ],
    providers: [
        SucursalService,
        SucursalPopupService,
        SucursalResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Debin1SucursalModule {}
