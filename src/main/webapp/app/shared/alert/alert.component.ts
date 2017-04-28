import { Component, OnDestroy, OnInit } from '@angular/core';
import {AlertService, EventManager} from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'jhi-alert',
    template: `
        <div class="alerts alert-info " role="alert">
            <div *ngFor="let alert of alerts" [ngClass]="{\'alert.position\': true, \'toast\': alert.toast}">
                <ngb-alert [type]="alert.type" (close)="alert.close(alerts)"><pre [innerHTML]="alert.msg"></pre></ngb-alert>
            </div>
        </div>`
})
export class JhiAlertComponent implements OnInit, OnDestroy {
    alerts: any[];
    cleanLoginListener: Subscription;

    constructor(private alertService: AlertService, private eventManager: EventManager) {
        this.alerts = [];
        this.cleanLoginListener = eventManager.subscribe('debin1App.loginMessage', (response) => {
            console.log('notificacion en alert', response);
            console.log(response.content);
            this.alerts.push(
                this.alertService.addAlert(
                    {
                        type: 'info',
                        msg: 'mensajes.welcome',
                        params: {
                            user: response.content
                        },
                        timeout: 7000,
                        toast: this.alertService.isToast(),
                        scoped: true
                    },
                    this.alerts
                )
            );
        });
    }

    ngOnInit() {
        console.log('nada');
        // this.alerts = this.alertService.get();
    }

    ngOnDestroy() {
        if (this.cleanLoginListener !== undefined && this.cleanLoginListener !== null) {
            this.eventManager.destroy(this.cleanLoginListener);
            this.alerts = [];
        }
    }

}
