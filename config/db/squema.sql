-- ************** creacion de tabla viajes **************
-- Insertar aquí cuando se tenga listo
-- ************** fin tabla usuarios **************


-- ************** creacion de BASE DE DATOS **************

CREATE DATABASE repuestos_automotriz;


-- ************** creacion de tabla USUARIOS **************
CREATE TYPE auth AS ENUM ('normal', 'google');
CREATE TABLE tbl_usuarios ( 
id_usuario serial PRIMARY KEY, 
nombre varchar(200),
avatar VARCHAR(255),
email varchar(100) NOT NULL, 
password varchar(100) NOT NULL,
authSource auth DEFAULT 'normal',
isAdmin BOOLEAN DEFAULT false,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ************** fin tabla USUARIOS **************

-- ************** creacion de tabla PRODUCTOS **************

CREATE TABLE tbl_productos (
	id_producto SERIAL PRIMARY KEY,
	SKU varchar(100),
	marca_producto varchar(100),
	nombre varchar(150),
	descripcion varchar(255),
	precio_lista integer, 
	stock integer,
	usado boolean,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
	
);

-- INSERT PRODUCTOS

INSERT INTO tbl_productos (sku,marca_producto,nombre,descripcion,precio_lista,stock,usado) values ('MR-100001','Champion','Bujia','Bujia hasta 60mil KM',7000,100,false);
INSERT INTO tbl_productos (sku,marca_producto,nombre,descripcion,precio_lista,stock,usado) values ('MR-100002','Gates','Correa','Correa 7PK',10000,25,false);
INSERT INTO tbl_productos (sku,marca_producto,nombre,descripcion,precio_lista,stock,usado) values ('MR-100003','Unipoint','Alternador','Alternador de 12 volts',120000,100,false);
INSERT INTO tbl_productos (sku,marca_producto,nombre,descripcion,precio_lista,stock,usado) values ('MR-100004','HK','Filtro de aire','Filtro de aire premiun',5500,100,false);
INSERT INTO tbl_productos (sku,marca_producto,nombre,descripcion,precio_lista,stock,usado) values ('MR-100005','Filtec','Filtro de Aceite','Filtro de aceite 12x10 mm',3506,100,false);
INSERT INTO tbl_productos (sku,marca_producto,nombre,descripcion,precio_lista,stock,usado) values ('MR-100006','Chevron','Aceite','Aceite de motor 10/40',15000,100,false);

-- ************** fin tabla PRODUCTOS **************

-- ************** creacion de tabla PRODUCTOS FAVORITOS **************

CREATE TABLE tbl_productos_favoritos (
	id_prod_favorito SERIAL PRIMARY KEY,
	producto_id integer,
	usuario_id integer,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_producto
      FOREIGN KEY(producto_id) 
        REFERENCES tbl_productos(id_producto),
	CONSTRAINT fk_usuario
      FOREIGN KEY(usuario_id) 
        REFERENCES tbl_usuarios(id_usuario)
);
-- ************** fin tabla PRODUCTOS FAVORITOS **************

-- ************** creacion de tabla PRODUCTOS APLICACION **************

CREATE TABLE tbl_productos_aplicacion (
	id_producto_modelo SERIAL PRIMARY KEY NOT NULL,
	producto_id integer,
	marca varchar(100),
	motor varchar(100),
	modelo varchar(100),
	cilindrada varchar(100),
	agno_inicio integer,
	agno_fin integer,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_prod_modelo
      FOREIGN KEY(producto_id) 
        REFERENCES tbl_productos(id_producto)
);
-- ************** fin tabla PRODUCTOS APLICACION **************


-- ************** creacion de tabla IMAGENES **************

CREATE TABLE tbl_imagenes (
	id_img SERIAL PRIMARY KEY NOT NULL, 
	producto_id integer,
	url varchar(255),
	orden integer,
	estado integer,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_prod_img
                   FOREIGN KEY(producto_id)
		REFERENCES tbl_productos(id_producto)
		 
);

-- ************** fin tabla IMAGENES **************


-- ************** creacion de tabla PEDIDOS **************

CREATE TABLE tbl_pedidos (
	id_pedido SERIAL PRIMARY KEY NOT NULL,
	usuario_id integer,
	numero_pedido varchar(200),
	observaciones varchar(200),
	neto numeric,
	iva numeric, 
	total numeric,
	estado varchar(100),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_usuario_pedido
                   FOREIGN KEY(usuario_id)
		REFERENCES tbl_usuarios(id_usuario)
);

-- ************** fin tabla PEDIDOS **************


-- ************** creacion de tabla PEDIDOS DETALLE **************

CREATE TABLE tbl_pedidos_detalle (
	id_detalle SERIAL PRIMARY KEY NOT NULL,
	pedido_id integer,
	producto_id integer,
	SKU varchar(200),
	cantidad integer,
	neto numeric,
	iva numeric,
	total numeric,
	descuento numeric,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_pedido_id
                   FOREIGN KEY(pedido_id)
		REFERENCES tbl_pedidos(id_pedido),
	CONSTRAINT fk_producto_pedido
                   FOREIGN KEY(producto_id)
		REFERENCES tbl_productos(id_producto)
);

-- ************** fin tabla PEDIDOS DETALLE **************


-- ************** creacion de tabla PUBLICACIONES **************
CREATE TABLE tbl_publicaciones(
	id_publicacion SERIAL PRIMARY KEY NOT NULL,
	usuario_id integer,
	producto_id integer,
	descripcion varchar(255),
	isOnline boolean,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_publicacion_usuario
                   FOREIGN KEY(usuario_id)
		REFERENCES tbl_usuarios(id_usuario),
	CONSTRAINT fk_productos_publicacion
                   FOREIGN KEY(producto_id)
		REFERENCES tbl_productos(id_producto)
);


-- ************** fin tabla PUBLICACIONES **************