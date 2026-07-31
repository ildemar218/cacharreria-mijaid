<template>

    <div class="container mt-4">
  
      <h2>Pagos</h2>
  
      <hr>
  
      <form @submit.prevent="guardar">
  
        <div class="mb-3">
  
          <label class="form-label">Pedido</label>
  
          <select
            v-model.number="form.id_pedido"
            class="form-select"
          >
  
            <option disabled value="">
              Seleccione un pedido
            </option>
  
            <option
              v-for="pedido in pedidos.filter(p => p.estado === 'Pendiente')"
              :key="pedido.id_pedido"
              :value="pedido.id_pedido"
            >
  
              Pedido #{{ pedido.id_pedido }}
              - {{ pedido.nombre }} {{ pedido.apellido }}
              - Total: ${{ pedido.total }}
  
            </option>
  
          </select>
  
        </div>
  
        <div class="mb-3">
  
          <label class="form-label">Método de pago</label>
  
          <select
            v-model="form.metodo_pago"
            class="form-select"
          >
  
            <option value="Efectivo">Efectivo</option>
            <option value="Nequi">Nequi</option>
            <option value="Tarjeta">Tarjeta</option>
  
          </select>
  
        </div>
  
        <div class="mb-3">
  
          <label class="form-label">Valor recibido</label>
  
          <input
            v-model.number="form.valor_pagado"
            type="number"
            class="form-control"
          >
  
        </div>
  
        <div class="mb-3">
  
          <label class="form-label">Cambio</label>
  
          <input
            :value="cambio"
            readonly
            class="form-control"
          >
  
        </div>
  
        <button class="btn btn-success">
  
          Registrar pago
  
        </button>
  
      </form>
  
      <hr>
  
      <h4>Pagos registrados</h4>
  
      <table class="table table-bordered table-hover">
  
        <thead class="table-dark">
  
          <tr>
  
            <th>ID Pago</th>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Método</th>
            <th>Valor recibido</th>
            <th>Cambio</th>
            <th>Fecha</th>
  
          </tr>
  
        </thead>
  
        <tbody>
  
          <tr
            v-for="pago in store.pagos"
            :key="pago.id_pago"
          >
  
            <td>{{ pago.id_pago }}</td>
  
            <td>{{ pago.id_pedido }}</td>
  
            <td>{{ pago.nombre }} {{ pago.apellido }}</td>
  
            <td>${{ pago.total }}</td>
  
            <td>{{ pago.metodo_pago }}</td>
  
            <td>${{ pago.valor_pagado }}</td>
  
            <td>${{ pago.cambio }}</td>
  
            <td>{{ pago.fecha_pago }}</td>
  
          </tr>
  
        </tbody>
  
      </table>
  
    </div>
  
  </template>
  
  <script setup>
  
  import {
    reactive,
    computed,
    ref,
    onMounted
  } from "vue";
  
  import { useRouter } from "vue-router";
  
  import { usePagoStore } from "../../stores/pagoStore";
  
  import { listarPedidos } from "../../services/pedidoService";
  
  const router = useRouter();
  
  const store = usePagoStore();
  
  const pedidos = ref([]);
  
  const form = reactive({
  
    id_pedido: "",
  
    metodo_pago: "Efectivo",
  
    valor_pagado: 0,
  
  });
  
  const cambio = computed(() => {
  
    const pedido = pedidos.value.find(
  
      p => p.id_pedido === form.id_pedido
  
    );
  
    if (!pedido) return 0;
  
    return form.valor_pagado - Number(pedido.total);
  
  });
  
  async function guardar() {
  
    const pedido = pedidos.value.find(
  
      p => p.id_pedido === form.id_pedido
  
    );
  
    if (!pedido) {
  
      alert("Seleccione un pedido.");
  
      return;
  
    }
  
    if (form.valor_pagado < Number(pedido.total)) {
  
      alert("El valor recibido es menor al total del pedido.");
  
      return;
  
    }
  
    const idPedido = form.id_pedido;
  
    await store.agregarPago({
  
      ...form,
  
      cambio: cambio.value,
  
    });
  
    await store.cargarPagos();
  
    pedidos.value = await listarPedidos();
  
    form.id_pedido = "";
  
    form.metodo_pago = "Efectivo";
  
    form.valor_pagado = 0;
  
    alert("Pago registrado correctamente.");
  
    router.push(`/factura/${idPedido}`);
  
  }
  
  onMounted(async () => {
  
    pedidos.value = await listarPedidos();
  
    await store.cargarPagos();
  
  });
  
  </script>