<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #cddb93">
    <img src="@/assets/oislogo.png" style="max-height: 4%; max-width: 4%">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'home'}">Home <span class="sr-only">(current)</span></router-link>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0">
        <template v-if="user">
          <div class="btn-group dropleft">
            <a class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              {{user.displayName}}
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <router-link class="dropdown-item" :to="{name: 'dashboard'}">Dashboard</router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item text-muted" @click="logout" style="cursor: pointer; font-style: italic;">Cerrar Sesión</a>
            </div>
          </div>
        </template>
        <template v-else>
          <router-link :to="{name: 'register'}">
            <button class="btn btn-outline-dark mx-sm-2" type="button">Registrarme</button>
          </router-link>
          <router-link :to="{name: 'login'}">
            <button class="btn btn-outline-success my-2 mx-sm-3 my-sm-0" type="button">Ingresar</button>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase/compat";
export default {
  name: 'NavbarComponent',
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.$router.push({
          name: 'home'
        })
      });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    })
  }
};
</script>

<style scoped>

</style>