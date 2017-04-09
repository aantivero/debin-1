import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { Debin1TestModule } from '../../../test.module';
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
                imports: [Debin1TestModule],
                declarations: [SucursalDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SucursalService,
                    EventManager
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
