<template>
    <div class="container mt-4">
  
      <h2>Productos</h2>
  
      <hr>
  
      <form @submit.prevent="guardar">
  
        <div class="mb-3">
          <label class="form-label">Nombre del producto</label>
          <input
            v-model="form.nombre"
            type="text"
            class="form-control"
            placeholder="Ej: Escoba"
          >
        </div>
  
        <div class="mb-3">
          <label class="form-label">Descripción</label>
          <textarea
            v-model="form.descripcion"
            class="form-control"
            rows="3"
            placeholder="Descripción del producto"
          ></textarea>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Stock</label>
          <input
            v-model.number="form.stock"
            type="number"
            class="form-control"
          >
        </div>
  
        <div class="mb-3">
          <label class="form-label">Precio de compra</label>
          <input
            v-model.number="form.precio_compra"
            type="number"
            class="form-control"
          >
        </div>
  
        <div class="mb-3">
          <label class="form-label">Precio de venta</label>
          <input
            v-model.number="form.precio_venta"
            type="number"
            class="form-control"
          >
        </div>
  
        <div class="mb-3">
          <label class="form-label">Proveedor</label>
  
          <select
            v-model.number="form.id_proveedor"
            class="form-select"
          >
            <option disabled value="">
              Seleccione un proveedor
            </option>
  
            <option
              v-for="proveedor in proveedores"
              :key="proveedor.id_proveedor"
              :value="proveedor.id_proveedor"
            >
              {{ proveedor.nombre_empresa }}
            </option>
  
          </select>
  
        </div>
  
            <div class="mb-3">
    <label class="form-label">Categoría</label>

    <select
        v-model.number="form.id_categoria"
        class="form-select"
    >

        <option disabled value="">
        Seleccione una categoría
        </option>

        <option
        v-for="categoria in categorias"
        :key="categoria.id_categoria"
        :value="categoria.id_categoria"
        >
        {{ categoria.nombre }}
        </option>

    </select>

    </div>
  
        <div class="mb-3">
          <label class="form-label">Código de barras</label>
          <input
            v-model="form.codigo_barras"
            type="text"
            class="form-control"
          >
        </div>
  
        <button class="btn btn-success">
          Guardar producto
        </button>
  
      </form>
  
      <hr>
  
      <table class="table table-bordered">
  
        <thead>
  
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Proveedor</th>
            <th>Stock</th>
            <th>Precio Venta</th>
          </tr>
  
        </thead>
  
        <tbody>
  
          <tr
            v-for="producto in store.productos"
            :key="producto.id_producto"
          >
  
            <td>{{ producto.id_producto }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.proveedor }}</td>
            <td>{{ producto.stock }}</td>
            <td>{{ producto.precio_venta }}</td>
  
          </tr>
  
        </tbody>
  
      </table>
  
    </div>
  </template>
  
  <script setup>
  import { reactive, ref, onMounted } from "vue";
  import { useProductoStore } from "../../stores/productoStore";
  import { listarProveedores } from "../../services/proveedorService";
  import { listarCategorias } from "../../services/categoriaService";
  
  const store = useProductoStore();
  
  const proveedores = ref([]);

  const categorias = ref([]);
  
  const form = reactive({
    nombre: "",
    descripcion: "",
    stock: 0,
    precio_compra: 0,
    precio_venta: 0,
    id_proveedor: "",
    id_categoria: 1,
    codigo_barras: "",
  });
  
  async function cargarProveedores() {
    proveedores.value = await listarProveedores();
  }

  async function cargarCategorias() {
  categorias.value = await listarCategorias();
}
  
  async function guardar() {
    await store.agregarProducto(form);
  
    form.nombre = "";
    form.descripcion = "";
    form.stock = 0;
    form.precio_compra = 0;
    form.precio_venta = 0;
    form.id_proveedor = "";
    form.id_categoria = 1;
    form.codigo_barras = "";
  
    await store.cargarProductos();
  }
  
  onMounted(async () => {
  await cargarProveedores();
  await cargarCategorias();
  await store.cargarProductos();
    });
  </script>