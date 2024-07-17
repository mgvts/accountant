<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import type {Purchase} from "~/composables/types";
import {IDBService} from "~/composables/IndexedDB";
import type {PropType} from "vue";

export default defineNuxtComponent({
  name: "myTable",
  props: {
    purchases: Object as PropType<Purchase[]>,
  },
  data() {
    return {
      loading:false
    }
  },
})
</script>
<!--https://ui.nuxt.com/components/table#column-header-->
<template>
  <div>
    <DataTable :value="purchases" stripedRows tableStyle="min-width: 50rem">
      <Column field="user.name" header="User"/>
      <Column field="name" header="Name"/>
      <Column field="value" header="value"/>
      <Column field="category" header="Categories"/>
    </DataTable>
  </div>

</template>

<style scoped>

</style>