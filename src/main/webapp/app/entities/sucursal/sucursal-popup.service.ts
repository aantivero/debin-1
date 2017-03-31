import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Sucursal } from './sucursal.model';
import { SucursalService } from './sucursal.service';
@Injectable()
export class SucursalPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private sucursalService: SucursalService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.sucursalService.find(id).subscribe(sucursal => {
                this.sucursalModalRef(component, sucursal);
            });
        } else {
            return this.sucursalModalRef(component, new Sucursal());
        }
    }

    sucursalModalRef(component: Component, sucursal: Sucursal): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sucursal = sucursal;
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
