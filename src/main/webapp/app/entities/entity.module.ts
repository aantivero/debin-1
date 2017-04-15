import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Debin1AliasCBUModule } from './alias-cbu/alias-cbu.module';
import { Debin1BancoModule } from './banco/banco.module';
import { Debin1SucursalModule } from './sucursal/sucursal.module';
import { Debin1DebinModule } from './debin/debin.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Debin1AliasCBUModule,
        Debin1BancoModule,
        Debin1SucursalModule,
        Debin1DebinModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Debin1EntityModule {}
