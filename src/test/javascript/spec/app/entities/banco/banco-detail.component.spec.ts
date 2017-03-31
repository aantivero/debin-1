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
import { BancoDetailComponent } from '../../../../../../main/webapp/app/entities/banco/banco-detail.component';
import { BancoService } from '../../../../../../main/webapp/app/entities/banco/banco.service';
import { Banco } from '../../../../../../main/webapp/app/entities/banco/banco.model';

describe('Component Tests', () => {

    describe('Banco Management Detail Component', () => {
        let comp: BancoDetailComponent;
        let fixture: ComponentFixture<BancoDetailComponent>;
        let service: BancoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [BancoDetailComponent],
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
                    BancoService
                ]
            }).overrideComponent(BancoDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BancoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BancoService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Banco(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.banco).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
