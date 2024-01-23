import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Enviroment } from 'src/environments/enviroment';
import { Catproductos, Empleados, ListEmpleados, ResultadoModelo } from 'src/app/models/rrhh';
import { Observable, catchError, throwError } from 'rxjs';


  

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  
  
  constructor( private http: HttpClient) {   
  }

  getCatProducto(): Observable<Catproductos[]>{
    const api = Enviroment.portal;
    const url = `${api}/rrhh`;
    return this.http.get<Catproductos[]>(url).pipe(
      catchError(this.handleError)
    )
  }

  getEmpleados(): Observable<ListEmpleados[]>{
    const api = Enviroment.portal;
    const url = `${api}/rrhh/Empleados`;
    return this.http.get<ListEmpleados[]>(url).pipe(
      catchError(this.handleError)
    )
  }

  InEmpleados(empleados: Empleados ) : Observable<ResultadoModelo>{
    const api = Enviroment.portal;
    const url = `${api}/rrhh`;
    return this.http.post<ResultadoModelo>(url,empleados).pipe(
      catchError(this.handleError)
    )
  }

  UpEmpleados(empleados: Empleados ) : Observable<ResultadoModelo>{
    const api = Enviroment.portal;
    const url = `${api}/rrhh`;
    return this.http.put<ResultadoModelo>(url,empleados).pipe(
      catchError(this.handleError)
    )
  }

  DelEmpleados(Codigo?:number ) : Observable<ResultadoModelo>{
    const api = Enviroment.portal;
    const url = `${api}/rrhh/${Codigo}`;
    return this.http.delete<ResultadoModelo>(url).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error ocurred', error.error.message);
    } else {
        console.error(`Backend returned code ${error.status},` + `body was: ${error.error}`);
    }
    return throwError('Ha ocurrido un error; Por favor, inténtelo de nuevo más tarde');  
  }
}
