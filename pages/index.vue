<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import myHeader from "@/components/myHeader.vue";
import MyTable from "@/components/table/myTable.vue";
import CreatePurchasePopup from "@/components/popups/createPurchasePopup.vue";
import {IDBService} from "~/composables/IndexedDB";
import type {Purchase} from "~/composables/types";

export default defineNuxtComponent({
  name: "",
  components: {CreatePurchasePopup, MyTable, myHeader},
  data() {
    return {
      addPurchasePopup: false,
      purchases: [] as Purchase[],
      loading: false
    }
  },
  methods: {
    addPurchase() {
      this.addPurchasePopup = true
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
    }
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
      <Button @click="addPurchase">Add Purchase</Button>
      <Button icon="pi pi-refresh"/>
    </div>
    <my-table :purchases="purchases"/>
  </div>
  <create-purchase-popup v-model="addPurchasePopup" @update:modelValue="fetchPurchases()"/>
</template>

<style scoped>

</style>