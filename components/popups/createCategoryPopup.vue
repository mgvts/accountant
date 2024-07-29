<script lang="ts">
import { defineNuxtComponent } from 'nuxt/app'
import { object, string } from 'yup'
import useCategories from '~/composables/useCategories'
import BasicPopup from "@/components/popups/basicPopup";

export default defineNuxtComponent({
  name: 'createCategoryPopup',
  components: {BasicPopup},
  setup() {
    const { createCategory, fetchCategories } = useCategories()
    return { createCategory, fetchCategories }
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    model: {
      get() {
        console.log(this.modelValue)
        return this.modelValue
      },
      set(val: any) {
        return this.$emit('update:modelValue', val)
      }
    }
  },
  data() {
    return {
      loading: false,
      schema: object({
        name: string()
            .min(4, 'name must be at least 4 characters')
            .max(20, 'name must be at max 20 characters')
            .required('this field must be filled')
      }),
      state: {
        name: undefined as undefined | string,
        description: undefined as undefined | string
      }
    }
  },
  methods: {
    async create() {
      this.loading = true
      const { description, name } = this.state
      if (!name) return
      await this.createCategory(name, description)
      this.$emit('update:modelValue', false)
      this.$toast.add({
        severity: 'info',
        detail: `Category ${name} successfully added`,
        life: 3000
      })
      this.loading = false
    }
  }
})
</script>

<template>
  <basic-popup v-model="model">
    <template v-slot:header>
      Add Category
    </template>
    <div class="flex justify-between flex-col gap-5">
      <InputText
          class="w-9/12"
          v-model="state.name"
          type="text"
          placeholder="Enter category name"
      />
      <Textarea
          v-model="state.description"
          optionLabel="name"
          placeholder="Add description"
          autoResize
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
