<template>
  <div style="max-width: 90%">
    <div class="table-responsive shadow-lg p-3 mb-5 bg-white rounded">
      <div class="card" style="align-content: center">
        <div class="card-body">
          <div class="row">
            <div class="col-md">
              <h5 class="card-title">
                <router-link class="back" :to="{name: 'users'}" title="Regresar">
                  <font-awesome-icon icon="arrow-circle-left"/>
                </router-link>
                {{ titlelb }}
              </h5>
            </div>
            <div class="col-sm justify-content-lg-right">
              <div class="input-group mb-3">
                <input type="text" class="form-control"
                       placeholder="Digita el correo electrónico del usuario"
                       aria-label="Recipient's username" aria-describedby="basic-addon2" id="search"
                       v-model="search">
                <div class="input-group-append">
                  <span class="input-group-text search"><font-awesome-icon icon="search"/></span>
                </div>
              </div>
            </div>
          </div>
          <table class="table table-hover table-sm table-striped">
            <thead class="back">
            <tr>
              <th scope="col">Tipo Documento</th>
              <th scope="col">Documento</th>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Dirección</th>
              <th scope="col">Celular</th>
              <th scope="col">Tipo</th>
              <th scope="col">Acción</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="u in getlist" v-bind:key="u.doc">
              <td>{{ u.tdoc }}</td>
              <td>{{ u.doc }}</td>
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
              <td>{{ u.address }}</td>
              <td>{{ u.cel }}</td>
              <td v-if="u.rol == 1">Administrador</td>
              <td v-if="u.rol == 2">Técnico</td>
              <td v-if="u.rol == 3">Cliente</td>
              <td v-if="u.uid != $store.state.userdata.data.uid" class="text-center">
                <a title="Editar Usuario" class="edit" @click="openEdit(u)">
                  <font-awesome-icon icon="user-edit"/>
                </a>
                <a class="delete mx-4" title="Eliminar Usuario" @click="delUser(u)">
                  <font-awesome-icon icon="user-minus"/>
                </a>
              </td>
              <td v-else>
                Mi usuario
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col align-self-end" v-if="success">
      <div class="alert alert-secondary shadow-lg p-3 mb-5 rounded my-2 my-float" role="alert">
        <p class="text-break">Se ha eliminado el usuario correctamente.</p>
      </div>
    </div>
    <div class="col align-self-end" v-if="error">
      <div class="alert alert-danger shadow-lg p-3 mb-5 rounded my-float" role="alert">
        <h4 class="alert-heading">Ups!</h4>
        <label>Algo ha salido mal, por favor intentalo nuevamente.</label>
      </div>
    </div>
    <edit-user-component :admin="true" :userdata="userdata" @updatedinfo="loadData" @reloadinfo="loadData"/>
  </div>
</template>

<script>
import firebase from "firebase/compat";
import admin from "firebase-admin";
import EditUserComponent from "./EditUserComponent.vue";
// const admin = require("firebase-admin");

export default {
  name: "ManageUsersComponent",
  components: {
    EditUserComponent,
  },
  data() {
    return {
      userslist: [],
      titlelb: "",
      success: false,
      error: false,
      userdata: {},
      search: "",
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    getlist() {
      return this.userslist.filter((item) => item.email.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  watch: {
    success(val) {
      setTimeout(() => {
        if (val) this.success = false;
        this.$router.push({name: 'dashboard'});
        location.reload();
      }, 4000);
    },
    error(val) {
      setTimeout(() => {
        if (val) this.error = false;
      }, 3000);
    },
  },
  methods: {
    loadData() {
      this.userslist = [];
      const query = firebase.firestore().collection('users');
      if (this.$store.state.userdata.listselect) {
        this.titlelb = "Usuarios del Sistema";
        query.where('rol', '!=', 3)
            .get()
            .then((data) => {
              data.docs.forEach((d) => {
                this.userslist.push(d.data());
              });
            });
      } else {
        this.titlelb = "Clientes del Sistema";
        query.where('rol', '==', 3)
            .get()
            .then((data) => {
              data.docs.forEach((d) => {
                this.userslist.push(d.data());
              })
            });
      }
    },
    openEdit(user) {
      this.userdata = user;
      // eslint-disable-next-line no-undef
      $('#editUserModal')
          .modal('show');
    },
    delUser(user) {
      console.log(user.uid);
      console.log(user.email);
      admin.auth().getUser(user.uid)
          .then((user) => {
            console.log("Se elimino el usuario");
            console.log(user);
          })
          .catch((error) => {
            console.log(error.code);
          });
      /*const user = firebase.auth().currentUser;
      user.delete()
          .then(() => {
            this.success = true;
          })
          .catch((error) => {
            console.log('Filed1', error.code);
            this.error = true;
          });*/
    }
  }
}
</script>

<style scoped>
.back {
  color: #879f2d;
}

.edit {
  color: #2c69aa;
  cursor: pointer;
}

.delete {
  color: red;
  cursor: pointer;
}

.my-float {
  position: fixed;
  bottom: 40px;
  right: 40px;
}

.search {
  background-color: #6c757d;
  color: white;
}
</style>