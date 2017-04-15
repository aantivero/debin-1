import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { Debin1TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DebinDetailComponent } from '../../../../../../main/webapp/app/entities/debin/debin-detail.component';
import { DebinService } from '../../../../../../main/webapp/app/entities/debin/debin.service';
import { Debin } from '../../../../../../main/webapp/app/entities/debin/debin.model';

describe('Component Tests', () => {

    describe('Debin Management Detail Component', () => {
        let comp: DebinDetailComponent;
        let fixture: ComponentFixture<DebinDetailComponent>;
        let service: DebinService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Debin1TestModule],
                declarations: [DebinDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DebinService,
                    EventManager
                ]
            }).overrideComponent(DebinDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DebinDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DebinService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Debin(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.debin).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
