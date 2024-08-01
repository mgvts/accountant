<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app';
import {object, string, number} from 'yup';
import type {Category, User} from '@/types';
import usePurchases from '~/composables/usePurchases';
import BasicPopup from "~/components/popups/basicPopup.vue";

export default defineNuxtComponent({
  name: 'CreatePurchasePopup',
  components: {BasicPopup},
  setup() {
    const {createPurchase, fetchPurchases} = usePurchases()
    const {categories, fetchCategories} = useCategories()
    return {createPurchase, fetchPurchases, categories, fetchCategories}
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      schema: object({
        name: string().min(4, 'Name must be at least 4 characters')
            .max(20, 'Name must be at max 20 characters')
            .required('This field must be filled'),
        value: number().required('This field must be filled'),
        currency: string().required('This field must be filled'),
      }),
      state: {
        name: '' as string,
        value: null as null | number,
        currency: '₽',
        categories: [] as Category[],
      },
    };
  },
  computed: {
    model: {
      get() {
        return this.modelValue
      },
      set(val: boolean) {
        this.cleanData();
        console.log('update')
        this.$emit('update:modelValue', val);
      }
    }
  },
  methods: {
    cleanData() {
      this.state.name = '';
      this.state.value = null;
      this.state.categories = [];
    },
    async create() {
      this.loading = true;
      const {name, value, currency, categories} = this.state;
      console.log({name, value, currency, categories})
      if (!value) return
      await this.createPurchase({
        name, value, currency, categoryIds: categories.map(c => c.id)
      })
      this.model = false
      this.$toast.add({
        severity: 'info',
        detail: `Purchase ${name} successfully added`,
        life: 3000,
      });
      this.loading = false;
    },
  }
});
</script>

<template>
  <basic-popup v-model="model">
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
        <InputNumber v-model="state.value" placeholder="Enter value"/>
        <Select v-model="state.currency" :options="['$', '₽']"/>
      </div>
      <multi-select
          v-model="state.categories"
          :options="categories"
          @click="fetchCategories"
          filter
          optionLabel="name"
          placeholder="Select Categories"
          display="chip"
      />
      <Button
          :loading="loading"
          type="submit"
          @click="create"
      >
        Create
      </Button>
    </div>
  </basic-popup>
</template>

<style scoped>
</style>
