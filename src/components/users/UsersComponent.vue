<template>
  <div class="container">
    <div class="row">
      <div class="col-md">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded text-center">
          <div class="card-header">
            <h5 class="card-title" style="color: #879f2d;">
              <font-awesome-icon icon="user-plus"/>
              Agregar Usuario
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              Aquí pordrá agregar todos los usuarios administradores y técnicos que necesite para el sistema.
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
              <font-awesome-icon icon="users-cog"/>
              Administrar Usuarios
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              Aquí pordrá administrar todos los usuarios administradores y técnicos que posee el sistema.
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
              <font-awesome-icon icon="user-tie"/>
              Administrar Clientes
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              Aquí pordrá administrar todos los usuarios clientes que posee el sistema.
            </p>
            <hr>
            <a @click="changeuls(false)" class="btn btn-outline-dark" style="color: #879f2d;">
              Entrar
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsersComponent",
  methods: {
    changeuls(param) {
      this.$store.state.userdata.listselect = param;
      this.$router.push({name: 'manageusers'});
    }
  }
}
</script>

<style scoped>
.titlecolor {
  color: #879f2d;
}
</style>