<script setup lang="ts">
import {useNuxtApp} from "#app";
import UserCreatePopup from "~/components/popups/userCreatePopup.vue";

</script>

<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import type {User} from "~/composables/types";
import {useNuxtApp} from "#app";
import {IDBService} from "~/composables/IndexedDB";
import userCard from "~/pages/user/UserCard.vue";

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
  <div>
    <div class="px-14 pt-5 flex flex-row">
      <div>
        <div v-if="users?.length == 0">
          no users
        </div>
        <div v-else>
          <Listbox :options="users" optionLabel="name" v-model="currentUser">
            <template v-slot:option="{option}">
              <div :style="{maxWidth: '15rem', minWidth: '10rem'}">
                {{ option.name }}
              </div>
            </template>
          </Listbox>
        </div>
        <Button @click="createUser">Create User</Button>
      </div>
      <div class="container size-96 mx-auto">
        <user-card :user="currentUser"/>
      </div>
    </div>
  </div>
  <user-create-popup v-model="createUserModal" @update:modelValue="fetchUsers('last')"/>
</template>

<style scoped>

</style>