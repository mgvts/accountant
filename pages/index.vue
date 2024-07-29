<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'

export default defineNuxtComponent({
  name: "",

})
</script>

<template>
  <div class="container flex justify-center items-center">
    <ul class="flex flex-col gap-5">
      <li>
        <NuxtLink to="/table">table</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/">empty</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/user">user</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/login">login</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>