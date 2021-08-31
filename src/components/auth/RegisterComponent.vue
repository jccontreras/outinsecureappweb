<template>
  <div class="card my-5" style="width: 50%; align-content: center">
    <div class="card-body">
      <h5 class="card-title">Bienvenido</h5>
      <h6 class="card-subtitle mb-2 text-muted">Por favor llena los datos para registrarte</h6>
      <div class="card-body">
        <form @submit.prevent="checkPass">
          <div class="form-group">
            <label for="username">Nombre</label>
            <input type="text" class="form-control" id="username"
                   autocomplete="off" v-model="newuser.name" required>
          </div>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" class="form-control" id="email"
                   placeholder="name@correo.com" autocomplete="off" v-model="newuser.email" required>
          </div>
          <div class="form-group">
            <label for="pass">Contraseña</label>
            <input type="password" class="form-control" id="pass"
                   autocomplete="off" minlength="6" v-model="newuser.pass" required>
          </div>
          <div class="form-group">
            <label for="confpass">Confirmar Contraseña</label>
            <input type="password" class="form-control" id="confpass"
                   autocomplete="off" minlength="6" v-model="newuser.confpass" required>
          </div>
          <button class="btn btn-outline-success" type="submit">Registrarme</button>
        </form>
      </div>
    </div>
    <div class="alert alert-danger" role="alert" v-if="error">
      <h4 class="alert-heading">{{this.erroralert.title}}</h4>
      <label>{{this.erroralert.message}}</label>
      <hr>
      <label class="mb-0">{{this.erroralert.submessage}}</label>
    </div>
    <div class="alert alert-success" role="alert" v-if="success">
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
      }, 3000);
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
              this.$router.push({name: 'dashboard'})
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