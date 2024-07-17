<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'

export default defineNuxtComponent({
  name: "",
})
</script>

<template>
  <div>
    <my-header/>
    <div>
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>