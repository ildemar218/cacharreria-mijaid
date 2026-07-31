<template>

  <div class="container mt-5">
  
  <h2>Dashboard</h2>
  
  <hr>
  
  <p>
  
  Bienvenido {{ auth.usuario?.nombre }}
    
  <router-link
  to="/productos"
  class="btn btn-primary me-2"
>
  Productos
</router-link>

<router-link
  to="/proveedores"
  class="btn btn-warning me-2"
>
  Proveedores
</router-link>
<router-link
to="/clientes"
class="btn btn-info me-2"
>
Clientes
</router-link>
<router-link
to="/pedidos"
class="btn btn-success me-2"
>
Pedidos
</router-link>


  </p>

  
  <button
  class="btn btn-danger"
  @click="salir"
  >
  
  Cerrar sesión
  
  </button>
  
  </div>
  
  </template>
  
  <script setup>
  
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../../stores/authStore";
  
  const router = useRouter();
  
  const auth = useAuthStore();
  
  function salir(){
  
  auth.cerrarSesion();
  
  router.push("/login");
  
  }
  
  </script>