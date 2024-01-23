import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Catproductos, Empleados, ListEmpleados } from 'src/app/models/rrhh';
import { FormularioService } from '../services/formulario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ResultadoModelo} from './../../models/rrhh'
import Swal from 'sweetalert2';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  
  public EventRefresh : EventEmitter<any> = new EventEmitter();
  
  // Datos de formulario.
  public FormEmpleado! : FormGroup;
  
  public Empleado : ListEmpleados = {} as ListEmpleados;
  public tituloSeccion : string = "";

  
  public catPuesto : Catproductos[] =[]
  
  constructor(public bsModalRef: BsModalRef, 
    private servicio : FormularioService, 
    private fb : FormBuilder
  ){
    this.FormEmpleado = this.fb.group({
      Codigo : null, 
      Dpi : [null, Validators.required], 
      Primer_nombre : [null, Validators.required], 
      Segundo_nombre : null, 
      Tercer_nombre : null, 
      Primer_apellido : [null, Validators.required], 
      Segundo_apellido : null, 
      Telefono : null, 
      Movil : [null, Validators.required], 
      Nit : null, 
      No_igss : null, 
      No_irtra : null, 
      Pasaporte : null, 
      Correo_personal : null, 
      Correo_institucional : null, 
      Emergencia_nombre : null, 
      Emergencia_contacto : null, 
      Fecha_ingreso : null, 
      Fecha_nacimiento : null, 
      Genero : [null, Validators.required], 
      Direccion : [null, Validators.required], 
      Zona : [null, Validators.required], 
      Id_puesto : [null, Validators.required],
      Salario : null
     })
  }
  
  get Codigo() { return this.FormEmpleado.get('Codigo'); }    
  public get Dpi() { return this.FormEmpleado.get('Dpi'); } 
  get Primer_nombre() { return this.FormEmpleado.get('Primer_nombre'); } 
  get Segundo_nombre() { return this.FormEmpleado.get('Segundo_nombre'); } 
  get Tercer_nombre() { return this.FormEmpleado.get('Tercer_nombre'); } 
  get Primer_apellido() { return this.FormEmpleado.get('Primer_apellido'); } 
  get Segundo_apellido() { return this.FormEmpleado.get('Segundo_apellido'); } 
  get Telefono() { return this.FormEmpleado.get('Telefono'); } 
  get Movil() { return this.FormEmpleado.get('Movil'); } 
  get Nit() { return this.FormEmpleado.get('Nit'); } 
  get No_igss() { return this.FormEmpleado.get('No_igss'); } 
  get No_irtra() { return this.FormEmpleado.get('No_irtra'); } 
  get Pasaporte() { return this.FormEmpleado.get('Pasaporte'); } 
  get Correo_personal() { return this.FormEmpleado.get('Correo_personal'); } 
  get Correo_institucional() { return this.FormEmpleado.get('Correo_institucional'); } 
  get Emergencia_nombre() { return this.FormEmpleado.get('Emergencia_nombre'); } 
  get Emergencia_contacto() { return this.FormEmpleado.get('Emergencia_contacto'); } 
  get Fecha_ingreso() { return this.FormEmpleado.get('Fecha_ingreso'); } 
  get Fecha_nacimiento() { return this.FormEmpleado.get('Fecha_nacimiento'); } 
  get Genero() { return this.FormEmpleado.get('Genero'); } 
  get Direccion() { return this.FormEmpleado.get('Direccion'); } 
  get Zona() { return this.FormEmpleado.get('Zona'); } 
  get Id_puesto() { return this.FormEmpleado.get('Id_puesto'); } 
  get Salario() { return this.FormEmpleado.get('Salario'); }  

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.catalogos();   
    this.Empleado ? this.asignarValoresFormulario() : null 
  }

  catalogos(){
    this.servicio.getCatProducto().subscribe( data => {
        this.catPuesto = data
    })
  }

  asignarValoresFormulario(){
    this.FormEmpleado.patchValue(this.Empleado)

    let FechaCumple, FechaIngreso, Salario

    this.Empleado.Fecha_ingreso ? FechaIngreso = new Date(this.Empleado.Fecha_ingreso) : FechaIngreso = null;
    this.Empleado.Fecha_nacimiento ? FechaCumple = new Date(this.Empleado.Fecha_nacimiento) : FechaCumple = null;
    this.Fecha_ingreso?.setValue(FechaIngreso);
    this.Fecha_nacimiento?.setValue(FechaCumple);
    this.Empleado.Salario ? Salario = formatNumber(Number(this.Empleado.Salario), 'en-US', '1.2') : Salario = null;
    this.Salario?.setValue(Salario)

  }

  SaveForm(){

    if(this.FormEmpleado.valid){
      console.log( "Formulario ", this.FormEmpleado);   
    const v_empleado: Empleados = { 
      Codigo : this.Empleado.Codigo ? this.Empleado.Codigo : 0,     
      Dpi : this.Dpi?.value ?this.Dpi?.value : '',
      Primer_nombre : this.Primer_nombre?.value ? this.Primer_nombre?.value : ""  ,
      Segundo_nombre : this.Segundo_nombre?.value ? this.Segundo_nombre?.value : ""  ,
      Tercer_nombre : this.Tercer_nombre?.value ? this.Tercer_nombre?.value : ""  ,
      Primer_apellido : this.Primer_apellido?.value ? this.Primer_apellido?.value : ""  ,
      Segundo_apellido : this.Segundo_apellido?.value ? this.Segundo_apellido?.value : ""  ,
      Telefono : this.Telefono?.value ? this.Telefono?.value : ""  ,
      Movil : this.Movil?.value ? this.Movil?.value : ""  ,
      Nit : this.Nit?.value ? this.Nit?.value : ""  ,
      No_igss:  this.No_igss?.value ? this.No_igss?.value : "" ,
      No_irtra:  this.No_irtra?.value ? this.No_irtra?.value : "" ,
      Salario:  this.Salario?.value ? this.Salario?.value.replace(/,/g, '') : "" ,
      Pasaporte : this.Pasaporte?.value ? this.Pasaporte?.value : ""  ,
      Correo_personal : this.Correo_personal?.value ? this.Correo_personal?.value : ""  ,
      Correo_institucional : this.Correo_institucional?.value ? this.Correo_institucional?.value : ""  ,
      Emergencia_nombre : this.Emergencia_nombre?.value ? this.Emergencia_nombre?.value : ""  ,
      Emergencia_contacto : this.Emergencia_contacto?.value ? this.Emergencia_contacto?.value : ""  ,
      Fecha_ingreso : this.Fecha_ingreso?.value ? (this.Fecha_ingreso?.value).toLocaleDateString() : ""  ,
      Fecha_nacimiento:  this.Fecha_nacimiento?.value ? (this.Fecha_nacimiento?.value).toLocaleDateString() : "" ,
      Genero:  this.Genero?.value ? this.Genero?.value : "" ,
      Id_puesto :  this.Id_puesto?.value ? this.Id_puesto?.value : ""  ,
      Direccion : this.Direccion?.value ? this.Direccion?.value : ""  ,
      Zona : this.Zona?.value ? this.Zona?.value : ""  ,
      Estado : 1
    } 
    console.log("Datos recibidos ", this.Empleado)
    console.log("Datos ya Ingresados ", v_empleado);
    
    if(this.Empleado.Codigo){      
      this.servicio.UpEmpleados(v_empleado).subscribe( data => {
        this.mostrarSweetAlert(data)      
      })
    }else{
      this.servicio.InEmpleados(v_empleado).subscribe( data => {
        this.mostrarSweetAlert(data)      
      })
    }
    this.EventRefresh.emit(true);
    this.bsModalRef.hide()
    }else{
      console.log(this.Genero);
      
      this.Genero?.markAsTouched()
      this.Direccion?.markAsTouched()
      this.Zona?.markAsTouched()
      this.Id_puesto?.markAsTouched()
      this.Dpi?.markAsTouched()
      this.Primer_nombre?.markAsTouched()
      this.Primer_apellido?.markAsTouched()
      this.Movil?.markAsTouched()
      console.log(this.Genero);
    }

        
  }

  soloNumerosEnteros(evt: any, name: any){
    const inputValue = (evt.target as HTMLInputElement).value;
    var indexNumber:number = inputValue.indexOf(".",0)
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57) || (indexNumber > -1 && charCode==46)) {
      evt.preventDefault();
    }
  }

  CerrarModal(){
    this.EventRefresh.emit(false)
    this.bsModalRef.hide()
  }

  formatoDecimales (evt:any, name:any) {
    const inputValue = (evt.target as HTMLInputElement).value;
    if(inputValue){
      let valorLimpiado = inputValue.replace(/,/g, '');
      let valorFormateado = formatNumber(Number(valorLimpiado), 'en-US', '1.2');
      this.FormEmpleado.controls[name].setValue(valorFormateado)
      return valorFormateado;
    }else{
      this.FormEmpleado.controls[name].setValue(null)
      return null;
    }

  }

  mostrarSweetAlert(response: ResultadoModelo) {
    Swal.fire({
      title: response.Titulo,
      icon: response.Icono,
      html: response.Mensaje,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    })
  }
 
}
