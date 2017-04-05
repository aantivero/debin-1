import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Debin1SharedModule } from '../shared';

import {InfoComponent, extraState} from './';

@NgModule({
    imports: [
        Debin1SharedModule,
        RouterModule.forRoot(extraState, { useHash: true })
    ],
    declarations: [
        InfoComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Debin1ExtraModule {}