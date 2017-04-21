import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';

import { LoginModalService } from '../../shared';

@Component({
  selector: 'jhi-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit, AfterViewInit {
    modalRef: NgbModalRef;
  constructor(private loginModalService: LoginModalService, private languageService: JhiLanguageService) {
      this.languageService.setLocations(['info']);
  }

  ngOnInit() {
  }

  openLogin() {
    this.modalRef = this.loginModalService.open();
  }

  ngAfterViewInit() {

  }
}
