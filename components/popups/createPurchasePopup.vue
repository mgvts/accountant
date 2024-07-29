<script setup lang="ts">
import BasicPopup from "~/components/popups/basicPopup.vue";

const isOpen = defineModel<Boolean>({default: false})
const {$dexie} = useNuxtApp()
</script>

<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import {object, string} from "yup";
import {IDBService} from "~/composables/IndexedDB";
import type {Category, User} from "~/composables/types";

export default defineNuxtComponent({
  name: "createPurchasePopup",
  data() {
    return {
      loading: false,
      users: [] as User[],
      categories: [] as Category[],
      schema: object({
        name: string()
            .min(4, 'name must be at least 4 characters')
            .max(20, 'name must be at max 20 characters')
            .required('this field must be filled'),

      }),
      state: {
        name: undefined as undefined | string,
        user: undefined as undefined | User,
        value: undefined as undefined | number,
        currency: '₽',
        categories: [] as Category[]
      },
    }
  },
  watch: {
    modelValue(value) {
      if (value == false) {
        this.cleanData()
      }
    }
  },
  methods: {
    async fetchUsers() {
      this.users = await (this.$dexie as IDBService).getAllUsers()
    },
    async fetchCategories() {
      this.categories = await (this.$dexie as IDBService).getAllCategories()
    },
    cleanData() {
      this.state.name = undefined
      this.state.user = undefined
      this.state.value = undefined
      this.state.categories = []
    },
    async createPurchase() {
      this.loading = true
      const {value, currency, name, user, categories} = this.state
      if (!value || !currency || !name || !user ) return
      await (this.$dexie as IDBService).putPurchase(`${name}`,
          value, currency, user.id, this.categories.map(c => c.id))
      this.$emit('update:modelValue', false)
      this.$toast.add(
          {
            severity: 'info',
            detail: `Purchase ${this.state.name} successfully added`,
            life: 3000
          })
      this.loading = false
    }
  },
})
</script>

<template>
  <basic-popup v-model="isOpen">
    <template v-slot:header>
      Add Purchase
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
          @click="createPurchase"
      >
        Create
      </Button>
    </div>
  </basic-popup>
</template>

<style scoped>

</style>