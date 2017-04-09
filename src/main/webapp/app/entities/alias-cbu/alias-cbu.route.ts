import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AliasCBUComponent } from './alias-cbu.component';
import { AliasCBUDetailComponent } from './alias-cbu-detail.component';
import { AliasCBUPopupComponent } from './alias-cbu-dialog.component';
import { AliasCBUDeletePopupComponent } from './alias-cbu-delete-dialog.component';

import { Principal } from '../../shared';


export const aliasCBURoute: Routes = [
  {
    path: 'alias-cbu',
    component: AliasCBUComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.aliasCBU.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'alias-cbu/:id',
    component: AliasCBUDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.aliasCBU.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const aliasCBUPopupRoute: Routes = [
  {
    path: 'alias-cbu-new',
    component: AliasCBUPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.aliasCBU.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'alias-cbu/:id/edit',
    component: AliasCBUPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.aliasCBU.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'alias-cbu/:id/delete',
    component: AliasCBUDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.aliasCBU.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
