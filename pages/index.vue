<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import myHeader from "~/components/myHeader.vue";
import MyTable from "~/components/table/myTable.vue";

export default defineNuxtComponent({
  name: "",
  components: {MyTable, myHeader},
  data() {
    return {

    }
  }
})
</script>

<template>
  <my-header/>
  <my-table/>
<!--  <div>-->
<!--    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800"/>-->
<!--    <div>-->
<!--<themePicker/>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style scoped>

</style>