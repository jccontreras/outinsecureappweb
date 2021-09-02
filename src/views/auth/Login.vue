<template>
  <div class="row justify-content-lg-center">
   <login-component/>
 </div>
</template>

<script>
import LoginComponent from "../../components/auth/LoginComponent.vue";

export default {
  name: "Login",
  components: {
    LoginComponent,
  }
}
</script>

<style scoped>

</style>