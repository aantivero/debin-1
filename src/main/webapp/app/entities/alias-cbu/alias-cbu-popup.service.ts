import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AliasCBU } from './alias-cbu.model';
import { AliasCBUService } from './alias-cbu.service';
@Injectable()
export class AliasCBUPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private aliasCBUService: AliasCBUService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.aliasCBUService.find(id).subscribe(aliasCBU => {
                this.aliasCBUModalRef(component, aliasCBU);
            });
        } else {
            return this.aliasCBUModalRef(component, new AliasCBU());
        }
    }

    aliasCBUModalRef(component: Component, aliasCBU: AliasCBU): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.aliasCBU = aliasCBU;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
