import { defineStore } from "pinia";

import {
  listarPagos,
  crearPago,
} from "../services/pagoService";

export const usePagoStore = defineStore("pagos", {

  state: () => ({
    pagos: [],
  }),

  actions: {

    async cargarPagos() {
      this.pagos = await listarPagos();
    },

    async agregarPago(pago) {
      await crearPago(pago);
      await this.cargarPagos();
    },

  },

});