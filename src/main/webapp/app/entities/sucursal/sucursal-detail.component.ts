import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Sucursal } from './sucursal.model';
import { SucursalService } from './sucursal.service';

@Component({
    selector: 'jhi-sucursal-detail',
    templateUrl: './sucursal-detail.component.html'
})
export class SucursalDetailComponent implements OnInit, OnDestroy {

    sucursal: Sucursal;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private sucursalService: SucursalService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['sucursal']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.sucursalService.find(id).subscribe(sucursal => {
            this.sucursal = sucursal;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
