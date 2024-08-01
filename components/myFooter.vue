<script lang="ts">
import {defineComponent} from 'vue'

export default defineNuxtComponent({
  name: "myFooter",

})
</script>

<template>
  <footer class="h-40 bg-gray-500 flex flex-row items-center justify-between text-white px-20">
    <div class=" text-xl">Footer Info</div>
    <div class="flex flex-row items-center gap-5">
      <nuxt-link to="https://github.com/mgvts/accountant" target="_blank">
        <span class="icon pi pi-github"/>
      </nuxt-link>
      <nuxt-link to="https://t.me/mgvts" target="_blank">
        <span class="icon pi pi-telegram"/>
      </nuxt-link>
    </div>
  </footer>
</template>

<style scoped lang="postcss">
.icon {
  @apply text-3xl cursor-pointer;
}
</style>