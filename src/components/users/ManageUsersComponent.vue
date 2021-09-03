<template>
  <div class="table-responsive shadow-lg p-3 mb-5 bg-white rounded" style="max-width: 90%">
    <div class="card" style="align-content: center">
      <div class="card-body">
        <h5 class="card-title">
          <router-link class="back" :to="{name: 'users'}" title="Regresar">
            <font-awesome-icon icon="arrow-circle-left"/>
          </router-link>
          {{ titlelb }}
        </h5>
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
          <tr v-for="u in userslist" v-bind:key="u.doc">
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
              <a title="Editar Usuario" class="edit">
                <font-awesome-icon icon="user-edit"/>
              </a>
              <a class="delete mx-4" title="Eliminar Usuario">
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
</template>

<script>
import firebase from "firebase/compat";

export default {
  name: "ManageUsersComponent",
  data() {
    return {
      userslist: [],
      titlelb: "",
    };
  },
  created() {
    const query = firebase.firestore().collection('users');
    if (this.$store.state.userdata.listselect) {
      this.titlelb = "Usuarios del Sistema";
      query.where('rol', '!=', 3)
          .get()
          .then((data) => {
            data.docs.forEach((d) => {
              this.userslist.push(d.data());
            })
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
</style>