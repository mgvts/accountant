<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import themePicker from "~/components/recources/themePicker.vue";
import GithubIcon from "~/components/recources/githubIcon.vue";

export default defineNuxtComponent({
  name: "myHeader",
  components: {GithubIcon, themePicker},
  data(){
    return {
      links: [{
        label: 'Home',
        to: '/',
        icon: 'i-heroicons-home'
      },
        {
          label: 'Account',
          to: '/account',
        },
      ],
    }
  }
})
</script>

<template>
  <header class="border-b px-10 py-3 flex items-center justify-between gap-3">
    <div class="items-center">
      <logo/>
    </div>
    <div class="w-auto">
      <UHorizontalNavigation :links="links"/>
    </div>
    <div class="flex flex-row">
      <theme-picker/>
      <github-icon/>
    </div>
  </header>

</template>

<style scoped>

</style>