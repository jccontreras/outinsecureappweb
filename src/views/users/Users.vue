<template>
  <div class="row justify-content-lg-center my-5">
    <users-component/>
  </div>
</template>

<script>
import UsersComponent from "../../components/users/UsersComponent.vue";

export default {
  name: "Users",
  components: {
    UsersComponent,
  }
}
</script>

<style scoped>

</style>