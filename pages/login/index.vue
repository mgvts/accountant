`
<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import useFirebaseAuth from "~/composables/useFirebaseAuth";

export default defineNuxtComponent({
  name: "",
  setup() {
    return {
      firebaseAuth: useFirebaseAuth(),
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    async login() {
      const user = await this.firebaseAuth.signInWithPopupGoogle()
      let message = {}
      if (user) {
        message = {severity: 'success', summary: `u registered as ${user.displayName}`}
        await this.$router.push('/')
      } else {
        message = {severity: 'error', summary: `fail to resister`}
      }
      this.$toast.add(message)
    },
    async guestLogin() {
      const user = await this.firebaseAuth.signInAnonymous()
      let message = {}
      if (user) {
        message = {severity: 'success', summary: `u registered as ${user?.displayName || 'guest'}`}
        await this.$router.push('/')
      } else {
        message = {severity: 'error', summary: `fail to resister`}
      }
      this.$toast.add(message)
    }
  },
  async created() {
    const user = await this.firebaseAuth.getCurrentUser()
    if (user) {
      this.$toast.add({severity: 'info', summary: `you already logged as ${user.displayName}`})
    }
  }
})
</script>

<template>
  <div class="w-full h-full flex justify-center items-center" style="min-height: calc(100vh - 67px)">
    <Card class="bg-gray-200 px-5 py-3 -mt-40">
      <template v-slot:header>
        <div class="text-center text-xl">
          Welcome to Online Accountant
        </div>
      </template>
      <template v-slot:content>
        <div class="mt-3 flex justify-center flex-col gap-5">
          <Button
              @click="login"
              label="continue with Google"
              icon="pi pi-google"
          />
          <Button
              @click="guestLogin"
              label="use guest mode"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>

</style>