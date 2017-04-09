import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Banco } from './banco.model';
import { BancoService } from './banco.service';

@Component({
    selector: 'jhi-banco-detail',
    templateUrl: './banco-detail.component.html'
})
export class BancoDetailComponent implements OnInit, OnDestroy {

    banco: Banco;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private bancoService: BancoService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['banco']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInBancos();
    }

    load (id) {
        this.bancoService.find(id).subscribe(banco => {
            this.banco = banco;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBancos() {
        this.eventSubscriber = this.eventManager.subscribe('bancoListModification', response => this.load(this.banco.id));
    }

}
