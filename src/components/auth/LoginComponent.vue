<template>
  <div class="card my-5" style="width: 50%; align-content: center">
    <div class="card-body">
      <h5 class="card-title">Bienvenido</h5>
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" class="form-control" id="email"
                   placeholder="name@correo.com" autocomplete="off" v-model="loguser.email" required>
          </div>
          <div class="form-group">
            <label for="pass">Contraseña</label>
            <input type="password" class="form-control" id="pass"
                   autocomplete="off" v-model="loguser.pass" required>
          </div>
          <button class="btn btn-outline-success" type="submit">Ingresar</button>
        </form>
        <div class="alert alert-danger" role="alert" v-if="error">
          <h4 class="alert-heading">Ups!</h4>
          <label>{{this.erroralert}}</label>
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
      loguser: {
        email: "",
        pass: "",
      },
    };
  },
  methods: {
    login() {
      firebase
          .auth()
          .signInWithEmailAndPassword(this.loguser.email, this.loguser.pass)
          .then((user) => {
            console.log("Success! ", user);
            this.loguser.name = "";
            this.loguser.email = "";
            this.$router.push({name: 'dashboard'});
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

</style>