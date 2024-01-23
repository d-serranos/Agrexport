using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Api.Model;
using System;
using Oracle.ManagedDataAccess.Client;
using System.Collections.Generic;
using System.Data.Common;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class rrhhController : ControllerBase
    {
        private readonly IConfiguration Configuration;

        public rrhhController(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        /// <summary>
        /// Retorna el Catalogo de Puestos
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetCatPuesto()
        {
            string sql = "SELECT * FROM RRHH_CAT_PUESTOS rcp ORDER BY 1 ASC";
            var cadena = Configuration.GetSection("ConnectionStrings")["DefaultConnection"];
            using (var conn = new OracleConnection(cadena))
            {
                var result = conn.Query<CatPuesto>(sql);
                return Ok(result);
            }            
        }

        [HttpGet("Empleados")]
        public IActionResult GetEmpleados()
        {
            string sql = @"
                SELECT 
                    CODIGO
                    ,DPI
                    ,PRIMER_NOMBRE
                    ,SEGUNDO_NOMBRE
                    ,TERCER_NOMBRE
                    ,PRIMER_APELLIDO
                    ,SEGUNDO_APELLIDO
                    ,TELEFONO
                    ,MOVIL
                    ,NIT
                    ,NO_IGSS
                    ,NO_IRTRA
                    ,PASAPORTE
                    ,CORREO_PERSONAL
                    ,CORREO_INSTITUCIONAL
                    ,EMERGENCIA_NOMBRE
                    ,EMERGENCIA_CONTACTO
                    ,FECHA_INGRESO
                    ,ESTADO
                    ,FECHA_NACIMIENTO
                    ,GENERO
                    ,DIRECCION 
                    ,ZONA 
                    ,SALARIO
                    ,rcp.ID_PUESTO 
                    ,rcp.NOMBRE_PUESTO 
                    ,rcp.SALARIO_MENOR 
                    ,rcp.SALARIO_MAYOR 
                    ,rcp.DESCRIPCION 
                    ,PRIMER_NOMBRE ||' '||SEGUNDO_NOMBRE ||' '|| PRIMER_APELLIDO ||' '||SEGUNDO_APELLIDO as NOMBRE_COMPLETO
                FROM RRHH_EMPLEADOS re 
                INNER JOIN RRHH_CAT_PUESTOS rcp ON rcp.ID_PUESTO  = re.ID_PUESTO 
                WHERE re.ESTADO = 1";
            var cadena = Configuration.GetSection("ConnectionStrings")["DefaultConnection"];
            using (var conn = new OracleConnection(cadena))
            {
                var result = conn.Query<ListEmpleados>(sql);
                return Ok(result);
            }
        }

        /// <summary>
        /// Ingreso de Empleados.
        /// </summary>
        /// <param name="rrhh"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult InEmpleados(rrhh rrhh)
        {
            ResultadoModelo resp = new ResultadoModelo();

            string sql = @"
                INSERT INTO RRHH_EMPLEADOS(
                DPI
                ,PRIMER_NOMBRE
                ,SEGUNDO_NOMBRE
                ,TERCER_NOMBRE
                ,PRIMER_APELLIDO
                ,SEGUNDO_APELLIDO
                ,TELEFONO
                ,MOVIL
                ,NIT
                ,NO_IGSS
                ,NO_IRTRA
                ,PASAPORTE
                ,CORREO_PERSONAL
                ,CORREO_INSTITUCIONAL
                ,EMERGENCIA_NOMBRE
                ,EMERGENCIA_CONTACTO
                ,FECHA_INGRESO
                ,ESTADO
                ,FECHA_NACIMIENTO
                ,GENERO
                ,DIRECCION 
                ,ZONA 
                ,ID_PUESTO
                ,SALARIO) Values(
                :DPI
                ,:PRIMER_NOMBRE
                ,:SEGUNDO_NOMBRE
                ,:TERCER_NOMBRE
                ,:PRIMER_APELLIDO
                ,:SEGUNDO_APELLIDO
                ,:TELEFONO
                ,:MOVIL
                ,:NIT
                ,:NO_IGSS
                ,:NO_IRTRA
                ,:PASAPORTE
                ,:CORREO_PERSONAL
                ,:CORREO_INSTITUCIONAL
                ,:EMERGENCIA_NOMBRE
                ,:EMERGENCIA_CONTACTO
                ,:FECHA_INGRESO
                ,:ESTADO
                ,:FECHA_NACIMIENTO
                ,:GENERO
                ,:DIRECCION 
                ,:ZONA 
                ,:ID_PUESTO
                ,:SALARIO)";

            var param = new DynamicParameters();
            param.Add(":DPI", rrhh.Dpi );
            param.Add(":PRIMER_NOMBRE", rrhh.Primer_nombre );
            param.Add(":SEGUNDO_NOMBRE", rrhh.Segundo_nombre );
            param.Add(":TERCER_NOMBRE", rrhh.Tercer_nombre );
            param.Add(":PRIMER_APELLIDO", rrhh.Primer_apellido );
            param.Add(":SEGUNDO_APELLIDO", rrhh.Segundo_apellido );
            param.Add(":TELEFONO", rrhh.Telefono );
            param.Add(":MOVIL", rrhh.Movil );
            param.Add(":NIT", rrhh.Nit );
            param.Add(":NO_IGSS", rrhh.No_igss );
            param.Add(":NO_IRTRA", rrhh.No_irtra );
            param.Add(":PASAPORTE", rrhh.Pasaporte );
            param.Add(":CORREO_PERSONAL", rrhh.Correo_personal );
            param.Add(":CORREO_INSTITUCIONAL", rrhh.Correo_institucional );
            param.Add(":EMERGENCIA_NOMBRE", rrhh.Emergencia_nombre );
            param.Add(":EMERGENCIA_CONTACTO", rrhh.Emergencia_contacto );
            param.Add(":FECHA_INGRESO", rrhh.Fecha_ingreso );
            param.Add(":ESTADO", rrhh.Estado );
            param.Add(":FECHA_NACIMIENTO", rrhh.Fecha_nacimiento );
            param.Add(":GENERO", rrhh.Genero );
            param.Add(":DIRECCION", rrhh.Direccion );
            param.Add(":ZONA", rrhh.Zona );
            param.Add(":ID_PUESTO", rrhh.Id_puesto );
            param.Add(":SALARIO", rrhh.Salario );
            var cadena = Configuration.GetSection("ConnectionStrings")["DefaultConnection"];
            using (var conn = new OracleConnection(cadena))
            {
                var result = conn.Execute(sql,param);

                if( result == 1)
                {
                    resp.Estado = "success";
                    resp.Titulo = "Empleado Agregado";
                    resp.Mensaje = "Se registro exitosamente los datos ingresados";
                    resp.Icono = "success";
                }
                else
                {
                    resp.Estado = "error";
                    resp.Titulo = "Empleado No Agregado";
                    resp.Mensaje = "Se registro un error por favor vuelva a intentarlo o comuniquese con el administrador del sistema";
                    resp.Icono = "error";
                }
                return Ok(resp);
            }
        }

        /// <summary>
        /// Actualizar Empleados
        /// </summary>
        /// <param name="rrhh"></param>
        /// <returns></returns>
        [HttpPut]
        public IActionResult UpEmpleados(rrhh rrhh)
        {
            ResultadoModelo resp = new ResultadoModelo();

            string sql = @"UPDATE RRHH_EMPLEADOS 
                SET DPI = :DPI 
                ,PRIMER_NOMBRE = :PRIMER_NOMBRE  
                ,SEGUNDO_NOMBRE = :SEGUNDO_NOMBRE
                ,TERCER_NOMBRE = :TERCER_NOMBRE
                ,PRIMER_APELLIDO = :PRIMER_APELLIDO
                ,SEGUNDO_APELLIDO = :SEGUNDO_APELLIDO
                ,TELEFONO = :TELEFONO
                ,MOVIL = :MOVIL
                ,NIT = :NIT
                ,NO_IGSS = :NO_IGSS
                ,NO_IRTRA = :NO_IRTRA
                ,PASAPORTE = :PASAPORTE
                ,CORREO_PERSONAL = :CORREO_PERSONAL
                ,CORREO_INSTITUCIONAL = :CORREO_INSTITUCIONAL
                ,EMERGENCIA_NOMBRE = :EMERGENCIA_NOMBRE
                ,EMERGENCIA_CONTACTO = :EMERGENCIA_CONTACTO
                ,FECHA_INGRESO = :FECHA_INGRESO
                ,ESTADO = :ESTADO
                ,FECHA_NACIMIENTO = :FECHA_NACIMIENTO
                ,GENERO = :GENERO
                ,DIRECCION = :DIRECCION 
                ,ZONA = :ZONA 
                ,ID_PUESTO = :ID_PUESTO
                ,SALARIO = :SALARIO
                WHERE CODIGO = :CODIGO";

            var param = new DynamicParameters();
            param.Add(":DPI", rrhh.Dpi);
            param.Add(":PRIMER_NOMBRE", rrhh.Primer_nombre);
            param.Add(":SEGUNDO_NOMBRE", rrhh.Segundo_nombre);
            param.Add(":TERCER_NOMBRE", rrhh.Tercer_nombre);
            param.Add(":PRIMER_APELLIDO", rrhh.Primer_apellido);
            param.Add(":SEGUNDO_APELLIDO", rrhh.Segundo_apellido);
            param.Add(":TELEFONO", rrhh.Telefono);
            param.Add(":MOVIL", rrhh.Movil);
            param.Add(":NIT", rrhh.Nit);
            param.Add(":NO_IGSS", rrhh.No_igss);
            param.Add(":NO_IRTRA", rrhh.No_irtra);
            param.Add(":PASAPORTE", rrhh.Pasaporte);
            param.Add(":CORREO_PERSONAL", rrhh.Correo_personal);
            param.Add(":CORREO_INSTITUCIONAL", rrhh.Correo_institucional);
            param.Add(":EMERGENCIA_NOMBRE", rrhh.Emergencia_nombre);
            param.Add(":EMERGENCIA_CONTACTO", rrhh.Emergencia_contacto);
            param.Add(":FECHA_INGRESO", rrhh.Fecha_ingreso);
            param.Add(":ESTADO", rrhh.Estado);
            param.Add(":FECHA_NACIMIENTO", rrhh.Fecha_nacimiento);
            param.Add(":GENERO", rrhh.Genero);
            param.Add(":DIRECCION", rrhh.Direccion);
            param.Add(":ZONA", rrhh.Zona);
            param.Add(":ID_PUESTO", rrhh.Id_puesto);
            param.Add(":SALARIO", rrhh.Salario);
            param.Add(":CODIGO", rrhh.Codigo);
            var cadena = Configuration.GetSection("ConnectionStrings")["DefaultConnection"];
            using (var conn = new OracleConnection(cadena))
            {
                var result = conn.Execute(sql, param);

                if (result == 1)
                {
                    resp.Estado = "success";
                    resp.Titulo = "Empleado Actualizado";
                    resp.Mensaje = "Se actualizo exitosamente los datos ingresados";
                    resp.Icono = "success";
                }
                else
                {
                    resp.Estado = "error";
                    resp.Titulo = "Empleado No Actualizado";
                    resp.Mensaje = "Se registro un error por favor vuelva a intentarlo o comuniquese con el administrador del sistema";
                    resp.Icono = "error";
                }
                return Ok(resp);
            }
        }

        /// <summary>
        /// Eliminar Usuario
        /// </summary>
        /// <param name="Codigo"></param>
        /// <returns></returns>
        [HttpDelete("{Codigo:int}")]
        public IActionResult DelEmpleados([FromRoute]  Int64 Codigo)
        {
            ResultadoModelo resp = new ResultadoModelo();

            string sql = " UPDATE RRHH_EMPLEADOS SET ESTADO = 2 WHERE CODIGO = :Codigo";

            var cadena = Configuration.GetSection("ConnectionStrings")["DefaultConnection"];
            using (var conn = new OracleConnection(cadena))
            {
                var result = conn.Execute(sql, new { Codigo });

                if (result == 1)
                {
                    resp.Estado = "success";
                    resp.Titulo = "Empleado Eliminado";
                    resp.Mensaje = "Se elimino exitosamente ";
                    resp.Icono = "success";
                }
                else
                {
                    resp.Estado = "error";
                    resp.Titulo = "Empleado No Eliminado";
                    resp.Mensaje = "Se registro un error por favor vuelva a intentarlo o comuniquese con el administrador del sistema";
                    resp.Icono = "error";
                }
            }

            return Ok(resp);
        }

    }
}
