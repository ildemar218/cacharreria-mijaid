import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/auth/LoginView.vue";
import DashboardView from "../views/dashboard/DashboardView.vue";
import ProductosView from "../views/productos/ProductosView.vue";
import ProveedoresView from "../views/proveedores/ProveedoresView.vue";
import CategoriasView from "../views/categorias/CategoriasView.vue";
import ClientesView from "../views/clientes/ClientesView.vue";
import PedidosView from "../views/pedidos/PedidosView.vue";
import PagosView from "../views/pagos/PagosView.vue";
import FacturaView from "../views/facturas/FacturaView.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      redirect: "/login",
    },

    {
      path: "/login",
      component: LoginView,
    },

    {
      path: "/dashboard",
      component: DashboardView,
      meta: {
        requiereAuth: true,
      },
    },

    {
      path: "/productos",
      component: ProductosView,
      meta: {
        requiereAuth: true,
      },
    },
    
    {
      path: "/proveedores",
      component: ProveedoresView,
      meta: {
        requiereAuth: true,
      },
    },

    {
      path: "/categorias",
      name: "categorias",
      component: CategoriasView
    },

    {
      path: "/clientes",
      name: "clientes",
      component: ClientesView
  },

  {
    path: "/pedidos",
    name: "pedidos",
    component: PedidosView
  },

  {
    path: "/pagos",
    name: "pagos",
    component: PagosView,
  },

  {
    path: "/factura/:id",
    name: "factura",
    component: FacturaView,
  }

  ],
});

router.beforeEach((to, from, next) => {

  const token = localStorage.getItem("token");

  if (to.meta.requiereAuth && !token) {

    next("/login");

    return;
  }

  next();

});

export default router;