import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/plugins/firebase";
import firebase from "firebase/compat";
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
