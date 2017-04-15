import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Debin } from './debin.model';
import { DebinService } from './debin.service';
@Injectable()
export class DebinPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private debinService: DebinService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.debinService.find(id).subscribe(debin => {
                debin.desde = this.datePipe
                    .transform(debin.desde, 'yyyy-MM-ddThh:mm');
                debin.hasta = this.datePipe
                    .transform(debin.hasta, 'yyyy-MM-ddThh:mm');
                this.debinModalRef(component, debin);
            });
        } else {
            return this.debinModalRef(component, new Debin());
        }
    }

    debinModalRef(component: Component, debin: Debin): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.debin = debin;
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
