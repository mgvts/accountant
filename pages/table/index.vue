<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import CreatePurchasePopup from "~/components/popups/createPurchasePopup.vue";
import MyTable from "~/components/table/myTable.vue";
import CreateCategoryPopup from "~/components/popups/createCategoryPopup.vue";
import myHeader from "~/components/myHeader.vue";
import {IDBService} from "~/composables/IndexedDB";
import type {Purchase} from "~/types";

export default defineNuxtComponent({
  name: "",
  components: {CreateCategoryPopup, CreatePurchasePopup, MyTable, myHeader},
  data() {
    return {
      addPurchasePopup: false,
      addCategoryPopup: false,
      purchases: [] as Purchase[],
      loading: false
    }
  },
  methods: {
    addPurchase() {
      this.addPurchasePopup = true
    },
    addCategory() {
      this.addCategoryPopup = true
    },
    async fetchPurchases() {
      const purchases = await (this.$dexie as IDBService).getAllPurchases()
      this.purchases = await Promise.all(purchases.map(async p => {
        return {
          ...p,
          user: await (this.$dexie as IDBService).getUser(p.userId),
          categories: await Promise.all(p.categoryIds
              .map(async cId => await (this.$dexie as IDBService).getCategory(cId)))
        }
      }))
    },
  },
  async created() {
    this.loading = true
    await this.fetchPurchases()
    this.loading = false
  }
})
</script>

<template>
  <div class="p-10">
    <div class=" flex justify-between pb-5">
      <div class="text-3xl">
        Purchases
      </div>
      <div class="flex flex-row gap-2">
        <Button @click="addPurchase">Add Purchase</Button>
        <Button @click="addCategory">Add Category</Button>
      </div>
      <Button icon="pi pi-refresh"/>
    </div>
    <my-table :purchases="purchases"/>
  </div>
  <create-category-popup v-model="addCategoryPopup" @update:modelValue=""/>
  <create-purchase-popup v-model="addPurchasePopup" @update:modelValue="fetchPurchases()"/>
</template>

<style scoped>

</style>