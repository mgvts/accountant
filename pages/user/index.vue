<script setup lang="ts">
import {useNuxtApp} from "#app";
import UserCreatePopup from "~/components/popups/userCreatePopup.vue";

const {$dexie} = useNuxtApp()
</script>

<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import {useNuxtApp} from '#app';
import {IDBService} from "~/composables/IndexedDB";

export default defineNuxtComponent({
  name: "",
  data() {
    return {
      createUserModal: false,
      users: null,
      currentUser: null
    }
  },
  computed: {
    async userName() {
      return await this.$dexie.getAllUsers()
    }
  },
  methods: {
    createUser() {
      this.createUserModal = true
    }
  },
  async created() {
    this.users = await this.$dexie.getAllUsers()
    this.currentUser = this.users[0]
  }
})
</script>

<template>
  <div>
    <UCard class="p-5" :ui="{border: '1px solid'}">
      <template v-slot:header>
        User Info
      </template>
      <template v-slot:default>
        <div>
          {{ currentUser }}
        </div>
      </template>
    </UCard>
    <UButton @click="createUser">Create User</UButton>
    <user-create-popup v-model="createUserModal"/>
  </div>
</template>

<style scoped>

</style>