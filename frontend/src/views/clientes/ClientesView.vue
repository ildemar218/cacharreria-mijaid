<template>

    <div class="container mt-4">
    
    <h2>Clientes</h2>
    
    <hr>
    
    <form @submit.prevent="guardar">
    
    <div class="row">
    
    <div class="col-md-6 mb-3">
    <label class="form-label">Nombre</label>
    <input v-model="form.nombre" class="form-control" required>
    </div>
    
    <div class="col-md-6 mb-3">
    <label class="form-label">Apellido</label>
    <input v-model="form.apellido" class="form-control" required>
    </div>
    
    <div class="col-md-6 mb-3">
    <label class="form-label">Teléfono</label>
    <input v-model="form.telefono" class="form-control">
    </div>
    
    <div class="col-md-6 mb-3">
    <label class="form-label">Correo</label>
    <input v-model="form.correo" type="email" class="form-control">
    </div>
    
    <div class="col-12 mb-3">
    <label class="form-label">Dirección</label>
    <input v-model="form.direccion" class="form-control">
    </div>
    
    </div>
    
    <button class="btn btn-success">
    Guardar Cliente
    </button>
    
    </form>
    
    <hr>
    
    <table class="table table-bordered">
    
    <thead>
    
    <tr>
    
    <th>ID</th>
    <th>Nombre</th>
    <th>Apellido</th>
    <th>Teléfono</th>
    
    </tr>
    
    </thead>
    
    <tbody>
    
    <tr
    v-for="cliente in store.clientes"
    :key="cliente.id_cliente"
    >
    
    <td>{{ cliente.id_cliente }}</td>
    <td>{{ cliente.nombre }}</td>
    <td>{{ cliente.apellido }}</td>
    <td>{{ cliente.telefono }}</td>
    
    </tr>
    
    </tbody>
    
    </table>
    
    </div>
    
    </template>
    
    <script setup>
    
    import { reactive, onMounted } from "vue";
    import { useClienteStore } from "../../stores/clienteStore";
    
    const store = useClienteStore();
    
    const form = reactive({
    
    nombre:"",
    apellido:"",
    telefono:"",
    correo:"",
    direccion:""
    
    });
    
    async function guardar(){
    
    await store.agregarCliente(form);
    
    form.nombre="";
    form.apellido="";
    form.telefono="";
    form.correo="";
    form.direccion="";
    
    }
    
    onMounted(()=>{
    
    store.cargarClientes();
    
    });
    
    </script>