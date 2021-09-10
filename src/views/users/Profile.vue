<template>
  <div class="row justify-content-lg-center my-5">
    <div class="col-2"/>
    <div class="col-md">
      <profile-component/>
    </div>
    <div class="col-2"/>
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