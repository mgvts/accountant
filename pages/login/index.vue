`
<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'

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
      const u = await this.firebaseAuth.signInWithPopupGoogle()
      let message = {}
      if (u) {
        message = {severity: 'success', summary: `u registered as ${u.displayName}`}
      } else {
        message = {severity: 'error', summary: `fail to resister`}
      }
      this.$toast.add(message)
      await this.$router.push('/')
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
    <Card class="bg-gray-200 px-5 py-3 ">
      <template v-slot:header>
        <div class="text-center text-xl">
          Welcome to Online Accountant
        </div>
      </template>
      <template v-slot:content>
        <div class="mt-3 flex justify-center">
          <Button
              @click="login"
              label="continue with Google"
              icon="pi pi-google"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>

</style>