<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import themePicker from "~/components/recources/themePicker.vue";
import GithubIcon from "~/components/recources/githubIcon.vue";

export default defineNuxtComponent({
  name: "myHeader",
  components: {GithubIcon, themePicker},
  setup() {
    const {user, logout} = useFirebaseAuth()
    return {user, logout}
  },
  data() {
    return {
      links: [{
        label: 'Home',
        route: '/',
        // command: () => this.$router.push('/'),
        icon: 'pi pi-home'
      },
        {
          label: 'User',
          icon: 'pi pi-user',
          route: '/user',
          // command: () => this.$router.push('/user'),
        },
      ],
    }
  },
  computed: {
    getSignIcon(): string {
      return this.user ? 'pi pi-sign-out' : 'pi pi-sign-in'
    },
    getSignTitle(): string {
      return this.user ? 'logout' : 'login'
    }
  },
  methods: {
    async signAction() {
      if (this.user) {
        return await this.logout()
      }
      await this.$router.push('/login')
    }
  }
})
</script>

<template>
  <header class="border-b px-10 py-3 flex items-center justify-between gap-3 h-20">
    <div class="items-center">
      <logo/>
    </div>
    <div class="w-auto">
      <Menubar :model="links" class="p-0">
        <template v-slot:item="{item, props}">
          <div class="bg-green-500 rounded-md" style="margin: -8px -12px">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon"/>
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
          </div>
        </template>
      </Menubar>
    </div>
    <div class="flex flex-row gap-2">
      <theme-picker/>
      <Button :icon="getSignIcon" @click="signAction" :title="getSignTitle"/>
    </div>
  </header>

</template>

<style scoped>

</style>