import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { SucursalComponent } from './sucursal.component';
import { SucursalDetailComponent } from './sucursal-detail.component';
import { SucursalPopupComponent } from './sucursal-dialog.component';
import { SucursalDeletePopupComponent } from './sucursal-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class SucursalResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      let sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const sucursalRoute: Routes = [
  {
    path: 'sucursal',
    component: SucursalComponent,
    resolve: {
      'pagingParams': SucursalResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.sucursal.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'sucursal/:id',
    component: SucursalDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.sucursal.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sucursalPopupRoute: Routes = [
  {
    path: 'sucursal-new',
    component: SucursalPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.sucursal.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sucursal/:id/edit',
    component: SucursalPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.sucursal.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sucursal/:id/delete',
    component: SucursalDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.sucursal.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
