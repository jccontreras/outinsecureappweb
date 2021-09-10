import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/plugins/firebase";
// import "@/plugins/admin";
import firebase from "firebase/compat";
// import firebase from "firebase-admin";
require('./plugins/fontawesome');

Vue.config.productionTip = false

let app = null;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});
