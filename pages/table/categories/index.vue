<script lang="ts">
import {type Ref} from 'vue'
import MyTable from "~/components/table/myTable.vue";
import type {Category} from "~/types";
import CreateCategoryPopup from "~/components/popups/createCategoryPopup.vue";
import TableNavigation from "~/components/table/tableNavigation.vue";

export default defineNuxtComponent({
  name: "",
  components: {TableNavigation, CreateCategoryPopup, MyTable},
  setup() {
    const category = useCategories()
    return {category}
  },
  computed: {
    categories(): Category[] {
      return this.category.categories.value
    }
  },
  data() {
    return {
      columns: [
        {key: 'name', header: 'Category name', sortable: true},
        {key: 'timeCreate', header: 'Created', sortable: true},
        {key: 'description', header: 'Category info', sortable: false},
      ],
      addCategoryPopup: false
    }
  },
  methods: {
    async loadData() {
      await this.category.fetchCategories()
    },
    async deleteCategory(item: Category) {
      console.log(item)
      await this.category.deleteCategory(item.id);
    },
  },
  async created() {
    await this.loadData()
  }
})
</script>

<template>
  <table-navigation/>
  <div
      class="flex flex-col items-center w-full"
  >
    <my-table
        deletable
        :items="categories"
        :columns="columns"
        @deleteRow="deleteCategory"
        @addRow="addCategoryPopup = true"
    />
  </div>
  <create-category-popup v-model="addCategoryPopup" @update:modelValue="loadData"/>
</template>

<style scoped lang="css">
</style>