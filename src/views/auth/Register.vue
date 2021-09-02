<template>
  <div class="row justify-content-lg-center">
    <register-component/>
  </div>
</template>

<script>
import RegisterComponent from "../../components/auth/RegisterComponent.vue";


export default {
  name: "Register",
  components: {
    RegisterComponent,
  }

}
</script>

<style scoped>

</style>