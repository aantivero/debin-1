import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { AliasCBU } from './alias-cbu.model';
import { AliasCBUPopupService } from './alias-cbu-popup.service';
import { AliasCBUService } from './alias-cbu.service';
import { Sucursal, SucursalService } from '../sucursal';
import { Banco, BancoService } from '../banco';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-alias-cbu-dialog',
    templateUrl: './alias-cbu-dialog.component.html'
})
export class AliasCBUDialogComponent implements OnInit {

    aliasCBU: AliasCBU;
    authorities: any[];
    isSaving: boolean;

    sucursals: Sucursal[];

    bancos: Banco[];

    users: User[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private aliasCBUService: AliasCBUService,
        private sucursalService: SucursalService,
        private bancoService: BancoService,
        private userService: UserService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['aliasCBU']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.sucursalService.query({filter: 'aliascbu-is-null'}).subscribe((res: Response) => {
            if (!this.aliasCBU.sucursal || !this.aliasCBU.sucursal.id) {
                this.sucursals = res.json();
            } else {
                this.sucursalService.find(this.aliasCBU.sucursal.id).subscribe((subRes: Sucursal) => {
                    this.sucursals = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.bancoService.query({filter: 'aliascbu-is-null'}).subscribe((res: Response) => {
            if (!this.aliasCBU.banco || !this.aliasCBU.banco.id) {
                this.bancos = res.json();
            } else {
                this.bancoService.find(this.aliasCBU.banco.id).subscribe((subRes: Banco) => {
                    this.bancos = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.aliasCBU.id !== undefined) {
            this.aliasCBUService.update(this.aliasCBU)
                .subscribe((res: AliasCBU) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.aliasCBUService.create(this.aliasCBU)
                .subscribe((res: AliasCBU) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: AliasCBU) {
        this.eventManager.broadcast({ name: 'aliasCBUListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackSucursalById(index: number, item: Sucursal) {
        return item.id;
    }

    trackBancoById(index: number, item: Banco) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-alias-cbu-popup',
    template: ''
})
export class AliasCBUPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private aliasCBUPopupService: AliasCBUPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.aliasCBUPopupService
                    .open(AliasCBUDialogComponent, params['id']);
            } else {
                this.modalRef = this.aliasCBUPopupService
                    .open(AliasCBUDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
