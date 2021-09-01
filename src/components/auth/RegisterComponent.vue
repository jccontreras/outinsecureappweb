<template>
  <div class="card my-3 shadow-lg p-3 mb-5 bg-white rounded" style="width: 70%; align-content: center">
    <div class="card-body">
      <h5 class="card-title">Registro de Usuario</h5>
      <h6 class="card-subtitle mb-2 text-muted">Recuerde que <i class="req">*</i> son campos obligatorios</h6>
      <div class="card-body">
        <form @submit.prevent="checkPass">
          <div class="row">
            <div class="col-sm">
              <div class="form-group">
                <label>Tipo de Documento</label> <i class="req">*</i>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="list-alt"/>
                    </span>
                  </div>
                  <select class="custom-select" v-model="newuser.tdoc" required>
                    <option v-for="doc in doctypes" v-bind:key="doc.id" :value="doc.id">
                      {{ doc.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div class="form-group">
                <label for="doc">Documento de Identidad</label> <i class="req">*</i>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="address-card"/>
                    </span>
                  </div>
                  <input type="text" class="form-control" id="doc"
                         autocomplete="off" v-model="newuser.doc" required>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <div class="form-group">
                <label for="username">Nombre</label> <i class="req">*</i>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="user"/>
                    </span>
                  </div>
                  <input type="text" class="form-control" id="username"
                         autocomplete="off" v-model="newuser.name" required>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div class="form-group">
                <label for="email">E-mail</label> <i class="req">*</i>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="envelope"/>
                    </span>
                  </div>
                  <input type="email" class="form-control" id="email"
                         placeholder="name@correo.com" autocomplete="off" v-model="newuser.email" required>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <div class="form-group">
                <label for="cel">Celular</label> <i class="req">*</i>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="phone-square"/>
                    </span>
                  </div>
                  <input type="tel" class="form-control" id="cel"
                         autocomplete="off" maxlength="10" v-model="newuser.cel" required>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div class="form-group">
                <label for="dir">Dirección</label> <i class="req">*</i>
                <a id="infoDirPop" tabindex="0" class="btn btn-sm btn-link "
                   role="button" data-toggle="popover" data-trigger="focus">
                  <font-awesome-icon icon="info-circle"/>
                </a>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="map-marker-alt"/>
                    </span>
                  </div>
                  <input type="text" class="form-control" id="dir"
                         placeholder="Calle 1 # 2 - 3 Apto:123" autocomplete="off" v-model="newuser.address" required>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <div class="form-group">
                <label for="pass">Contraseña</label> <i class="req">*</i>
                <a id="infoConPop" tabindex="0" class="btn btn-sm btn-link "
                   role="button" data-toggle="popover" data-trigger="focus">
                  <font-awesome-icon icon="info-circle"/>
                </a>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="unlock"/>
                    </span>
                  </div>
                  <input type="password" class="form-control" id="pass"
                         autocomplete="off" minlength="6" v-model="newuser.pass" required>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div class="form-group">
                <label for="confpass">Confirmar Contraseña</label> <i class="req">*</i>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="lock"/>
                    </span>
                  </div>
                  <input type="password" class="form-control" id="confpass"
                         autocomplete="off" minlength="6" v-model="newuser.confpass" required>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <button class="btn btn-outline-success" type="submit">Registrarme</button>
        </form>
      </div>
    </div>
    <div class="alert alert-danger shadow-lg p-3 mb-5 rounded" role="alert" v-if="error">
      <h4 class="alert-heading">{{ this.erroralert.title }}</h4>
      <label>{{ this.erroralert.message }}</label>
      <hr>
      <label class="mb-0">{{ this.erroralert.submessage }}</label>
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
import doclist from "@/store/parameters/documentstypes.json";

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
        tdoc: "",
        doc: "",
        cel: "",
        address: "",
      },
    };
  },
  computed: {
    doctypes() {
      return doclist.map((doc) => doc);
    }
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
  mounted() {
    // eslint-disable-next-line no-undef
    $('#infoConPop').popover({
      container: 'body',
      delay: {"show": 200, "hide": 200},
      title: 'Parámetros Contraseña',
      content: 'Debe tener mínimo 6 caracteres.'
    })
    // eslint-disable-next-line no-undef
    $('#infoDirPop').popover({
      container: 'body',
      delay: {"show": 200, "hide": 200},
      title: 'Parámetros Dirección',
      content: 'Por favor ingrese su dirección completa, incluyendo apartamento y/o torre.'
    })
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
            //firebase.firestore().collection('users').doc(user.user.uid).set(this.newuser);
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
</style>