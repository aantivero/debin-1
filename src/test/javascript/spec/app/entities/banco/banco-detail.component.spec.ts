import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { Debin1TestModule } from '../../../test.module';
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
                imports: [Debin1TestModule],
                declarations: [BancoDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BancoService,
                    EventManager
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
