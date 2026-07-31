<template>

  <div class="container-fluid p-4">
  
      <div class="row mb-4">
  
          <div class="col">
  
              <h2>Sistema de Gestión - Cacharrería Mijaid</h2>
  
              <p class="text-muted">
                  Bienvenido <strong>{{ auth.usuario?.nombre }}</strong>
              </p>
  
          </div>
  
          <div class="col text-end">
  
              <button
                  class="btn btn-danger"
                  @click="salir"
              >
                  Cerrar sesión
              </button>
  
          </div>
  
      </div>
  
      <div class="row g-4">
  
          <div class="col-md-4">
  
              <div class="card shadow h-100">
  
                  <div class="card-body text-center">
  
                      <h3>📦</h3>
  
                      <h4>Productos</h4>
  
                      <p>
                          Administrar inventario.
                      </p>
  
                      <router-link
                          to="/productos"
                          class="btn btn-primary w-100"
                      >
                          Ir
                      </router-link>
  
                  </div>
  
              </div>
  
          </div>
  
          <div class="col-md-4">
  
              <div class="card shadow h-100">
  
                  <div class="card-body text-center">
  
                      <h3>🚚</h3>
  
                      <h4>Proveedores</h4>
  
                      <p>
                          Gestionar proveedores.
                      </p>
  
                      <router-link
                          to="/proveedores"
                          class="btn btn-warning w-100"
                      >
                          Ir
                      </router-link>
  
                  </div>
  
              </div>
  
          </div>
  
          <div class="col-md-4">
  
              <div class="card shadow h-100">
  
                  <div class="card-body text-center">
  
                      <h3>📂</h3>
  
                      <h4>Categorías</h4>
  
                      <p>
                          Gestionar categorías.
                      </p>
  
                      <router-link
                          to="/categorias"
                          class="btn btn-secondary w-100"
                      >
                          Ir
                      </router-link>
  
                  </div>
  
              </div>
  
          </div>
  
          <div class="col-md-4">
  
              <div class="card shadow h-100">
  
                  <div class="card-body text-center">
  
                      <h3>👤</h3>
  
                      <h4>Clientes</h4>
  
                      <p>
                          Administrar clientes.
                      </p>
  
                      <router-link
                          to="/clientes"
                          class="btn btn-info w-100"
                      >
                          Ir
                      </router-link>
  
                  </div>
  
              </div>
  
          </div>
  
          <div class="col-md-4">
  
              <div class="card shadow h-100">
  
                  <div class="card-body text-center">
  
                      <h3>🛒</h3>
  
                      <h4>Pedidos</h4>
  
                      <p>
                          Crear y administrar pedidos.
                      </p>
  
                      <router-link
                          to="/pedidos"
                          class="btn btn-success w-100"
                      >
                          Ir
                      </router-link>
  
                  </div>
  
              </div>
  
          </div>
  
          <div class="col-md-4">
  
              <div class="card shadow h-100">
  
                  <div class="card-body text-center">
  
                      <h3>💳</h3>
  
                      <h4>Pagos</h4>
  
                      <p>
                          Registrar pagos.
                      </p>
  
                      <router-link
                          to="/pagos"
                          class="btn btn-dark w-100"
                      >
                          Ir
                      </router-link>
  
                  </div>
  
              </div>
  
          </div>
  
      </div>
  
  </div>
  
  </template>
  
  <script setup>
  
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../../stores/authStore";
  
  const router = useRouter();
  
  const auth = useAuthStore();
  
  function salir() {
  
      auth.cerrarSesion();
  
      router.push("/login");
  
  }
  
  </script>