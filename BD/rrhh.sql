--
-- ER/Studio 8.0 SQL Code Generation
-- Company :      Estudiante
-- Project :      Logico - rrhh.DM1
-- Author :       dserrano
--
-- Date Created : Saturday, January 20, 2024 11:23:03
-- Target DBMS : Oracle 11g
--

-- 
-- TABLE: rrhh_cat_puestos 
--

CREATE TABLE rrhh_cat_puestos(
    id_puesto        NUMBER(3, 0)     NOT NULL,
    descripcion      VARCHAR2(250),
    nombre_puesto    VARCHAR2(45),
    salario_menor    NUMBER(8, 2),
    salario_mayor    NUMBER(10, 2),
    CONSTRAINT PK2 PRIMARY KEY (id_puesto)
)
;



-- 
-- TABLE: rrhh_direcciones 
--

CREATE TABLE rrhh_direcciones(
    id_direccion    NUMBER(2, 0)     NOT NULL,
    codigo          NUMBER(8, 0)     NOT NULL,
    direccion       VARCHAR2(250),
    zona            NUMBER(2, 0),
    departamento    VARCHAR2(75),
    municipio       VARCHAR2(75),
    estado          NUMBER(1, 0)     DEFAULT 1,
    CONSTRAINT PK3 PRIMARY KEY (id_direccion, codigo)
)
;



-- 
-- TABLE: rrhh_empleados 
--

CREATE TABLE rrhh_empleados(
    codigo                  NUMBER(8, 0)     NOT NULL,
    dpi                     NUMBER(13, 0),
    primer_nombre           VARCHAR2(45),
    segundo_nombre          VARCHAR2(45),
    tercer_nombre           VARCHAR2(45),
    primer_apellido         VARCHAR2(50),
    segundo_apellido        VARCHAR2(50),
    telefono                NUMBER(8, 0),
    movil                   NUMBER(8, 0),
    nit                     VARCHAR2(13),
    no_igss                 NUMBER(10, 0),
    no_irtra                NUMBER(10, 0),
    pasaporte               VARCHAR2(25),
    correo_personal         VARCHAR2(100),
    correo_institucional    VARCHAR2(100),
    emergencia_nombre       VARCHAR2(250),
    emergencia_contacto     NUMBER(8, 0),
    id_puesto               NUMBER(3, 0)     NOT NULL,
    fecha_ingreso           DATE,
    estado                  NUMBER(1, 0)     DEFAULT 1,
    CONSTRAINT PK1 PRIMARY KEY (codigo)
)
;



-- 
-- TABLE: rrhh_direcciones 
--

ALTER TABLE rrhh_direcciones ADD CONSTRAINT Refrrhh_empleados4 
    FOREIGN KEY (codigo)
    REFERENCES rrhh_empleados(codigo)
;


-- 
-- TABLE: rrhh_empleados 
--

ALTER TABLE rrhh_empleados ADD CONSTRAINT Refrrhh_cat_puestos3 
    FOREIGN KEY (id_puesto)
    REFERENCES rrhh_cat_puestos(id_puesto)
;



-- catalogos


INSERT INTO RRHH_CAT_PUESTOS(ID_PUESTO, DESCRIPCION, NOMBRE_PUESTO, SALARIO_MENOR, SALARIO_MAYOR )  VALUES ( 
1, 
'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
'Ingeniero de sistemas',
15000,
20000);

INSERT INTO RRHH_CAT_PUESTOS VALUES ( 
2, 
'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
'Arquitecto de Software',
18000,
25000);

INSERT INTO RRHH_CAT_PUESTOS VALUES ( 
3, 
'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
'Soporte técnico de sistemas',
8000,
12000);

INSERT INTO RRHH_CAT_PUESTOS VALUES ( 
4, 
'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
'Director de Sistemas',
30000,
50000);

INSERT INTO RRHH_CAT_PUESTOS VALUES ( 
5, 
'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
'Administrador de Base de datos',
12000,
18000);

INSERT INTO RRHH_CAT_PUESTOS VALUES ( 
6, 
'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
'Desarrollador',
10000,
18000);

INSERT INTO RRHH_CAT_PUESTOS VALUES ( 
7, 
'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
'Analista Desarrollador',
15000,
20000);