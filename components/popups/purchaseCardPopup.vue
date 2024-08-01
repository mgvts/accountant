<script lang="ts">
import BasicPopup from "~/components/popups/basicPopup.vue";
import type {Purchase} from "~/types";
import type {PropType} from "vue";

export default defineNuxtComponent({
  name: 'PurchaseCardPopup',
  components: {BasicPopup},
  setup() {
    const {editPurchase} = usePurchases()
    const {categories, fetchCategories} = useCategories()
    return {editPurchase, categories, fetchCategories}
  },
  props: {
    //seems it may be collapsed
    modelValue: {
      type: Boolean,
      default: false
    },
    purchase: {
      type: Object as PropType<Purchase>,
      default: null,
      nullable: true
    },
  },
  computed: {
    model: {
      get() {
        return this.modelValue
      },
      set(val: boolean) {
        this.$emit("update:modelValue", val)
      }
    },
    currentPurchase: {
      get(): Purchase {
        return this.purchase
      },
      set(newPurchase: Purchase): void {
        this.$emit('update:purchase', newPurchase)
      }
    }
  },
  methods: {
    async savePurchase() {
      if (!this.currentPurchase && !this.currentPurchase?.id) return
      if (this.validate()) {
        console.log({
          ...this.currentPurchase,
          categoryIds: this.currentPurchase.categories.map(c => c.id)
        })
        await this.editPurchase(this.currentPurchase.id, {
          ...this.currentPurchase,
          categoryIds: this.currentPurchase.categories.map(c => c.id)
        })
        this.model = false
        this.$toast.add({
          severity: 'info',
          detail: `Purchase ${this.currentPurchase.name} successfully edited`,
          life: 3000,
        });
      }
    },
    validate() {
      const p = this.currentPurchase
      return p.name && p.name.length > 4 && p.value != null
    }
  },
  async created() {
    await this.fetchCategories()
  }
});
</script>

<template>
  <basic-popup v-model="model">
    <template v-slot:header>
      Edit Purchase
    </template>
    <div class="flex justify-between flex-col gap-5">
      <InputText
          class="w-9/12"
          v-model="currentPurchase.name"
          type="text"
          placeholder="Enter purchase name"
      />
      <div class="flex flex-row">
        <InputNumber v-model="currentPurchase.value" placeholder="Enter value"/>
        <Select v-model="currentPurchase.currency" :options="['$', '₽']"/>
      </div>
      <multi-select
          v-model="currentPurchase.categories"
          :options="categories"
          @click="fetchCategories"
          filter
          optionLabel="name"
          placeholder="Select Categories"
          display="chip"
      />
      <Button
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
