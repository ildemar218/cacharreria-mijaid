import { Router } from "express";

import {
  listarClientes,
  obtenerClientePorId,
  registrarCliente,
  editarCliente,
  cambiarEstado,
} from "../controllers/clienteController.js";

const router = Router();

router.get("/", listarClientes);

router.get("/:id", obtenerClientePorId);

router.post("/", registrarCliente);

router.put("/:id", editarCliente);

router.patch("/:id/estado", cambiarEstado);

export default router;