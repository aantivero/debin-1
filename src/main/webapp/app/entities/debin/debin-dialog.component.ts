import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Debin } from './debin.model';
import { DebinPopupService } from './debin-popup.service';
import { DebinService } from './debin.service';
import { AliasCBU, AliasCBUService } from '../alias-cbu';

@Component({
    selector: 'jhi-debin-dialog',
    templateUrl: './debin-dialog.component.html'
})
export class DebinDialogComponent implements OnInit {

    debin: Debin;
    authorities: any[];
    isSaving: boolean;

    aliascbus: AliasCBU[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private debinService: DebinService,
        private aliasCBUService: AliasCBUService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['debin']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.aliasCBUService.query().subscribe(
            (res: Response) => { this.aliascbus = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.debin.id !== undefined) {
            this.debinService.update(this.debin)
                .subscribe((res: Debin) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.debinService.create(this.debin)
                .subscribe((res: Debin) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: Debin) {
        this.eventManager.broadcast({ name: 'debinListModification', content: 'OK'});
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

    trackAliasCBUById(index: number, item: AliasCBU) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-debin-popup',
    template: ''
})
export class DebinPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private debinPopupService: DebinPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.debinPopupService
                    .open(DebinDialogComponent, params['id']);
            } else {
                this.modalRef = this.debinPopupService
                    .open(DebinDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
