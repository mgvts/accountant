<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app';
import MyTable from '~/components/table/myTable.vue';
import CreatePurchasePopup from '~/components/popups/createPurchasePopup.vue';
import TableNavigation from '~/components/table/tableNavigation.vue';
import usePurchases from '~/composables/usePurchases';
import PurchaseCardPopup from "~/components/popups/purchaseCardPopup.vue";
import type {Purchase} from "~/types";

export default defineNuxtComponent({
  name: 'PurchasesIndex',
  components: {PurchaseCardPopup, TableNavigation, CreatePurchasePopup, MyTable},
  setup() {
    const {fetchPurchases, purchases, deletePurchase} = usePurchases();
    return {fetchPurchases, purchases, deletePurchase};
  },
  computed: {
    purchases() {
      return this.purchase.purchases.value;
    }
  },
  data() {
    return {
      columns: [
        {key: 'name', header: 'Purchase Name', sortable: true},
        {key: 'value', header: 'Value', sortable: true},
        {key: 'currency', header: 'Currency', sortable: false},
        {key: 'categories', header: 'Categories', sortable: false},
        {key: 'timeCreate', header: 'Created', sortable: true},
      ],
      addPurchasePopup: false,
      editPurchasePopup: false,
      editPurchase: undefined as undefined | Purchase
    };
  },
  methods: {
    async loadData() {
      await this.fetchPurchases();
    },
    async deletePurchase(item: Purchase) {
      await this.deletePurchase(item.id);
    },
    editPurchaseHandler(purchase: Purchase) {
      this.editPurchasePopup = true
      this.editPurchase = purchase;
    }
  },
  async created() {
    await this.loadData();
  }
});
</script>

<template>
  <table-navigation/>
  <div class="flex flex-col items-center w-full">
    <my-table
        deletable
        editable
        :items="purchases"
        :columns="columns"
        @deleteRow="deletePurchase"
        @addRow="addPurchasePopup = true"
        @editRow="editPurchaseHandler"
    >
      <template v-slot:categories="{item}">
        <div>
          <chip v-if="item?.categories" v-for="category of item?.categories" :label="category.name"/>
        </div>
      </template>
    </my-table>
  </div>
  <create-purchase-popup
      v-model="addPurchasePopup"
      @update:modelValue="loadData"
  />
  <purchase-card-popup
      v-model="editPurchasePopup"
      v-model:purchase="editPurchase"
      @update:modelValue="loadData"
  />
</template>

<style scoped lang="css">
</style>
