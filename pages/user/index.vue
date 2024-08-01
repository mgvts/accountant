<script setup lang="ts">
import {useNuxtApp} from "#app";
import UserCreatePopup from "~/components/popups/userCreatePopup.vue";

</script>

<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import type {User} from "~/composables/types";
import {useNuxtApp} from "#app";
import {IDBService} from "~/composables/IndexedDB";
import userCard from "~/components/user/UserCard.vue";

type userIndex = 'first' | 'last'

export default defineNuxtComponent({
  name: "",
  components: {userCard},
  data() {
    const {$dexie} = useNuxtApp()

    return {
      createUserModal: false,
      users: null as null | User[],
      currentUser: null as null | User,
      loading: false,
      $dexie,
      noUsers: {
        icon: 'i-heroicons-magnifying-glass-20-solid',
        label: `We couldn't find any items.`,
        queryLabel: `We couldn't find any items with that term. Please try again.`
      }
    }
  },
  methods: {
    createUser() {
      this.createUserModal = true
    },
    async fetchUsers(userIndex?: userIndex) {
      this.users = await (this.$dexie as IDBService).getAllUsers()
      if (!this.users) return
      if (userIndex) {
        if (userIndex == 'first') this.currentUser = this.users[0]
        if (userIndex == 'last') this.currentUser = this.users[this.users.length - 1]
      }
    },
  },
  async created() {
    this.loading = true
    await this.fetchUsers('first')
    this.loading = false
  }
})
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <user-card/>
  </div>
</template>

<style scoped>

</style>