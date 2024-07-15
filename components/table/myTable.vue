<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'

export default defineNuxtComponent({
  name: "myTable",
})
</script>
<!--https://ui.nuxt.com/components/table#column-header-->
<template>
  <UTable :items="gettingItems">

  </UTable>
</template>

<style scoped>

</style>