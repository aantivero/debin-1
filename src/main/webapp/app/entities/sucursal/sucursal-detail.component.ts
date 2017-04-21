import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Sucursal } from './sucursal.model';
import { SucursalService } from './sucursal.service';

@Component({
    selector: 'jhi-sucursal-detail',
    templateUrl: './sucursal-detail.component.html'
})
export class SucursalDetailComponent implements OnInit, OnDestroy {

    sucursal: Sucursal;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private sucursalService: SucursalService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['sucursal']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSucursals();
    }

    load(id) {
        this.sucursalService.find(id).subscribe((sucursal) => {
            this.sucursal = sucursal;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSucursals() {
        this.eventSubscriber = this.eventManager.subscribe('sucursalListModification', (response) => this.load(this.sucursal.id));
    }
}
