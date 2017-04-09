import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { Debin1TestModule } from '../../../test.module';
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
                imports: [Debin1TestModule],
                declarations: [AliasCBUDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AliasCBUService,
                    EventManager
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
