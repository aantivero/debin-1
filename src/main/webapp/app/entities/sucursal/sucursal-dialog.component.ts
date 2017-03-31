import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Sucursal } from './sucursal.model';
import { SucursalPopupService } from './sucursal-popup.service';
import { SucursalService } from './sucursal.service';
import { Banco, BancoService } from '../banco';

@Component({
    selector: 'jhi-sucursal-dialog',
    templateUrl: './sucursal-dialog.component.html'
})
export class SucursalDialogComponent implements OnInit {

    sucursal: Sucursal;
    authorities: any[];
    isSaving: boolean;

    bancos: Banco[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private sucursalService: SucursalService,
        private bancoService: BancoService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['sucursal']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.bancoService.query().subscribe(
            (res: Response) => { this.bancos = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.sucursal.id !== undefined) {
            this.sucursalService.update(this.sucursal)
                .subscribe((res: Sucursal) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.sucursalService.create(this.sucursal)
                .subscribe((res: Sucursal) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Sucursal) {
        this.eventManager.broadcast({ name: 'sucursalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackBancoById(index: number, item: Banco) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sucursal-popup',
    template: ''
})
export class SucursalPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private sucursalPopupService: SucursalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.sucursalPopupService
                    .open(SucursalDialogComponent, params['id']);
            } else {
                this.modalRef = this.sucursalPopupService
                    .open(SucursalDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
