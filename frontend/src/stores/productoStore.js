import { defineStore } from "pinia";
import {
  obtenerProductos,
  crearProducto,
} from "../services/productoService";

export const useProductoStore = defineStore("productos", {
  state: () => ({
    productos: [],
  }),

  actions: {
    async cargarProductos() {
      this.productos = await obtenerProductos();
    },

    async agregarProducto(producto) {
      await crearProducto(producto);
      await this.cargarProductos();
    },
  },
});