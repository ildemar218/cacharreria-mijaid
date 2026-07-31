<template>
  <div class="container mt-5">

    <div class="row justify-content-center">

      <div class="col-md-4">

        <div class="card">

          <div class="card-header">

            <h3>Iniciar Sesión</h3>

          </div>

          <div class="card-body">

            <form @submit.prevent="ingresar">

              <div class="mb-3">

                <label>Correo</label>

                <input
                  v-model="correo"
                  type="email"
                  class="form-control"
                />

              </div>

              <div class="mb-3">

                <label>Contraseña</label>

                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                />

              </div>

              <button class="btn btn-primary w-100">

                Ingresar

              </button>

            </form>

            <div
              v-if="error"
              class="alert alert-danger mt-3"
            >
              {{ error }}
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";

const correo = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();
const auth = useAuthStore();

async function ingresar() {

  try {

    error.value = "";

    await auth.iniciarSesion(
      correo.value,
      password.value
    );

    router.push("/dashboard");

  } catch (e) {

    error.value = e.message;

  }

}

</script>