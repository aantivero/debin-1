import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { AliasCBU } from './alias-cbu.model';
import { AliasCBUPopupService } from './alias-cbu-popup.service';
import { AliasCBUService } from './alias-cbu.service';

@Component({
    selector: 'jhi-alias-cbu-delete-dialog',
    templateUrl: './alias-cbu-delete-dialog.component.html'
})
export class AliasCBUDeleteDialogComponent {

    aliasCBU: AliasCBU;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private aliasCBUService: AliasCBUService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['aliasCBU']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.aliasCBUService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'aliasCBUListModification',
                content: 'Deleted an aliasCBU'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alias-cbu-delete-popup',
    template: ''
})
export class AliasCBUDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private aliasCBUPopupService: AliasCBUPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.aliasCBUPopupService
                .open(AliasCBUDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
