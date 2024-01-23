import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { FormularioService } from '../services/formulario.service';
import { Empleados, ListEmpleados } from 'src/app/models/rrhh';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  modalRef?: BsModalRef;
  
  public lstEmpleados : ListEmpleados[] = []
  private lstEmpleadosInit : ListEmpleados[] = []
  public Pages:number = 1;
  public criterioBusqueda:string = ""
  
  constructor(
    private modalService: BsModalService,
    private servicio : FormularioService    
  ){
     
  }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.ListEmpleados()
  }

  ListEmpleados(){
    this.servicio.getEmpleados().subscribe(data => {
      this.lstEmpleados = data
      this.lstEmpleadosInit = data
      //console.log("Resultados ", data);   
     }) 
  }
  


  showModal(item?:ListEmpleados){
    let titulo = ''
    item ? titulo = "Edición de Titular" : titulo = "Ingreso de Personal"
    let initialState = { Empleado: item ? item : {} as ListEmpleados, tituloSeccion: titulo };
    this.modalRef = this.modalService.show(ModalComponent, { initialState , class: "modal-xl modal-dialog-centered", backdrop  : 'static' })

    this.modalRef.content.EventRefresh.subscribe((refresh: boolean) =>
    {
      refresh ? this.ListEmpleados() : null
      
    });
  }

  EliminarRegistro(item:ListEmpleados){
    Swal.fire({
      title: 'Está seguro?',
      text: "Desea eliminar el registro de: " + item.Nombre_completo + ", de estar seguro de realizar la eliminación continue con el proceso",
      icon: 'warning',
      showCancelButton: true, cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Aceptar'
    }).then((result) =>
    {
      if (result.isConfirmed){
        this.servicio.DelEmpleados(item.Codigo).subscribe(data =>{
          data.Estado == "success" ? this.ListEmpleados() : null
        })
      }
    })
  }

  buscarCriterio(){
    var item = this.criterioBusqueda;
    const ListaPorFiltada = [...this.lstEmpleadosInit]
    var listaFiltrada = ListaPorFiltada.filter(
      function(element:any) {
        return element.Nombre_completo.toString().trim().toLowerCase().includes(
        item.toString().trim().toLowerCase()
      ) || element.Dpi.toString().trim().toLowerCase().includes(
        item.toString().trim().toLowerCase()
      ) || element.Genero.toString().trim().toLowerCase().includes(
        item.toString().trim().toLowerCase()
      ) || element.Nombre_puesto.toString().trim().toLowerCase().includes(
        item.toString().trim().toLowerCase()
      )
    })
    this.lstEmpleados = listaFiltrada;
    this.Pages =1;
  }

  clear(){
    this.criterioBusqueda = ""
    this.lstEmpleados = this.lstEmpleadosInit;
    this.Pages =1;
  }
}

