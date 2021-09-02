<template>
  <div class="row justify-content-lg-center">
    <change-password-component/>
  </div>
</template>

<script>
import ChangePasswordComponent from "../../components/auth/ChangePasswordComponent.vue";

export default {
  name: "ChangePassword",
  components: {
    ChangePasswordComponent,
  }
}
</script>