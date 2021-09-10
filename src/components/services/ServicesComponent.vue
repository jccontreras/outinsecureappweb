<template>
  <div class="container">
    <div class="row">
      <div class="col-md">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded text-center">
          <div class="card-header">
            <h5 class="card-title" style="color: #879f2d;">
              <font-awesome-icon icon="calendar-times"/>
              Servicios Pendiente
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              Aquí pordrá administrar todos los servicios solicitados por los clientes del sistema.
            </p>
            <hr>
            <router-link class="btn btn-outline-dark" style="color: #879f2d;" :to="{name: 'adduser'}">
              Entrar
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-md">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded text-center">
          <div class="card-header">
            <h5 class="card-title" style="color: #879f2d;">
              <font-awesome-icon icon="calendar-minus"/>
              Servicios en Curso
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              Aquí pordrá administrar todos los servicios en curso solicitados por los clientes del sistema.
            </p>
            <hr>
            <a @click="changeuls(true)" class="btn btn-outline-dark" style="color: #879f2d;">
              Entrar
            </a>
          </div>
        </div>
      </div>
      <div class="col-md">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded text-center">
          <div class="card-header">
            <h5 class="card-title" style="color: #879f2d;">
              <font-awesome-icon icon="calendar-check"/>
              Servicios Finalizados
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              Aquí pordrá observar todos los servicios finalizados solicitados por los clientes del sistema.
            </p>
            <hr>
            <a @click="changeuls(false)" class="btn btn-outline-dark" style="color: #879f2d;">
              Entrar
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md text-center">
        <button type="button" class="btn btn-outline-secondary">
          <font-awesome-icon icon="concierge-bell"/>
          Solicitar Servicio
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServicesComponent",
}
</script>

<style scoped>

</style>