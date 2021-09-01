<template>
  <div class="card my-5 shadow-lg p-3 mb-5 bg-white rounded" style="width: 60%; align-content: center">
    <div class="card-body">
      <h5 class="card-title">
        <router-link class="back" :to="{name: 'login'}" title="Volver al login">
          <font-awesome-icon icon="arrow-circle-left"/>
        </router-link>
        Cambio de Contraseña
      </h5>
      <div class="card-body">
        <form @submit.prevent="sendChangePsw">
          <div class="form-group">
            <label for="email">Por favor escriba el correo electrónico con el que se registro</label>
            <div class="input-group">
              <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="envelope"/>
                    </span>
              </div>
              <input type="email" class="form-control" id="email"
                     placeholder="name@correo.com" autocomplete="off" v-model="email" required>
            </div>
          </div>
          <hr>
          <button class="btn btn-outline-dark" type="submit">Enviar Correo</button>
        </form>
      </div>
      <div class="alert alert-secondary shadow-lg p-3 mb-5 rounded my-2" role="alert" v-if="sent">
        <h4 class="alert-heading">Listo!</h4>
        <label>Hemos enviado un link a su correo para restablecer su contraseña.</label>
      </div>
      <div class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert" v-if="error">
        <h4 class="alert-heading">Ups!</h4>
        <label>{{ this.errormsg }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat";

export default {
  name: "ChangePasswordComponent",
  data() {
    return {
      email: "",
      sent: false,
      error: false,
      errormsg: "",
    };
  },
  watch: {
    sent(val) {
      setTimeout(() => {
        if (val) this.sent = false;
        this.$router.push({name: 'login'})
      }, 5000);
    },
  },
  methods: {
    sendChangePsw() {
      firebase.auth().sendPasswordResetEmail(this.email)
          .then(() => {
            this.sent = true;
          })
          .catch((error) => {
            this.errormsg = error.message;
          });
    }
  }
}
</script>

<style scoped>
.back {
  color: #879f2d;
}
</style>