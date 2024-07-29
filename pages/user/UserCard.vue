<script lang="ts">
import { defineNuxtComponent } from 'nuxt/app';
import type { PropType } from "vue";
import type { User, Category, Purchase } from "~/composables/types";
import PurchaseCardPopup from "~/components/popups/purchaseCardPopup.vue";
import {useNuxtApp} from "#app";
import type {IDBService} from "~/composables/IndexedDB";

export default defineNuxtComponent({
  name: "UserCard",
  components: { PurchaseCardPopup },
  props: {
    user: Object as PropType<User>
  },
  data() {
    return {
      isOpen: false,
      selectedPurchase: null as Purchase | null,
      categories: [] as Category[],
      purchases: [] as Purchase[]
    }
  },
  computed: {
    $dexie() {
      return useNuxtApp().$dexie as IDBService
    },
    isRowLayout() {
      return (this.user?.name?.length || 0) < 50 && (this.user?.id?.toString().length || 0) < 50;
    },
  },
  methods: {
    openPurchasePopup(purchase: Purchase) {
      this.selectedPurchase = purchase;
      this.isOpen = true;
    },
    async fetchCategories() {
      return await this.$dexie.getAllCategories()
    },
    async fetchPurchases() {
      return (await this.$dexie.getAllPurchases())
          .filter(p => p.userId == this.user?.id)
    }
  },
  async created() {
    this.categories = await this.fetchCategories()
    this.purchases = await this.fetchPurchases()
  }
});
</script>

<template>
  <Card class="container h-full w-full p-5">
    <template v-slot:header>
      <div class="font-semibold text-xl">
        User Info
      </div>
    </template>
    <template v-slot:content>
      <div :class="['flex gap-5', isRowLayout ? 'flex-row' : 'flex-col']">
        <div>
          Name: {{ user?.name }}
        </div>
        <div>
          ID: {{ user?.id }}
        </div>
      </div>
      <div class="flex flex-row mt-5">
        <div class="flex-1">
          <h3>User Categories</h3>
          <div class="flex flex-wrap gap-2">
            <Chip v-for="category of categories" :key="category.id" :label="category.name" v-tooltip="category.description" />
          </div>
        </div>
        <div class="flex-1">
          <h3>User Purchases</h3>
          <div class="flex flex-col gap-2">
            <div v-for="purchase of purchases" :key="purchase.id" class="flex justify-between items-center">
              <span>{{ purchase.name }} - {{ purchase.value }} {{ purchase.currency }}</span>
              <Button @click="openPurchasePopup(purchase)">Edit</Button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
  <PurchaseCardPopup v-model="isOpen" v-model:purchase="selectedPurchase" />
</template>

<style scoped>
</style>
