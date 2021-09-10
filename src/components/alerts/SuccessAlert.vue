<template>
  <div class="alert alert-success shadow-lg p-3 mb-5 rounded text-left" role="alert">
    <h4 class="alert-heading">{{title}}</h4>
    <label>{{msg}}</label>
  </div>
</template>

<script>
export default {
  name: "SuccessAlert",
  props: {
    title: String,
    msg: String,
  }
}
</script>