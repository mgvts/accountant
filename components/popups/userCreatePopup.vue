<script setup lang="ts">
const isOpen = defineModel<Boolean>({default: false})
const {$dexie} = useNuxtApp()
</script>

<script lang="ts">
import {defineNuxtComponent, useNuxtApp} from 'nuxt/app'
import BasicPopup from "@/components/popups/basicPopup.vue";
import {object, string} from "yup";

export default defineNuxtComponent({
  name: "userCreatePopup",
  components: {BasicPopup},
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
        name: undefined
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
    async createUser() {
      this.loading = true
      if (!this.state.name) return
      await this.$dexie.putUser(this.state.name)
      this.loading = false
      this.$emit('update:modelValue', false)
      this.$toast.add(
          {
            severity: 'info',
            detail: `User ${this.state.name} successfully added`,
            life: 3000
          })
    },
    cleanData() {
      this.state.name = undefined
    }
  },
})
</script>

<template>
  <basic-popup v-model="isOpen">
    <template v-slot:header>
      Create User
    </template>
    <div class="flex justify-between">
      <InputText
          class="w-9/12"
          v-model="state.name"
          type="text"
          placeholder="Enter User name"
      />
      <Button
          :loading="loading"
          type="submit"
          @click="createUser"
      >
        Create
      </Button>
    </div>
  </basic-popup>
</template>

<style scoped>

</style>