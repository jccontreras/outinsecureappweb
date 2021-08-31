<template>
 <div class="offset-4">
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