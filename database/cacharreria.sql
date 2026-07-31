/*====================================================
    BASE DE DATOS
====================================================*/

CREATE DATABASE IF NOT EXISTS cacharreria_mijaid;

USE cacharreria_mijaid;

/*====================================================
    TABLA: USUARIOS
====================================================*/

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('Administrador','Empleado') NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*====================================================
    TABLA: PROVEEDORES
====================================================*/

CREATE TABLE proveedores (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_empresa VARCHAR(150) NOT NULL,
    contacto VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(150) UNIQUE,
    direccion VARCHAR(255),
    estado BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*====================================================
    TABLA: CATEGORIAS
====================================================*/

CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL UNIQUE,

    descripcion VARCHAR(255),

    estado BOOLEAN DEFAULT TRUE
);

/*====================================================
    TABLA: PRODUCTOS
====================================================*/

/*====================================================
    TABLA: PRODUCTOS
====================================================*/

CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(150) NOT NULL,

    descripcion TEXT,

    codigo_barras VARCHAR(50) UNIQUE,

    stock INT NOT NULL DEFAULT 0,

    precio_compra DECIMAL(10,2) NOT NULL,

    precio_venta DECIMAL(10,2) NOT NULL,

    id_categoria INT NOT NULL,

    id_proveedor INT NOT NULL,

    estado BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categorias(id_categoria)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_producto_proveedor
        FOREIGN KEY (id_proveedor)
        REFERENCES proveedores(id_proveedor)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

/*====================================================
    TABLA: CLIENTES
====================================================*/

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    apellido VARCHAR(100) NOT NULL,

    telefono VARCHAR(20),

    correo VARCHAR(150) UNIQUE,

    direccion VARCHAR(255),

    estado BOOLEAN DEFAULT TRUE,

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*====================================================
    TABLA: PEDIDOS
====================================================*/

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,

    id_cliente INT NOT NULL,

    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,

    estado ENUM(
        'Pendiente',
        'Pagado',
        'Cancelado'
    ) DEFAULT 'Pendiente',

    total DECIMAL(10,2) DEFAULT 0.00,

    CONSTRAINT fk_pedido_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

/*====================================================
    TABLA: DETALLE PEDIDO
====================================================*/

CREATE TABLE detalle_pedido (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,

    id_pedido INT NOT NULL,

    id_producto INT NOT NULL,

    cantidad INT NOT NULL,

    precio_unitario DECIMAL(10,2) NOT NULL,

    subtotal DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_detalle_pedido
        FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_detalle_producto
        FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

/*====================================================
    TABLA: PAGOS
====================================================*/

CREATE TABLE pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,

    id_pedido INT NOT NULL,

    fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,

    metodo_pago ENUM(
        'Efectivo',
        'Tarjeta',
        'Transferencia',
        'Nequi'
    ) NOT NULL,

    monto DECIMAL(10,2) NOT NULL,

    observacion VARCHAR(255),

    CONSTRAINT fk_pago_pedido
        FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);