<script setup lang="ts">
const isOpen = defineModel<Boolean>({default: false})
</script>

<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'

export default defineNuxtComponent({
  name: "basicPopup",

})
</script>

<template>
  <Dialog modal  v-model:visible="isOpen" :style="{ width: '25rem' }">
    <template v-slot:header>
      <slot name="header"/>
    </template>
    <div>
      <slot/>
    </div>
  </Dialog>
</template>

<style scoped>

</style>