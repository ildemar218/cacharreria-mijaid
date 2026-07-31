import { Router } from "express";

import {
  registrarDetalle
} from "../controllers/detallePedidoController.js";

const router = Router();

router.post("/", registrarDetalle);

export default router;