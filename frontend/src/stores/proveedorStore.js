import { defineStore } from "pinia";
import {
  obtenerProveedores,
  crearProveedor,
} from "../services/proveedorService";

export const useProveedorStore = defineStore("proveedores", {
  state: () => ({
    proveedores: [],
  }),

  actions: {
    async cargarProveedores() {
      this.proveedores = await obtenerProveedores();
    },

    async agregarProveedor(proveedor) {
      await crearProveedor(proveedor);
      await this.cargarProveedores();
    },
  },
});