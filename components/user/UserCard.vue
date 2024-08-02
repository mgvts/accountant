<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app';
import type {PropType} from "vue";
import type {User, Category, Purchase} from "~/composables/types";
import PurchaseCardPopup from "~/components/popups/purchaseCardPopup.vue";
import {useNuxtApp} from "#app";
import type {IDBService} from "~/composables/IndexedDB";
import CreatePurchasePopup from "~/components/popups/createPurchasePopup.vue";
import CreateCategoryPopup from "~/components/popups/createCategoryPopup.vue";

export default defineNuxtComponent({
  name: "UserCard",
  components: {PurchaseCardPopup, CreateCategoryPopup, CreatePurchasePopup},
  setup() {
    const {user} = useFirebaseAuth()
    const {fetchPurchases, purchases} = usePurchases()
    const {fetchCategories, categories} = useCategories()

    return {user, fetchPurchases, purchases, fetchCategories, categories}
  },
  data() {
    return {
      addPurchasePopup: false,
      addCategoryPopup: false,
      editPurchasesPopup: false,
    }
  },
  computed: {},
  methods: {
    async loadData() {
      await this.fetchCategories()
      await this.fetchPurchases()
    },
    editPurchase(purchase: Purchase) {
      this.editPurchasesPopup = true
      this.selectedPurchase = purchase
    }
  },
  async created() {
    await this.loadData()
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
      <div class="flex flex-row items-start gap-5">
        <div class="w-24 h-24 outline outline-gray-400 flex items-center justify-center">
          <img v-if="user?.photoURL" :src="user?.photoURL" />
          <div v-else class=" ">No photo</div>
        </div>
        <div class="">
          <div>
            <span class="font-bold">Name: </span>{{ user?.displayName||'guest' }}
          </div>
          <div v-if="user?.email">
            <span class="font-bold">Email: </span>{{ user?.email }}
          </div>
        </div>
      </div>


      <div class="flex flex-row mt-5 gap-5">
        <div class="flex-1">
          <div class="font-semibold text-xl mb-3">Categories</div>
          <div class="flex flex-wrap gap-2">
            <Chip v-for="category of categories" :key="category.id" :label="category.name"
                  v-tooltip="category.description"
            />
          </div>
          <div class="flex justify-center mt-5">
            <Button
                @click="addCategoryPopup = true"
            >
              Create
            </Button>
          </div>
        </div>
        <div class="flex-1">
          <div class="font-semibold text-xl mb-3">Purchases</div>
          <div class="flex flex-col gap-2">
            <div v-for="purchase of purchases" :key="purchase.id" class="flex justify-between items-center">
              <span>{{ purchase.name }} - {{ purchase.value }} {{ purchase.currency }}</span>
              <Button @click="editPurchase(purchase)">Edit</Button>
            </div>
          </div>
          <div class="flex justify-center mt-5">
            <Button
                @click="addPurchasePopup = true"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </template>
  </Card>
  <create-purchase-popup
      v-model="addPurchasePopup"
      @update:modelValue="loadData"
  />
  <purchase-card-popup
      v-model="editPurchasesPopup"
      v-model:purchase="selectedPurchase"
      @update:modelValue="loadData"
  />
  <create-category-popup
      v-model="addCategoryPopup"
      @update:modelValue="loadData"
  />
</template>

<style scoped>
</style>
