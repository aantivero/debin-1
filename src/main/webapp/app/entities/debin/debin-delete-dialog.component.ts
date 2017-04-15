import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Debin } from './debin.model';
import { DebinPopupService } from './debin-popup.service';
import { DebinService } from './debin.service';

@Component({
    selector: 'jhi-debin-delete-dialog',
    templateUrl: './debin-delete-dialog.component.html'
})
export class DebinDeleteDialogComponent {

    debin: Debin;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private debinService: DebinService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['debin']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.debinService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'debinListModification',
                content: 'Deleted an debin'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-debin-delete-popup',
    template: ''
})
export class DebinDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private debinPopupService: DebinPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.debinPopupService
                .open(DebinDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
