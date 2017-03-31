import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Sucursal } from './sucursal.model';
import { SucursalPopupService } from './sucursal-popup.service';
import { SucursalService } from './sucursal.service';

@Component({
    selector: 'jhi-sucursal-delete-dialog',
    templateUrl: './sucursal-delete-dialog.component.html'
})
export class SucursalDeleteDialogComponent {

    sucursal: Sucursal;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private sucursalService: SucursalService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['sucursal']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.sucursalService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sucursalListModification',
                content: 'Deleted an sucursal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sucursal-delete-popup',
    template: ''
})
export class SucursalDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private sucursalPopupService: SucursalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.sucursalPopupService
                .open(SucursalDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
