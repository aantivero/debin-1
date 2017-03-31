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
import { SucursalDetailComponent } from '../../../../../../main/webapp/app/entities/sucursal/sucursal-detail.component';
import { SucursalService } from '../../../../../../main/webapp/app/entities/sucursal/sucursal.service';
import { Sucursal } from '../../../../../../main/webapp/app/entities/sucursal/sucursal.model';

describe('Component Tests', () => {

    describe('Sucursal Management Detail Component', () => {
        let comp: SucursalDetailComponent;
        let fixture: ComponentFixture<SucursalDetailComponent>;
        let service: SucursalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [SucursalDetailComponent],
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
                    SucursalService
                ]
            }).overrideComponent(SucursalDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SucursalDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SucursalService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Sucursal(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.sucursal).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
