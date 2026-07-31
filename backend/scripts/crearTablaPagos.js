import pool from "../src/config/database.js";

async function crearTabla() {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS pagos (

        id_pago INT AUTO_INCREMENT PRIMARY KEY,

        id_pedido INT NOT NULL,

        metodo_pago ENUM(
          'Efectivo',
          'Nequi',
          'Tarjeta'
        ) NOT NULL,

        valor_pagado DECIMAL(10,2) NOT NULL,

        cambio DECIMAL(10,2) NOT NULL,

        fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido)

      )
    `);

    console.log("Tabla pagos creada correctamente.");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

crearTabla();