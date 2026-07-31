import { defineStore } from "pinia";

import {
  listarPedidos,
  crearPedido,
} from "../services/pedidoService";

export const usePedidoStore = defineStore("pedidos", {

  state: () => ({
    pedidos: [],
  }),

  actions: {

    async cargarPedidos() {
      this.pedidos = await listarPedidos();
    },

    async agregarPedido(pedido) {
      await crearPedido(pedido);
      await this.cargarPedidos();
    },

  },

});