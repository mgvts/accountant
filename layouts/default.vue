<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'

export default defineNuxtComponent({
  name: "",
})
</script>

<template>
  <div>
    <my-header />
    <div style="min-height: 100vh">
      <slot/>
    </div>
    <my-footer />
  </div>
</template>

<style scoped>

</style>