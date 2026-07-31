<template>

    <div class="container mt-4" v-if="factura">
    
    <h2>Factura de Venta</h2>
    
    <hr>
    
    <h5>Pedido #{{ factura.pedido.id_pedido }}</h5>
    
    <p>
    
    <strong>Cliente:</strong>
    
    {{ factura.pedido.nombre }}
    {{ factura.pedido.apellido }}
    
    </p>
    
    <p>
    
    <strong>Fecha:</strong>
    
    {{ factura.pedido.fecha_pedido }}
    
    </p>
    
    <p>
    
    <strong>Método:</strong>
    
    {{ factura.pedido.metodo_pago }}
    
    </p>
    
    <table class="table table-bordered">
    
    <thead>
    
    <tr>
    
    <th>Producto</th>
    
    <th>Cantidad</th>
    
    <th>Precio</th>
    
    <th>Subtotal</th>
    
    </tr>
    
    </thead>
    
    <tbody>
    
    <tr
    v-for="item in factura.detalle"
    :key="item.nombre"
    >
    
    <td>{{ item.nombre }}</td>
    
    <td>{{ item.cantidad }}</td>
    
    <td>${{ item.precio_unitario }}</td>
    
    <td>${{ item.subtotal }}</td>
    
    </tr>
    
    </tbody>
    
    </table>
    
    <h3 class="text-end">
    
    TOTAL: ${{ factura.pedido.total }}
    
    </h3>
    
    <div class="text-end">
    
    <button
    class="btn btn-primary"
    @click="imprimir"
    >
    
    Imprimir
    
    </button>
    
    </div>
    
    </div>
    
    </template>
    
    <script setup>
    
    import { ref, onMounted } from "vue";
    
    import { useRoute } from "vue-router";
    
    import { obtenerFactura } from "../../services/facturaService";
    
    const factura = ref(null);
    
    const route = useRoute();
    
    function imprimir(){
    
    window.print();
    
    }
    
    onMounted(async()=>{
    
    factura.value = await obtenerFactura(
    
    route.params.id
    
    );
    
    });
    
    </script>