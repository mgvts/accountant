<script lang="ts">
import {defineComponent} from 'vue'

export default defineNuxtComponent({
  name: "tableNavigation",
  data() {
    return {
      model: null,
      items: [
        {label: 'Categories', route: '/table/categories'},
        {label: 'Purchases', route: '/table/purchases'},
      ]
    }
  },
  computed: {
    isActive() {
      return (path: string) => {
        console.log(this.$route.path)
        console.log(path)

        return this.$route.path == path
      }
    }
  },

})
</script>

<template>
  <div class="flex justify-center w-full text-white mb-5">
    <Breadcrumb :model="items" class="h-100" :pt="{style: {color: 'green'}}">
      <template #item="{ item, props }">
        <NuxtLink :to="item.route" v-if="item.route" v-slot="{ href, navigate }" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color']"/>
            <span :class="isActive(item.route) ? 'text-green-400' : ''">{{ item.label }}</span>
          </a>
        </NuxtLink>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
  </div>
</template>

<style scoped lang="css">

</style>