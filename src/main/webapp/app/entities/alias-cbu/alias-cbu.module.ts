import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Debin1SharedModule } from '../../shared';
import { Debin1AdminModule } from '../../admin/admin.module';

import {
    AliasCBUService,
    AliasCBUPopupService,
    AliasCBUComponent,
    AliasCBUDetailComponent,
    AliasCBUDialogComponent,
    AliasCBUPopupComponent,
    AliasCBUDeletePopupComponent,
    AliasCBUDeleteDialogComponent,
    aliasCBURoute,
    aliasCBUPopupRoute,
} from './';

let ENTITY_STATES = [
    ...aliasCBURoute,
    ...aliasCBUPopupRoute,
];

@NgModule({
    imports: [
        Debin1SharedModule,
        Debin1AdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AliasCBUComponent,
        AliasCBUDetailComponent,
        AliasCBUDialogComponent,
        AliasCBUDeleteDialogComponent,
        AliasCBUPopupComponent,
        AliasCBUDeletePopupComponent,
    ],
    entryComponents: [
        AliasCBUComponent,
        AliasCBUDialogComponent,
        AliasCBUPopupComponent,
        AliasCBUDeleteDialogComponent,
        AliasCBUDeletePopupComponent,
    ],
    providers: [
        AliasCBUService,
        AliasCBUPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Debin1AliasCBUModule {}
