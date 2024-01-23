export interface Catproductos{
    Id_puesto : number,
    Descripcion : string,
    Nombre_puesto : string,
    Salario_menor : number,
    Salario_mayor : number,
}

export interface Empleados{
Codigo? : number,
Dpi : number,
Primer_nombre : string,
Segundo_nombre : string,
Tercer_nombre : string,
Primer_apellido : string,
Segundo_apellido : string,
Telefono : number,
Movil : number,
Nit : string,
No_igss: number,
No_irtra: number,
Salario:Number,
Pasaporte : string,
Correo_personal : string,
Correo_institucional : string,
Emergencia_nombre : string,
Emergencia_contacto : string,
Fecha_ingreso? : string,
Estado? : number,
Fecha_nacimiento: string,
Genero: string
Id_puesto  : number,
Direccion : string,
Zona : number,
}

export interface ListEmpleados extends Empleados {
Nombre_puesto : string,
Salario_menor : number,
Salario_Mayor : number,
Descripcion : string,
Nombre_completo : string,
} 


export interface ResultadoModelo {
    Estado: string, 
    Mensaje: string, 
    Titulo: string, 
    Icono: string, 
}