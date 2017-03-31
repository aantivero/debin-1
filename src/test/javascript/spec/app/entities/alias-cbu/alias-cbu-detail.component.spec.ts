import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AliasCBUDetailComponent } from '../../../../../../main/webapp/app/entities/alias-cbu/alias-cbu-detail.component';
import { AliasCBUService } from '../../../../../../main/webapp/app/entities/alias-cbu/alias-cbu.service';
import { AliasCBU } from '../../../../../../main/webapp/app/entities/alias-cbu/alias-cbu.model';

describe('Component Tests', () => {

    describe('AliasCBU Management Detail Component', () => {
        let comp: AliasCBUDetailComponent;
        let fixture: ComponentFixture<AliasCBUDetailComponent>;
        let service: AliasCBUService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [AliasCBUDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    AliasCBUService
                ]
            }).overrideComponent(AliasCBUDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AliasCBUDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AliasCBUService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AliasCBU(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.aliasCBU).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
