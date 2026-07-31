import { Router } from "express";

import {
  listarPedidos,
  registrarPedido,
} from "../controllers/pedidoController.js";

const router = Router();

router.get("/", listarPedidos);

router.post("/", registrarPedido);

export default router;