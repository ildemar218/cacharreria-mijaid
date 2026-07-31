import express from "express";
import cors from "cors";

import pool from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import proveedorRoutes from "./routes/proveedorRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";
import detallePedidoRoutes from "./routes/detallePedidoRoutes.js";

import { verificarToken } from "./middleware/authMiddleware.js";

const app = express();

// =========================
// Middlewares
// =========================

app.use(cors());
app.use(express.json());

// =========================
// Rutas públicas
// =========================

app.use("/api/auth", authRoutes);

// =========================
// Rutas protegidas
// =========================

app.use("/api/usuarios", verificarToken, usuarioRoutes);

// =========================
// Estado del servidor
// =========================

app.use("/api/productos", verificarToken, productoRoutes);

app.use("/api/proveedores", verificarToken, proveedorRoutes);

app.use("/api/categorias", verificarToken, categoriaRoutes);

app.use("/api/clientes", verificarToken, clienteRoutes);

app.use("/api/pedidos", verificarToken, pedidoRoutes);

app.use("/api/detalle-pedido", verificarToken, detallePedidoRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Servidor funcionando correctamente",
  });
});

// =========================
// Estado de la Base de Datos
// =========================

app.get("/api/database", async (req, res) => {
  try {
    const connection = await pool.getConnection();

    await connection.ping();

    connection.release();

    res.json({
      status: "OK",
      message: "Conexión con MySQL establecida correctamente",
    });

  } catch (error) {

    res.status(500).json({
      status: "ERROR",
      message: error.message,
    });

  }
});

export default app;