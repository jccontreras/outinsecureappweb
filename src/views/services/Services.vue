<template>
  <div class="row justify-content-lg-center my-5">
    <services-component/>
  </div>
</template>

<script>
import ServicesComponent from "../../components/services/ServicesComponent.vue";

export default {
  name: "Services",
  components: {
    ServicesComponent,
  }
}
</script>