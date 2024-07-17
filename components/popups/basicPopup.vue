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
  <UModal v-model="isOpen">
    <div>
      <slot/>
    </div>
  </UModal>
</template>

<style scoped>

</style>