<template>
  <div class="card shadow-lg p-3 mb-5 bg-white rounded text-center">
    <h5 class="card-title my-3" style="color: #879f2d;">
      Mi Perfil
    </h5>
    <div class="card-body">
      <div class="row">
        <div class="col-4 text-center">
          <img class="imgprofile" src="@/assets/img/nophoto.png">
        </div>
        <div class="col-8 text-left">
          <div class="row">
            <div class="col-sm">
              <label>
                <strong>Nombre:</strong>
                {{$store.state.userdata.data.name}}
              </label>
            </div>
            <div class="col-sm">
              <label>
                <strong>Documento:</strong>
                {{$store.state.userdata.data.tdoc}} {{$store.state.userdata.data.doc}}
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label>
                <strong>Email:</strong>
                {{$store.state.userdata.data.email}}
              </label>
            </div>
            <div class="col-sm">
              <label>
                <strong>Celular:</strong>
                {{$store.state.userdata.data.cel}}
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label>
                <strong>Dirección: </strong>
                {{$store.state.userdata.data.address}}
              </label>
            </div>
            <div class="col-sm">
              <label>
                <strong>Tipo: </strong>
                <label v-if="$store.state.userdata.data.rol == 1">Administrador</label>
                <label v-if="$store.state.userdata.data.rol == 2">Técnico</label>
                <label v-if="$store.state.userdata.data.rol == 3">Cliente</label>
              </label>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <router-link class="btn btn-outline-secondary" :to="{name: 'managepsw'}">cambiar mi contraseña</router-link>
      <a class="btn btn-outline-info mx-4" href="#">actualizar mis datos</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileComponent",
}
</script>

<style scoped>
.imgprofile {
  width: 150px;
  height: 150px;
  border-radius: 150px;
  border-color: #879f2d;
}
</style>