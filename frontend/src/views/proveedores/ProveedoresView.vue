<template>
    <div class="container mt-4">
  
      <h2>Proveedores</h2>
  
      <hr>
  
      <form @submit.prevent="guardar">
  
        <div class="mb-3">
          <label class="form-label">Nombre de la empresa</label>
          <input
            v-model="form.nombre_empresa"
            class="form-control"
            required
          >
        </div>
  
        <div class="mb-3">
          <label class="form-label">Contacto</label>
          <input
            v-model="form.contacto"
            class="form-control"
            required
          >
        </div>
  
        <div class="mb-3">
          <label class="form-label">Teléfono</label>
          <input
            v-model="form.telefono"
            class="form-control"
            required
          >
        </div>
  
        <div class="mb-3">
          <label class="form-label">Correo</label>
          <input
            v-model="form.correo"
            type="email"
            class="form-control"
          >
        </div>
  
        <div class="mb-3">
          <label class="form-label">Dirección</label>
          <input
            v-model="form.direccion"
            class="form-control"
          >
        </div>
  
        <button class="btn btn-success">
          Guardar proveedor
        </button>
  
      </form>
  
      <hr>
  
      <table class="table table-striped">
  
        <thead>
  
          <tr>
            <th>ID</th>
            <th>Empresa</th>
            <th>Contacto</th>
            <th>Teléfono</th>
          </tr>
  
        </thead>
  
        <tbody>
  
          <tr
            v-for="proveedor in store.proveedores"
            :key="proveedor.id_proveedor"
          >
            <td>{{ proveedor.id_proveedor }}</td>
            <td>{{ proveedor.nombre_empresa }}</td>
            <td>{{ proveedor.contacto }}</td>
            <td>{{ proveedor.telefono }}</td>
          </tr>
  
        </tbody>
  
      </table>
  
    </div>
  </template>
  
  <script setup>
  import { reactive, onMounted } from "vue";
  import { useProveedorStore } from "../../stores/proveedorStore";
  
  const store = useProveedorStore();
  
  const form = reactive({
    nombre_empresa: "",
    contacto: "",
    telefono: "",
    correo: "",
    direccion: "",
  });
  
  async function guardar() {
    await store.agregarProveedor(form);
  
    form.nombre_empresa = "";
    form.contacto = "";
    form.telefono = "";
    form.correo = "";
    form.direccion = "";
  }
  
  onMounted(() => {
    store.cargarProveedores();
  });
  </script>