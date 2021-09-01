<template>
  <div class="card my-5 shadow-lg p-3 mb-5 bg-white rounded" style="width: 50%; align-content: center">
    <div class="card-body">
      <h5 class="card-title">Bienvenido a OIS Services</h5>
      <h6 class="card-subtitle mb-2 text-muted">Recuerde que <i class="req">*</i>  son campos obligatorios</h6>
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">E-mail</label> <i class="req">*</i>
            <input type="email" class="form-control" id="email"
                   placeholder="name@correo.com" autocomplete="off" v-model="loguser.email" required>
          </div>
          <div class="form-group">
            <label for="pass">Contraseña</label> <i class="req">*</i>
            <input type="password" class="form-control" id="pass"
                   autocomplete="off" v-model="loguser.pass" required>
          </div>
          <router-link :to="{name: 'resetpsw'}" style="color: #879f2d">Olvide mi contraseña</router-link> <hr>
          <button class="btn btn-outline-success" type="submit">Ingresar</button>
        </form>
        <div class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert" v-if="error">
          <h4 class="alert-heading">Ups!</h4>
          <label>{{this.erroralert}}</label>
        </div>
        <div class="alert alert-warning shadow-lg p-3 mb-5 rounded" role="alert" v-if="alertv">
          <h4 class="alert-heading">Ups!</h4>
          <label>Debe verificar su correo electrónico antes de poder ingresar al sistema.</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat";

export default {
  name: "LoginComponent",
  data() {
    return {
      erroralert: "",
      error: false,
      alertv: false,
      loguser: {
        email: "",
        pass: "",
      },
    };
  },
  watch: {
    alertv(val) {
      setTimeout(() => {
        if (val) this.alertv = false;
      }, 5000);
    },
    error(val) {
      setTimeout(() => {
        if (val) this.error = false;
      }, 3000);
    },
  },
  methods: {
    login() {
      firebase
          .auth()
          .signInWithEmailAndPassword(this.loguser.email, this.loguser.pass)
          .then((user) => {
            if (user.user.emailVerified) {
              console.log("Success! ", user);
              this.loguser.name = "";
              this.loguser.email = "";
              this.$router.push({name: 'dashboard'});
            } else {
              firebase.auth().signOut();
              this.alertv = true;
            }

          })
          .catch(error => {
            console.log("Failed!", error);
            this.erroralert = error.message;
            this.error = true;
          });
    }
  }
}
</script>

<style scoped>
 .req {
   color: red;
 }
</style>