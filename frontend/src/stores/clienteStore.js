import { defineStore } from "pinia";

import {
  listarClientes,
  crearCliente,
} from "../services/clienteService";

export const useClienteStore = defineStore("clientes", {

  state: () => ({
    clientes: [],
  }),

  actions: {

    async cargarClientes() {
      this.clientes = await listarClientes();
    },

    async agregarCliente(cliente) {
      await crearCliente(cliente);
      await this.cargarClientes();
    },

  },

});