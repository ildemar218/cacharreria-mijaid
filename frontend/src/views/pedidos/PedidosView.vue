<template>
    <div class="container mt-4">
  
      <h2>Pedidos</h2>
  
      <hr>
  
      <form @submit.prevent="guardar">
  
        <div class="mb-3">
  
          <label class="form-label">
            Cliente
          </label>
  
          <select
            v-model.number="form.id_cliente"
            class="form-select"
          >
  
            <option disabled value="">
              Seleccione un cliente
            </option>
  
            <option
              v-for="cliente in clientes"
              :key="cliente.id_cliente"
              :value="cliente.id_cliente"
            >
              {{ cliente.nombre }} {{ cliente.apellido }}
            </option>
  
          </select>
  
        </div>
  
        <button class="btn btn-success">
          Crear Pedido
        </button>
  
      </form>
  
      <hr>
  
      <table class="table table-bordered">
  
        <thead>
  
          <tr>
  
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acción</th>
  
          </tr>
  
        </thead>
  
        <tbody>
  
          <tr
            v-for="pedido in store.pedidos"
            :key="pedido.id_pedido"
          >
  
            <td>{{ pedido.id_pedido }}</td>
            <td>{{ pedido.nombre }} {{ pedido.apellido }}</td>
            <td>{{ pedido.fecha_pedido }}</td>
            <td>{{ pedido.total }}</td>
            <td>{{ pedido.estado }}</td>
  
            <td>
  
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="seleccionarPedido(pedido)"
              >
                Seleccionar
              </button>
  
            </td>
  
          </tr>
  
        </tbody>
  
      </table>
  
      <hr>
  
      <h3>
        Agregar producto al pedido
        <span v-if="detalle.id_pedido">
          #{{ detalle.id_pedido }}
        </span>
      </h3>
  
      <div class="row">

        <hr>

    <h3>Detalle del pedido</h3>

    <table
      class="table table-striped table-bordered"
      v-if="detalleStore.detalle.length > 0"
    >

      <thead>

        <tr>

          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Subtotal</th>

        </tr>

      </thead>

      <tbody>

        <tr
          v-for="item in detalleStore.detalle"
          :key="item.id_detalle"
        >

          <td>{{ item.nombre }}</td>

          <td>{{ item.cantidad }}</td>

          <td>${{ item.precio_unitario }}</td>

          <td>${{ item.subtotal }}</td>

        </tr>

      </tbody>

      </table>

      <div
        v-else
        class="alert alert-secondary mt-3"
      >

        Este pedido aún no tiene productos.

      </div>
      
        <div class="col-md-8">
  
          <label>Producto</label>
  
          <select
            v-model.number="detalle.id_producto"
            class="form-select"
          >
  
            <option disabled value="">
              Seleccione un producto
            </option>
  
            <option
              v-for="producto in productos"
              :key="producto.id_producto"
              :value="producto.id_producto"
            >
              {{ producto.nombre }}
            </option>
  
          </select>
  
        </div>
  
        <div class="col-md-2">
  
          <label>Cantidad</label>
  
          <input
            v-model.number="detalle.cantidad"
            type="number"
            min="1"
            class="form-control"
          >
  
        </div>
  
        <div class="col-md-2 d-flex align-items-end">
  
          <button
            type="button"
            class="btn btn-primary w-100"
            @click="agregarProducto"
          >
            Agregar
          </button>
  
        </div>
  
      </div>
  
    </div>
  </template>
  
  <script setup>
  
  import { reactive, ref, onMounted } from "vue";
  
  import { usePedidoStore } from "../../stores/pedidoStore";
  import { useDetallePedidoStore } from "../../stores/detallePedidoStore";
  
  import { listarClientes } from "../../services/clienteService";
  import { obtenerProductos } from "../../services/productoService";
  
  const store = usePedidoStore();
  const detalleStore = useDetallePedidoStore();
  
  const clientes = ref([]);
  const productos = ref([]);
  
  const form = reactive({
    id_cliente: ""
  });
  
  const detalle = reactive({
    id_pedido: "",
    id_producto: "",
    cantidad: 1
  });
  
  async function cargarClientes() {
    clientes.value = await listarClientes();
  }
  
  async function cargarProductos() {
    productos.value = await obtenerProductos();
  }
  
  async function guardar() {
  
    await store.agregarPedido(form);
  
    form.id_cliente = "";
  
    await store.cargarPedidos();
  
  }
  
  async function seleccionarPedido(pedido) {

detalle.id_pedido = pedido.id_pedido;

await detalleStore.cargar(
  pedido.id_pedido
);

}
      
    async function agregarProducto() {

    if (!detalle.id_pedido) {

      alert("Seleccione primero un pedido.");

      return;

    }

    await detalleStore.agregar({
      id_pedido: detalle.id_pedido,
      id_producto: detalle.id_producto,
      cantidad: detalle.cantidad,
    });

    detalle.id_producto = "";
    detalle.cantidad = 1;

    // Recargar detalle del pedido
    await detalleStore.cargar(detalle.id_pedido);

    // Recargar lista de pedidos (para actualizar el total)
    await store.cargarPedidos();

    // Volver a seleccionar el pedido para refrescar la vista
    const pedidoActual = store.pedidos.find(
      p => p.id_pedido === detalle.id_pedido
    );

    if (pedidoActual) {
      await seleccionarPedido(pedidoActual);
    }

    }
  onMounted(async () => {
  
    await cargarClientes();
    await cargarProductos();
    await store.cargarPedidos();
  
  });
  
  </script>