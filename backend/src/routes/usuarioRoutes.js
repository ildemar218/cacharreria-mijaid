import { Router } from "express";

import {
  listarUsuarios,
  obtenerUsuario,
  registrarUsuario,
  editarUsuario,
  cambiarEstado,
} from "../controllers/usuarioController.js";

const router = Router();

// Obtener todos los usuarios
router.get("/", listarUsuarios);

// Obtener un usuario por ID
router.get("/:id", obtenerUsuario);

// Crear usuario
router.post("/", registrarUsuario);

// Actualizar usuario
router.put("/:id", editarUsuario);

// Activar / Desactivar usuario
router.patch("/:id/estado", cambiarEstado);

export default router;