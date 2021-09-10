<template>
  <div class="modal fade" id="editUserModal" data-keyboard="false"
       tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel" style="color: #879f2d;">
            <font-awesome-icon icon="user-edit"/>
            Editar mi perfil
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h6 class="card-subtitle mb-2 text-muted">
            Recuerde que <i class="req">*</i> son campos obligatorios
            <a id="infoGenPop" tabindex="0" class="btn btn-sm btn-link "
               role="button" data-toggle="popover" data-trigger="focus">
              <font-awesome-icon icon="info-circle"/>
            </a>
          </h6>
          <form @submit.prevent="updateInfo">
            <div class="row">
              <div class="col-md text-left">
                <div class="form-group">
                  <label>Tipo de Documento</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="list-alt"/>
                    </span>
                    </div>
                    <select id="tdoc" class="custom-select" v-model="userdata.tdoc" :disabled="!admin">
                      <option v-for="doc in doctypes" v-bind:key="doc.id" :value="doc.id">
                        {{ doc.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md text-left">
                <div class="form-group">
                  <label for="doc">Documento de Identidad</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="address-card"/>
                    </span>
                    </div>
                    <input type="text" class="form-control" id="doc"
                           autocomplete="off" v-model="userdata.doc" :disabled="!admin">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md text-left">
                <div class="form-group">
                  <label for="username">Nombre</label> <i class="req">*</i>
                  <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="user"/>
                    </span>
                    </div>
                    <input type="text" class="form-control" id="username"
                           autocomplete="off" v-model="userdata.name" required>
                  </div>
                </div>
              </div>
              <div class="col-md text-left">
                <div class="form-group">
                  <label for="email">E-mail</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="envelope"/>
                    </span>
                    </div>
                    <input type="email" class="form-control" id="email"
                           placeholder="name@correo.com" autocomplete="off" v-model="userdata.email" disabled>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md text-left">
                <div class="form-group">
                  <label for="cel">Celular</label> <i class="req">*</i>
                  <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="phone-square"/>
                    </span>
                    </div>
                    <input type="tel" class="form-control" id="cel"
                           autocomplete="off" maxlength="10" v-model="userdata.cel" required>
                  </div>
                </div>
              </div>
              <div class="col-md text-left">
                <div class="form-group">
                  <label for="dir">Dirección</label> <i class="req">*</i>
                  <a id="infoDirPop" tabindex="0" class="btn btn-sm btn-link infocol"
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
                           placeholder="Calle 1 # 2 - 3 Apto:123" autocomplete="off" v-model="userdata.address" required>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-lg-center">
              <div class="col-md"/>
              <div class="col-md text-left">
                <div class="form-group">
                  <label>Tipo de Usuario</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon icon="list-alt"/>
                    </span>
                    </div>
                    <select class="custom-select" v-model="userdata.rol" :disabled="!admin">
                      <option v-for="user in usertypes" v-bind:key="user.type" :value="user.type">
                        {{ user.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md"/>
            </div>
            <hr>
            <button type="button" class="btn btn-outline-danger " data-dismiss="modal" @click="reloadData">Cancelar</button>
            <button type="button" class="btn btn-outline-secondary mx-3" @click="reloadData">Reiniciar</button>
            <button type="submit" class="btn btn-outline-success">Actualizar</button>
          </form>
        </div>
      </div>
    </div>
    <div class="col align-self-end" v-if="success">
      <success-alert :title="datasuccess.title" :msg="datasuccess.msg" class="my-float"/>
    </div>
  </div>
</template>

<script>
import doclist from "@/store/parameters/documentstypes.json";
import userlist from "@/store/parameters/userstypes.json";
import firebase from "firebase/compat";
import SuccessAlert from "../alerts/SuccessAlert.vue";

export default {
  name: "EditUserComponent",
  components: {
    SuccessAlert,
  },
  props: {
    admin: Boolean,
    userdata: {},
  },
  data() {
    return {
      success: false,
      datasuccess: {
        title: "",
        msg: ""
      },
    };
  },
  mounted() {
    // eslint-disable-next-line no-undef
    $('#infoDirPop').popover({
      container: 'body',
      delay: {"show": 200, "hide": 200},
      title: 'Parámetros Dirección',
      content: 'Por favor ingrese su dirección completa, incluyendo apartamento y/o torre.'
    });
    // eslint-disable-next-line no-undef
    $('#infoGenPop').popover({
      container: 'body',
      delay: {"show": 200, "hide": 200},
      title: 'Información',
      content: 'Si desea actualizar su tipo de documento o documento, por favor contacte al administrador del sistema.'
    });
  },
  computed: {
    doctypes() {
      return doclist.map((doc) => doc);
    },
    usertypes() {
      return userlist.map((user) => user);
    }
  },
  watch: {
    success(val) {
      setTimeout(() => {
        if (val) this.success = false;
        // eslint-disable-next-line no-undef
        $('#editUserModal')
            .modal('hide');
      }, 3000);
    },
  },
  methods: {
    updateInfo() {
      firebase.firestore().collection('users')
      .doc(this.userdata.uid).update(this.userdata)
      .then(() => {
        this.$emit('updatedinfo');
        this.datasuccess.title = "Listo!";
        this.datasuccess.msg = "Has actualizado el perfil correctamente.";
        this.success = true;
      });
    },
    reloadData() {
      this.$emit('reloadinfo');
    },
  }
}
</script>

<style scoped>
.req {
  color: red;
}

.infocol {
  color: #6c757d;
}

.my-float {
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>