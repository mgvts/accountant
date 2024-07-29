<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import type {Purchase} from "~/composables/types";
import {IDBService} from "~/composables/IndexedDB";
import type {PropType} from "vue";

export default defineNuxtComponent({
  name: "myTable",
  setup() {
    const { categories, fetchCategories } = useCategories()
    fetchCategories()

    return { categories }
  },
  props: {
    purchases: Object as PropType<Purchase[]>,
  },
  data() {
    return {
      loading: false
    }
  },
})
</script>

<template>
  <div>
    <DataTable :value="categories" responsiveLayout="scroll">
      <Column field="name" header="Name" />
      <Column field="description" header="Description" />
    </DataTable>
<!--    <DataTable :value="purchases" stripedRows tableStyle="min-width: 50rem">-->
<!--      <Column field="user.name" header="User"/>-->
<!--      <Column field="name" header="Name"/>-->
<!--      <Column field="value" header="value"/>-->
<!--      <Column field="categories" header="Categories">-->
<!--        <template v-slot:body="{data}">-->
<!--          <div v-for="category of data.categories">-->
<!--            &lt;!&ndash;suppress VueUnrecognizedDirective &ndash;&gt;-->
<!--            <Chip :label="category.name" v-tooltip="category.description"/>-->
<!--          </div>-->
<!--        </template>-->
<!--      </Column>-->
<!--    </DataTable>-->
  </div>
</template>

<style scoped>

</style>