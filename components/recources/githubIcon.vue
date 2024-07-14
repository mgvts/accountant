<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'

export default defineNuxtComponent({
  name: "githubIcon",
})
</script>

<template>
  <NuxtLink to="https://github.com/mgvts/accountant">
    <UButton
        icon="i-simple-icons-github"
        variant="ghost"
    />
  </NuxtLink>
</template>

<style scoped>

</style>