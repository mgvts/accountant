<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'

export default defineNuxtComponent({
  name: "",
  data() {
    return {
      pages: [
        {title: 'All purchases', to: '/table/purchases' },
        {title: 'User page', to: '/user' },
        {title: 'About Us', to: '/about' },
      ]
    }
  }
})
</script>

<template>
  <div class="container mx-auto flex justify-center items-center">
    <div class="flex flex-col justify-center gap-4 mt-10 text-center text-xl">
      <NuxtLink v-for="page of pages" :to="page.to" class="group transition duration-1000">
        {{ page.title }}
        <span class="mt-0.5 block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-400"></span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="postcss">
</style>