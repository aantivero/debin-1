import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Debin } from './debin.model';
import { DebinService } from './debin.service';

@Component({
    selector: 'jhi-debin-detail',
    templateUrl: './debin-detail.component.html'
})
export class DebinDetailComponent implements OnInit, OnDestroy {

    debin: Debin;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private debinService: DebinService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['debin']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDebins();
    }

    load(id) {
        this.debinService.find(id).subscribe((debin) => {
            this.debin = debin;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDebins() {
        this.eventSubscriber = this.eventManager.subscribe('debinListModification', (response) => this.load(this.debin.id));
    }
}
