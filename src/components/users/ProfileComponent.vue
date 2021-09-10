<template>
  <div class="card shadow-lg p-3 mb-5 rounded text-center">
    <h5 class="card-title my-3" style="color: #879f2d;">
      <font-awesome-icon icon="user"/>
      Mi Perfil
    </h5>
    <div class="card-body">
      <div class="row">
        <div class="col-sm text-center">
          <img v-if="photo" class="imgprofile" :src="srcimg">
          <img v-else class="imgprofile" src="@/assets/img/nophoto.png">
        </div>
        <div class="col-8 text-left">
          <div class="row">
            <div class="col-sm">
              <label>
                <strong>Nombre:</strong>
                {{ user.name }}
              </label>
            </div>
            <div class="col-sm">
              <label>
                <strong>Documento:</strong>
                {{ user.tdoc }} {{ user.doc }}
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label>
                <strong>Email:</strong>
                {{ user.email }}
              </label>
            </div>
            <div class="col-sm">
              <label>
                <strong>Celular:</strong>
                {{ user.cel }}
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label>
                <strong>Dirección: </strong>
                {{ user.address }}
              </label>
            </div>
            <div class="col-sm">
              <label>
                <strong>Tipo: </strong>
                <label v-if="user.rol == 1">Administrador</label>
                <label v-if="user.rol == 2">Técnico</label>
                <label v-if="user.rol == 3">Cliente</label>
              </label>
            </div>
          </div>
          <div class="row justify-content-lg-center">
            <label>
              <strong>App Versión: </strong> <label>
              {{ version }}</label>
            </label>
          </div>
        </div>
      </div>
      <hr>
      <router-link class="btn btn-outline-secondary my-3" :to="{name: 'managepsw'}">cambiar mi contraseña</router-link>
      <button type="button" class="btn btn-outline-info mx-4 my-3" @click="openEdit">actualizar mis datos</button>
    </div>
    <edit-user-component :admin="false" :userdata="user" @updatedinfo="loadData" @reloadinfo="loadData"/>
  </div>
</template>

<script>
import constants from "@/store/constants";
import EditUserComponent from "./EditUserComponent.vue";
import firebase from "firebase/compat";

export default {
  name: "ProfileComponent",
  components: {
    EditUserComponent,
  },
  data() {
    return {
      version: "",
      photo: false,
      srcimg: "@/assets/img/nophoto.png",
      useruid: "",
      user: {},
    };
  },
  created() {
    if (this.$store.state.userdata.data.doc === "1018481843") {
      this.srcimg = "https://drive.google.com/file/d/1rb9zPkfEdYvaudcjyWhS0VFjvTvrpuWI/view?usp=sharing";
    }
    const user = firebase.auth().currentUser;
    this.useruid = user.uid;
  },
  mounted() {
    this.loadData()
    this.version = constants.appversion;
  },
  methods: {
    openEdit() {
      // eslint-disable-next-line no-undef
      $('#editUserModal')
          .modal('show');
    },
    loadData() {
      firebase.firestore().collection('users')
          .where('uid', '==', this.useruid)
          .get().then((data) => {
        data.docs.forEach((d) => {
          this.user = d.data();
        });
      })
          .catch((error) => {
            console.log(error);
          });
    },
  }
}
</script>

<style scoped>
.imgprofile {
  width: 150px;
  height: 150px;
  border-radius: 150px;
  border-color: #879f2d;
}
</style>