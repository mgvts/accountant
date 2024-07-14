<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import myHeader from "~/components/myHeader.vue";

export default defineNuxtComponent({
  name: "",
  components: {myHeader},
  data() {
    return {

    }
  }
})
</script>

<template>
  <my-header/>
<!--  <div>-->
<!--    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800"/>-->
<!--    <div>-->
<!--<themePicker/>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style scoped>

</style>