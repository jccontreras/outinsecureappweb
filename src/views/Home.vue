<template>
  <div class="row justify-content-lg-center">
    <home-component/>
  </div>
</template>

<script>
import HomeComponent from "../components/home/HomeComponent.vue";

export default {
  name: 'Home',
  components: {
    HomeComponent,
  }
}
</script>
