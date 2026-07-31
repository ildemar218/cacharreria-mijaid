import { defineStore } from "pinia";
import { login } from "../services/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    usuario: JSON.parse(localStorage.getItem("usuario")) || null,
    token: localStorage.getItem("token") || null,
  }),

  getters: {
    autenticado: (state) => !!state.token,
  },

  actions: {
    async iniciarSesion(correo, password) {
      const respuesta = await login(correo, password);

      this.usuario = respuesta.usuario;
      this.token = respuesta.token;

      localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));
      localStorage.setItem("token", respuesta.token);
    },

    cerrarSesion() {
      this.usuario = null;
      this.token = null;

      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
    },
  },
});