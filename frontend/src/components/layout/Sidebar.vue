<template>
    <aside class="bg-dark text-white p-3 vh-100">
  
      <h5 class="mb-4">
        Menú
      </h5>
  
      <ul class="nav flex-column">
  
        <li class="nav-item mb-2">
          <RouterLink
            class="nav-link text-white"
            to="/dashboard"
          >
            Dashboard
          </RouterLink>
        </li>
  
        <li class="nav-item mb-2">
          <RouterLink
            class="nav-link text-white"
            to="/productos"
          >
            Productos
          </RouterLink>
        </li>
  
        <li class="nav-item mb-2">
          <RouterLink
            class="nav-link text-white"
            to="/clientes"
          >
            Clientes
          </RouterLink>
        </li>
  
        <li class="nav-item mb-2">
          <RouterLink
            class="nav-link text-white"
            to="/proveedores"
          >
            Proveedores
          </RouterLink>
        </li>
  
        <li class="nav-item mb-2">
          <RouterLink
            class="nav-link text-white"
            to="/pedidos"
          >
            Pedidos
          </RouterLink>
        </li>
  
        <li class="nav-item">
          <RouterLink
            class="nav-link text-white"
            to="/pagos"
          >
            Pagos
          </RouterLink>
        </li>
  
      </ul>
  
    </aside>
  </template>
  
  <script setup>
  </script>