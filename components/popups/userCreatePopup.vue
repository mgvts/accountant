<script setup lang="ts">
const isOpen = defineModel<Boolean>({default: false})
const {$dexie} = useNuxtApp()
</script>

<script lang="ts">
import {defineNuxtComponent, useNuxtApp} from 'nuxt/app'
import BasicPopup from "~/components/popups/basicPopup.vue";
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
      }
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
    },
    cleanData() {
      this.state.name = undefined
    }
  },
})
</script>

<template>
  <basic-popup v-model="isOpen">
    <UCard>
      <template v-slot:header>
        Create User
      </template>
      <template v-slot:default>
        <div>
          <UForm :schema="schema" @submit="createUser" :state="state">
            <UFormGroup name="name">
              <UInput
                  v-model="state.name"
                  placeholder="Enter User name"
                  :loading="loading"
              />
            </UFormGroup>
            <UButton
                :loading="loading"
                type="submit"
            >
              Create
            </UButton>
          </UForm>
        </div>
      </template>
    </UCard>
  </basic-popup>
</template>

<style scoped>

</style>