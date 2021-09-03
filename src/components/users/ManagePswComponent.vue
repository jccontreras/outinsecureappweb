<template>
  <div>
    <div class="card my-5 shadow-lg p-3 mb-5 bg-white rounded" style="align-content: center">
      <div class="card-body">
        <h5 class="card-title">
          <router-link class="back" :to="{name: 'profile'}" title="Regresar">
            <font-awesome-icon icon="arrow-circle-left"/>
          </router-link>
          Cambio de Contraseña
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">Recuerde que <i class="req">*</i> son campos obligatorios</h6>
        <div class="card-body">
          <form @submit.prevent="checkPass">
            <div class="form-group">
              <label for="newpsw">Contraseña Nueva</label> <i class="req">*</i>
              <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="unlock"/>
                    </span>
                </div>
                <input type="password" class="form-control" id="newpsw"
                       autocomplete="off" v-model="newpsw" required>
              </div>
            </div>
            <div class="form-group">
              <label for="cfrpsw">Confirmar Contraseña Nueva</label> <i class="req">*</i>
              <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="lock"/>
                    </span>
                </div>
                <input type="password" class="form-control" id="cfrpsw"
                       autocomplete="off" v-model="cfrpsw" required>
              </div>
            </div>
            <hr>
            <button class="btn btn-outline-success" type="submit">Cambiar Contraseña</button>
          </form>
        </div>
      </div>
    </div>
    <div class="col align-self-end" v-if="success">
      <div class="alert alert-secondary shadow-lg p-3 mb-5 rounded my-2 my-float" role="alert">
        <h4 class="alert-heading">Listo!</h4>
        <p class="text-break">Se ha actualizado su contraseña correctamente, debes ingresar al sistema nuevamente.</p>
      </div>
    </div>
    <div class="col align-self-end" v-if="error">
      <div class="alert alert-danger shadow-lg p-3 mb-5 rounded my-float" role="alert">
        <h4 class="alert-heading">Ups!</h4>
        <label>{{ errormsg }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat";

export default {
  name: "ManagePswComponent",
  data() {
    return {
      success: false,
      error: false,
      errormsg: "",
      newpsw: "",
      cfrpsw: "",
    };
  },
  watch: {
    success(val) {
      setTimeout(() => {
        if (val) this.success = false;
        firebase.auth().signOut();
        this.$router.push({name: 'home'});
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
      if (this.newpsw === this.cfrpsw) {
        this.changePsw();
      } else {
        this.errormsg = "Por favor verifique que las contraseñas coincidan.";
        this.error = true;
      }
    },
    changePsw() {
      const user = firebase.auth().currentUser;
      user.updatePassword(this.newpsw)
      .then(() => {
        this.success = true;
      })
      .catch((error) => {
        if (error.code == "auth/weak-password") {
          this.errormsg = "La contraseña debe tener mínimo 6 caracteres."
          this.error = true;
        }
      });
    },
  }
}
</script>

<style scoped>
.back {
  color: #879f2d;
}
.req {
  color: red;
}
.my-float {
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>