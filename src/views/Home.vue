<template>
  <div class="offset-2 my-4">
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
