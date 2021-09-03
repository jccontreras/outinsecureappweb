<template>
  <div class="row justify-content-lg-center my-5">
    <div class="col-9">
      <profile-component/>
    </div>
  </div>
</template>

<script>
import ProfileComponent from "../../components/users/ProfileComponent.vue";

export default {
  name: "Profile",
  components: {
    ProfileComponent,
  }
}
</script>