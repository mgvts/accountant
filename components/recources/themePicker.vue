<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'

export default defineNuxtComponent({
  name: "themePicker",
  computed: {
  },
  data() {
    return {
      getIcon: 'pi pi-sun',
    }
  },
  methods: {
    toggleColorMode() {
      const root = document.getElementsByTagName('html')[0];

      root.classList.toggle('p-dark');
      this.getIcon = this.getIcon === 'pi pi-moon' ? 'pi pi-sun' : 'pi pi-moon';

    }
  }
})
</script>

<template>
  <div>
    <Button
        :color
        :icon="getIcon"
        @click="toggleColorMode"
    />
  </div>
</template>

<style scoped>

</style>