using System;

namespace Api.Model
{
    public class rrhh
    {
        public int? Codigo { set; get; }
        public Int64 Dpi { set; get; }
        public string Primer_nombre { set; get; }
        public string Segundo_nombre { set; get; }
        public string Tercer_nombre { set; get; }
        public string Primer_apellido { set; get; }
        public string Segundo_apellido { set; get; }
        public int Telefono { set; get; }
        public int Movil { set; get; }
        public string Nit { set; get; }
        public Int64 No_igss { set; get; }
        public Int64 No_irtra { set; get; }
        public string Pasaporte { set; get; }
        public string Correo_personal { set; get; }
        public string Correo_institucional { set; get; }
        public string Emergencia_nombre { set; get; }
        public string Emergencia_contacto { set; get; }
        public string Fecha_ingreso { set; get; }
        public int Estado { set; get; } 
        public string Fecha_nacimiento { set; get; }
        public string Genero { set; get; }
        public string Direccion { set; get; }
        public int Zona { set; get; }
        public int Id_puesto { set; get; }
        public Double Salario { set; get; }
    }

    public class ListEmpleados : rrhh
    {
        public string Nombre_puesto { set; get; }
        public float Salario_menor { set; get; }
        public float Salario_Mayor { set; get; }
        public string Descripcion { set; get; }
        public string Nombre_completo { set; get; }
    }

    public class CatPuesto
    {
        public int Id_puesto { get; set; }
        public string Nombre_puesto { get; set; }
        public string Descripcion { get; set; }
        public string Salario_menor { get; set;}
        public string Salario_mayor { get; set;}        
    }

    public class ResultadoModelo
    {
        public string Estado { get; set; }
        public string Mensaje { get; set; }
        public string Titulo { get; set; }
        public string Icono { get; set; }
    }
}
