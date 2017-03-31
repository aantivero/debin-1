import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Banco } from './banco.model';
import { BancoService } from './banco.service';

@Component({
    selector: 'jhi-banco-detail',
    templateUrl: './banco-detail.component.html'
})
export class BancoDetailComponent implements OnInit, OnDestroy {

    banco: Banco;
    private subscription: any;

    constructor(
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
    }

}
