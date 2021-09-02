<template>
  <div class="container">
    <div class="row">
      <div class="col align-self-start my-2" v-if="!isverify">
        <div class="alert alert-warning shadow-lg p-3 mb-5 rounded" role="alert">
          <h4 class="alert-heading">Verificación de Correo Electrónico</h4>
          <label>Debes verificar tu correo electrónico antes de poder acceder a nuestor servicios.</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat";

export default {
  name: "DashboardComponent",
  data() {
    return {
      isverify: null,
    };
  },
  mounted() {
    this.isverify = firebase.auth().currentUser.emailVerified;
  }
}
</script>

<style scoped>

</style>