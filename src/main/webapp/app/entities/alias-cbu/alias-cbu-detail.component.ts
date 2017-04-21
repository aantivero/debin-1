import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { AliasCBU } from './alias-cbu.model';
import { AliasCBUService } from './alias-cbu.service';

@Component({
    selector: 'jhi-alias-cbu-detail',
    templateUrl: './alias-cbu-detail.component.html'
})
export class AliasCBUDetailComponent implements OnInit, OnDestroy {

    aliasCBU: AliasCBU;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private aliasCBUService: AliasCBUService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['aliasCBU', 'moneda']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAliasCBUS();
    }

    load(id) {
        this.aliasCBUService.find(id).subscribe((aliasCBU) => {
            this.aliasCBU = aliasCBU;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAliasCBUS() {
        this.eventSubscriber = this.eventManager.subscribe('aliasCBUListModification', (response) => this.load(this.aliasCBU.id));
    }
}
