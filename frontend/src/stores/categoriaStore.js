import { defineStore } from "pinia";

import {
  listarCategorias,
  crearCategoria,
} from "../services/categoriaService";

export const useCategoriaStore = defineStore("categorias", {

  state: () => ({
    categorias: [],
  }),

  actions: {

    async cargarCategorias() {

        this.categorias = await listarCategorias();

    },

    async agregarCategoria(categoria) {

      await crearCategoria(categoria);

      await this.cargarCategorias();

    },

  },

});