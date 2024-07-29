<script setup lang="ts">
import type {Purchase} from '~/composables/types';

const isOpen = defineModel<Boolean>({default: false});
const purchase = defineModel<Purchase | null>('purchase', {default: null});
</script>

<script lang="ts">
import {useNuxtApp} from '#app';
import BasicPopup from "~/components/popups/basicPopup.vue";
import type {Category, User} from '~/composables/types';
import type {IDBService} from "~/composables/IndexedDB";

export default defineNuxtComponent({
  name: 'PurchaseCardPopup',
  components: {BasicPopup},
  data() {
    return {
      users: [] as User[],
      categories: [] as Category[],
      loading: false,
      state: {
        name: this.purchase?.name || '',
        user: this.purchase?.user || null,
        value: this.purchase?.value || 0,
        currency: this.purchase?.currency || '₽',
        categories: this.purchase?.categories || []
      }
    }
  },
  computed: {
    $dexie() {
      return useNuxtApp().$dexie as IDBService
    },
    async getUser(): Promise<User> {
      console.log(this.purchase)
      return await this.$dexie.getUser(this.purchase.userId)
    }
  },
  methods: {
    async fetchUsers() {
      this.users = await this.$dexie.getAllUsers();
    },
    async fetchCategories() {
      this.categories = await this.$dexie.getAllCategories();
    },
    async cleanData() {
      this.state = {
        name: '',
        user: await this.getUser,
        value: 0,
        currency: '₽',
        categories: []
      };
    },
    async savePurchase() {
      this.loading = true;
      const {value, currency, name, user, categories} = this.state;
      if (!value || !currency || !name || !user) return;
      await this.$dexie.putPurchase(
          name,
          value,
          currency,
          user.id,
          categories.map(c => c.id)
      );
      this.isOpen = false;
      this.$toast.add({
        severity: 'info',
        detail: `Purchase ${this.state.name} successfully added`,
        life: 3000
      });
      this.loading = false;
    }
  },
  watch: {
    purchase(newPurchase) {
      if (newPurchase) {
        this.state = {
          name: newPurchase.name,
          user: newPurchase.user,
          value: newPurchase.value,
          currency: newPurchase.currency,
          categories: newPurchase.categories
        };
      } else {
        this.cleanData();
      }
    }
  },
  async mounted() {
    this.state.user = await this.getUser
  }
});
</script>

<template>
  <basic-popup v-model="isOpen">
    <template v-slot:header>
      Edit Purchase
    </template>
    <div class="flex justify-between flex-col gap-5">
      <InputText
          class="w-9/12"
          v-model="state.name"
          type="text"
          placeholder="Enter purchase name"
      />
      <div class="flex flex-row">
        <InputNumber v-model="state.value" placeholder="enter value"/>
        <Select v-model="state.currency" :options="['$', '₽']"/>
      </div>
      <Select
          v-model="state.user"
          :options="users"
          @click="fetchUsers"
          optionLabel="name"
          placeholder="Select User"
      />
      <Select
          v-model="state.categories"
          :options="categories"
          @click="fetchCategories"
          optionLabel="name"
          placeholder="Select Categories"
      />
      <Button
          :loading="loading"
          type="submit"
          @click="savePurchase"
      >
        Save
      </Button>
    </div>
  </basic-popup>
</template>

<style scoped>
</style>
