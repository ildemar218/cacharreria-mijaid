import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

dotenv.config();

async function crearAdministrador() {
  try {
    const conexion = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Contraseña inicial
    const passwordPlano = "Admin123*";

    // Generar hash
    const passwordHash = await bcrypt.hash(passwordPlano, 10);

    // Insertar administrador
    await conexion.execute(
      `INSERT INTO usuarios
      (nombre, apellido, correo, password, rol)
      VALUES (?, ?, ?, ?, ?)`,
      [
        "Administrador",
        "Principal",
        "admin@cacharreria.com",
        passwordHash,
        "Administrador",
      ]
    );

    console.log("✅ Administrador creado correctamente.");
    console.log("Correo: admin@cacharreria.com");
    console.log("Contraseña: Admin123*");

    await conexion.end();
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

crearAdministrador();