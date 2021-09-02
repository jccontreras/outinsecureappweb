<template>
  <div id="nav" class="container-fluid">
    <navbar-component/>
    <router-view/>
  </div>
</template>

<script>
import NavbarComponent from "./components/navbar/NavbarComponent.vue";

export default {
  components: {
    NavbarComponent,
  }
}
</script>

<style>
#nav a.router-link-exact-active {
  color: #879f2d;
}
</style>