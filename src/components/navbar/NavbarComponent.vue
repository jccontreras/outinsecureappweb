<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #b5cc62">
    <img src="@/assets/oislogo.png" style="max-height: 4%; max-width: 4%">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item mx-2" v-if="!user">
          <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
        </li>
        <li class="nav-item mx-2" v-if="user && adminuser">
          <router-link :class="classm" :to="{name: 'users'}">
            <font-awesome-icon icon="users"/>
            Usuarios
          </router-link>
        </li>
        <li class="nav-item mx-2" v-if="user">
          <router-link :class="classm" :to="{name: 'services'}">
            <font-awesome-icon icon="clipboard-list"/>
            Servicios
          </router-link>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0 mx-4">
        <template v-if="user">
          <div class="btn-group">
            <a class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              {{$store.state.userdata.data.name}}
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <router-link class="dropdown-item" :to="{name: 'dashboard'}">
                <font-awesome-icon icon="chart-area"/>
                Dashboard
              </router-link>
              <router-link class="dropdown-item" :to="{name: 'profile'}">
                <font-awesome-icon icon="user"/>
                Mi Perfil
              </router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item text-muted" @click="logout" style="cursor: pointer; font-style: italic;">
                <font-awesome-icon icon="sign-out-alt"/>
                Cerrar Sesión
              </a>
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
      adminuser: false,
      verifyuser: false,
      classm: 'nav-link disabled',
    };
  },
  methods: {
    changeAdmin() {
      if (this.$store.state.userdata.data.rol === 1) {
        this.adminuser = true;
      }
    },
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.$router.push({
          name: 'home'
        })
        location.reload();
      });
    },
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.firestore().collection('users').where('uid', '==', user.uid).get()
            .then((data) => {
              data.docs.forEach((d) => {
                this.$store.state.userdata.data = d.data();
                this.changeAdmin();
              })
            });
        this.user = user;
        if (user.emailVerified) {
          this.classm = "nav-link";
        }
      } else {
        this.user = null;
      }
    });
  }
};
</script>