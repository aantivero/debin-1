import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Debin1SharedModule } from '../../shared';

import {
    DebinService,
    DebinPopupService,
    DebinComponent,
    DebinDetailComponent,
    DebinDialogComponent,
    DebinPopupComponent,
    DebinDeletePopupComponent,
    DebinDeleteDialogComponent,
    debinRoute,
    debinPopupRoute,
    DebinResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...debinRoute,
    ...debinPopupRoute,
];

@NgModule({
    imports: [
        Debin1SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DebinComponent,
        DebinDetailComponent,
        DebinDialogComponent,
        DebinDeleteDialogComponent,
        DebinPopupComponent,
        DebinDeletePopupComponent,
    ],
    entryComponents: [
        DebinComponent,
        DebinDialogComponent,
        DebinPopupComponent,
        DebinDeleteDialogComponent,
        DebinDeletePopupComponent,
    ],
    providers: [
        DebinService,
        DebinPopupService,
        DebinResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Debin1DebinModule {}
