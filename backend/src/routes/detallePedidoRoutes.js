import { Router } from "express";

import {
  registrarDetalle,
  listarDetalle
} from "../controllers/detallePedidoController.js";

const router = Router();

router.get("/:id", listarDetalle);

router.post("/", registrarDetalle);

export default router;