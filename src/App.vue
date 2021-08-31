<template>
  <div id="app" class="container-fluid">
    <div id="nav">
      <navbar-component/>
    </div>
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
  color: #23aa17;
}
</style>