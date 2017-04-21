import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DebinComponent } from './debin.component';
import { DebinDetailComponent } from './debin-detail.component';
import { DebinPopupComponent } from './debin-dialog.component';
import { DebinDeletePopupComponent } from './debin-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class DebinResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const debinRoute: Routes = [
  {
    path: 'debin',
    component: DebinComponent,
    resolve: {
      'pagingParams': DebinResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.debin.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'debin/:id',
    component: DebinDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.debin.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const debinPopupRoute: Routes = [
  {
    path: 'debin-new',
    component: DebinPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.debin.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'debin/:id/edit',
    component: DebinPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.debin.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'debin/:id/delete',
    component: DebinDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'debin1App.debin.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
