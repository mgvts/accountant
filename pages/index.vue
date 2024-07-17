<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import myHeader from "~/components/myHeader.vue";
import MyTable from "~/components/table/myTable.vue";

export default defineNuxtComponent({
  name: "",
  components: {MyTable, myHeader},
  data() {
    return {

    }
  }
})
</script>

<template>
  <my-table/>
</template>

<style scoped>

</style>