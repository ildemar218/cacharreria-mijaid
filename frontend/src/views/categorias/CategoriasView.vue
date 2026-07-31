<template>

    <div class="container mt-4">
    
    <h2>Categorías</h2>
    
    <hr>
    
    <form @submit.prevent="guardar">
    
    <div class="mb-3">
    
    <label class="form-label">
    Nombre
    </label>
    
    <input
    v-model="form.nombre"
    class="form-control"
    required
    >
    
    </div>
    
    <button class="btn btn-success">
    Guardar categoría
    </button>
    
    </form>
    
    <hr>
    
    <table class="table table-bordered">
    
    <thead>
    
    <tr>
    
    <th>ID</th>
    <th>Nombre</th>
    
    </tr>
    
    </thead>
    
    <tbody>
    
    <tr
    v-for="categoria in store.categorias"
    :key="categoria.id_categoria"
    >
    
    <td>{{ categoria.id_categoria }}</td>
    
    <td>{{ categoria.nombre }}</td>
    
    </tr>
    
    </tbody>
    
    </table>
    
    </div>
    
    </template>
    
    <script setup>
    
    import { reactive, onMounted } from "vue";
    
    import { useCategoriaStore } from "../../stores/categoriaStore";
    
    const store = useCategoriaStore();
    
    const form = reactive({
    
    nombre: ""
    
    });
    
    async function guardar(){
    
    await store.agregarCategoria(form);
    
    form.nombre="";
    
    }
    
    onMounted(()=>{
    
    store.cargarCategorias();
    
    });
    
    </script>
    