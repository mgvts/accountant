<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'

export default defineNuxtComponent({
  name: "themePicker",
  computed: {
    getIcon() {
      return this.$colorMode.preference == 'light' ? this.sunIcon : this.moonIcon
    }
  },
  data() {
    return {
      sunIcon: 'i-heroicons-sun',
      moonIcon: 'i-heroicons-moon'
    }
  },
  methods: {
    toggleColorMode() {
      if (this.$colorMode.preference == 'light') {
        this.$colorMode.preference = 'dark'
      }else {
        this.$colorMode.preference = 'light'
      }
    }
  }
})
</script>

<template>
  <div>
    <UButton
        :icon="getIcon"
        @click="toggleColorMode"
        variant="ghost"
    />
  </div>
</template>

<style scoped>

</style>