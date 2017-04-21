import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { Debin1SharedModule, UserRouteAccessService } from './shared';
import { Debin1HomeModule } from './home/home.module';
import { Debin1AdminModule } from './admin/admin.module';
import { Debin1AccountModule } from './account/account.module';
import { Debin1EntityModule } from './entities/entity.module';
import { Debin1ExtraModule} from './extra/extra.module';

import { LayoutRoutingModule } from './layouts';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        Debin1SharedModule,
        Debin1HomeModule,
        Debin1AdminModule,
        Debin1AccountModule,
        Debin1EntityModule,
        Debin1ExtraModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class Debin1AppModule {}
