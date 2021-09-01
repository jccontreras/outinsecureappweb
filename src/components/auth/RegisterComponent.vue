<template>
  <div class="card my-3 shadow-lg p-3 mb-5 bg-white rounded" style="width: 50%; align-content: center">
    <div class="card-body">
      <h5 class="card-title">Registro de Usuario</h5>
      <h6 class="card-subtitle mb-2 text-muted">Recuerde que <i class="req">*</i>  son campos obligatorios</h6>
      <div class="card-body">
        <form @submit.prevent="checkPass">
          <div class="form-group">
            <label for="username">Nombre</label> <i class="req">*</i>
            <input type="text" class="form-control" id="username"
                   autocomplete="off" v-model="newuser.name" required>
          </div>
          <div class="form-group">
            <label for="email">E-mail</label> <i class="req">*</i>
            <input type="email" class="form-control" id="email"
                   placeholder="name@correo.com" autocomplete="off" v-model="newuser.email" required>
          </div>
          <div class="form-group">
            <label for="pass">Contraseña</label> <i class="req">*</i>
            <input type="password" class="form-control" id="pass"
                   autocomplete="off" minlength="6" v-model="newuser.pass" required>
          </div>
          <div class="form-group">
            <label for="confpass">Confirmar Contraseña</label> <i class="req">*</i>
            <input type="password" class="form-control" id="confpass"
                   autocomplete="off" minlength="6" v-model="newuser.confpass" required>
          </div>
          <hr>
          <button class="btn btn-outline-success" type="submit">Registrarme</button>
        </form>
      </div>
    </div>
    <div class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert" v-if="error">
      <h4 class="alert-heading">{{this.erroralert.title}}</h4>
      <label>{{this.erroralert.message}}</label>
      <hr>
      <label class="mb-0">{{this.erroralert.submessage}}</label>
    </div>
    <div class="alert alert-success shadow-lg p-3 mb-5 rounded" role="alert" v-if="success">
      <h4 class="alert-heading">Listo!</h4>
      <label>Estás registrado correctamente</label>
      <hr>
      <label class="mb-0">Hemos enviado un correo electrónico para que confirme el mismo.</label>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat";

export default {
  name: "RegisterComponent",
  data() {
    return {
      erroralert: {
        title: "",
        message: "",
        submessage: ""
      },
      success: false,
      error: false,
      newuser: {
        name: "",
        email: "",
        pass: "",
        confpass: "",
      },
    };
  },
  watch: {
    success(val) {
      setTimeout(() => {
        if (val) this.success = false;
      }, 6000);
    },
    error(val) {
      setTimeout(() => {
        if (val) this.error = false;
      }, 3000);
    },
  },
  methods: {
    checkPass() {
      if (this.newuser.pass === this.newuser.confpass) {
        this.signup();
      } else {
        this.erroralert.title = "Contraseña no verificada";
        this.erroralert.message = "Por favor verifique que las contraseñas coincidan";
        this.erroralert.submessage = "";
        this.error = true;
      }
    },
    signup() {
      firebase.auth().languageCode = "es";
      firebase
          .auth()
          .createUserWithEmailAndPassword(this.newuser.email, this.newuser.pass)
          .then((user) => {
            console.log("Success! ", user);
            // update user
            user.user
            .updateProfile({
              displayName: this.newuser.name
            }).then(() => {
              this.success = true;
              this.newuser.name = "";
              this.newuser.email = "";
              this.newuser.pass = "";
              this.newuser.confpass = "";
              firebase.auth().signOut();
            }).catch((error) => {
              console.log(error);
            });

            //send verification email
            user.user
                .sendEmailVerification()
                .then(() => {
                  // Email verification sent!
                  // ...
                });
          })
          .catch(error => {
            console.log("Failed!", error);
            this.erroralert.title = "Ups!";
            this.erroralert.message = "Hubo un problema al hacer el registro";
            this.erroralert.submessage = "Por favor intentalo de nuevo más tarde.";
            this.error = true;
          });
    }
  }
}
</script>

<style>
.req {
  color: red;
}
label {

}
</style>