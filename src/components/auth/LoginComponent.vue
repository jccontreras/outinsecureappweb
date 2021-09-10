<template>
  <div>
    <div class="card my-5 shadow-lg mb-5 bg-white rounded" style="align-content: center">
      <div class="card-body">
        <h5 class="card-title">Bienvenido a OIS Services</h5>
        <h6 class="card-subtitle mb-2 text-muted">Recuerde que <i class="req">*</i> son campos obligatorios</h6>
        <div class="card-body">
          <form @submit.prevent="login">
            <div class="row">
              <div class="col-sm">
                <div class="form-group">
                  <label for="email">E-mail</label> <i class="req">*</i>
                  <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="user"/>
                    </span>
                    </div>
                    <input type="email" class="form-control" id="email"
                           placeholder="name@correo.com" autocomplete="off" v-model="loguser.email" required>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <div class="form-group">
                  <label for="pass">Contraseña</label> <i class="req">*</i>
                  <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="key"/>
                    </span>
                    </div>
                    <input :type="typebutton" class="form-control" id="pass"
                           autocomplete="off" v-model="loguser.pass" required>
                    <div class="input-group-prepend">
                      <button class="btn btn-outline-dark" type="button" @click="seePass" :title="titlebutton">
                        <font-awesome-icon :icon="iconbutton"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <router-link :to="{name: 'resetpsw'}" style="color: #879f2d">Olvide mi contraseña</router-link>
            <hr>
            <button class="btn btn-outline-success" type="submit">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </div>
    <div class="col align-self-end" v-if="error">
      <div class="alert alert-danger shadow-lg p-3 mb-5 rounded my-float" role="alert">
        <h4 class="alert-heading">Ups!</h4>
        <label>{{ this.erroralert }}</label>
      </div>
    </div>
    <div class="col align-self-end" v-if="alertv">
      <div class="alert alert-warning shadow-lg p-3 mb-5 rounded my-float" role="alert">
        <h4 class="alert-heading">Ups!</h4>
        <label>Debes verificar tu correo electrónico antes de poder ingresar al sistema.</label>
      </div>
    </div>
    <div class="col align-self-end" v-if="success">
      <div class="alert alert-success shadow-lg p-3 mb-5 rounded my-float" role="alert">
        <h4 class="alert-heading">Bievenido {{namealr}}!</h4>
        <label>Has ingresado al sistema exitosamente.</label>
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
      namealr: "",
      alertv: false,
      success: false,
      typebutton: "password",
      iconbutton: "eye",
      titlebutton: "Ver Contraseña",
      statebutton: false,
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
      }, 4000);
    },
    error(val) {
      setTimeout(() => {
        if (val) this.error = false;
      }, 3000);
    },
    success(val) {
      setTimeout(() => {
        if (val) this.success = false;
        this.$router.push({name: 'dashboard'});
      }, 2000);
    },
  },
  methods: {
    seePass() {
      if (this.statebutton) {
        this.iconbutton = "eye";
        this.typebutton = "password";
        this.titlebutton = "Ver Contraseña";
        this.statebutton = false;
      } else {
        this.iconbutton = "eye-slash";
        this.typebutton = "text";
        this.titlebutton = "Ocultar Contraseña";
        this.statebutton = true;
      }
    },
    login() {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(() => {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.loguser.email, this.loguser.pass)
                .then((user) => {
                  if (user.user.emailVerified) {
                    this.namealr = user.user.displayName;
                    this.loguser.name = "";
                    this.loguser.email = "";
                    this.success = true;
                  } else {
                    firebase.auth().signOut();
                    this.alertv = true;
                  }

                })
                .catch(error => {
                  if (error.code === "auth/wrong-password") {
                    this.erroralert = "La contraseña es incorrecta, por favor intentalo de nuevo.";
                  } else if (error.code === "auth/user-not-found") {
                    this.erroralert = "El usuario no existe, por favor registrate primero.";
                  } else if (error.code === "auth/user-disabled") {
                    this.erroralert = "El usuario está deshabilitado, por favor contacte al soporte técnico.";
                  }
                  this.error = true;
                });
          });
    }
  }
}
</script>

<style scoped>
.req {
  color: red;
}

.my-float {
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>