import { defineStore } from "pinia";

import {
  agregarDetalle,
  obtenerDetalle,
} from "../services/detallePedidoService";

export const useDetallePedidoStore = defineStore("detallePedido", {

  state: () => ({
    detalle: [],
  }),

  actions: {

    async agregar(detalle) {

      await agregarDetalle(detalle);

      await this.cargar(detalle.id_pedido);

    },

    async cargar(idPedido) {

      this.detalle = await obtenerDetalle(idPedido);

    },

  },

});