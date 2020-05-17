<template>
  <div class="row container">
    <Uploader />
  </div>
</template>

<script>
import Uploader from "~/components/Upload"

export default {
  components: {
    Uploader
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
