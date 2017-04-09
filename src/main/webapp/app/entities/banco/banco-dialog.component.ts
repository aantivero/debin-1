import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Banco } from './banco.model';
import { BancoPopupService } from './banco-popup.service';
import { BancoService } from './banco.service';

@Component({
    selector: 'jhi-banco-dialog',
    templateUrl: './banco-dialog.component.html'
})
export class BancoDialogComponent implements OnInit {

    banco: Banco;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private bancoService: BancoService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['banco']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.banco.id !== undefined) {
            this.bancoService.update(this.banco)
                .subscribe((res: Banco) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.bancoService.create(this.banco)
                .subscribe((res: Banco) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: Banco) {
        this.eventManager.broadcast({ name: 'bancoListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-banco-popup',
    template: ''
})
export class BancoPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private bancoPopupService: BancoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.bancoPopupService
                    .open(BancoDialogComponent, params['id']);
            } else {
                this.modalRef = this.bancoPopupService
                    .open(BancoDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
