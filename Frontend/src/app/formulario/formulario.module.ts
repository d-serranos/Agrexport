import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioRoutingModule } from './formulario-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
defineLocale('es', esLocale);
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    HomeComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormularioRoutingModule,
    ModalModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
  ]
})
export class FormularioModule {

  constructor( private bsLocaleService: BsLocaleService){
    this.bsLocaleService.use('es');//fecha en español, datepicker
  }
 }
