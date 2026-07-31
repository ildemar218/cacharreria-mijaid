import { Router } from "express";


import {
    crearPago,
    obtenerPagos,
    verFactura
  } from "../controllers/pagoController.js";

const router = Router();

router.get("/", obtenerPagos);

router.post("/", crearPago);

router.get("/factura/:id", verFactura);

export default router;