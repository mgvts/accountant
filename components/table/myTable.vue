<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import type {PropType} from "vue";
import CreateCategoryPopup from "~/components/popups/createCategoryPopup.vue";
import {hasSlotContent} from "~/util/slotContent";

export default defineNuxtComponent({
  name: "myTable",
  components: {CreateCategoryPopup},
  setup() {
    const {categories, fetchCategories} = useCategories()
    fetchCategories()

    return {categories}
  },
  props: {
    items: {
      type: Array as PropType<any[]>,
      required: true
    },
    columns: {
      type: Array as PropType<{ key: string, header: string, sortable: boolean }[]>, //in header may be some primeVue value
      default: () => []
    },
    deletable: {type: Boolean, default: false},
    editable: {type: Boolean, default: false},
  },
  computed: {
    filteredColumns() {
      console.log(this.columns.filter(c => c.key != 'timeCreate'))
      return this.columns.filter(c => c.key != 'timeCreate')
    },
    formattedItems() {
      return this.items.map((item) => ({
        ...item,
        timeCreate: item.timeCreate ? this.formatDate(item.timeCreate) : null,
      }));
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    hasSlotContent,
    formatDate(dateString: string) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB'); // 'dd.mm.yyyy' format
    }
  }
})
</script>

<template>
  <DataTable :value="formattedItems" responsiveLayout="scroll" class="w-9/12 mx-auto">
    <!-- Render other columns -->
    <Column
        v-for="col in filteredColumns"
        :key="col.key"
        :field="col.key"
        :header="col.header"
        :sortable="col.sortable"
    >
      <template v-slot:body="{data}" v-if="hasSlotContent($slots[col.key])">
        <slot :name="col.key" :item="data"/>
      </template>
    </Column>

    <Column field="timeCreate" header="Created" sortable>
      <template v-slot:body="slotProps">
        {{ slotProps.data.timeCreate }}
      </template>
    </Column>

    <Column>
      <template v-slot:body="slotProps">
        <div
            v-if="editable || deletable"
            class="flex justify-end items-center gap-2"
        >
          <Button
              v-if="slotProps.data && deletable"
              icon="pi pi-trash"
              class="p-button-danger p-button-sm"
              @click.prevent="$emit('deleteRow', slotProps.data)"
          />
          <Button
              v-if="slotProps.data && editable"
              icon="pi pi-pencil"
              class="p-button-info p-button-sm"
              @click.prevent="$emit('editRow', slotProps.data)"
          />
        </div>
      </template>
    </Column>
    <template v-slot:footer>
      <div class="w-full flex justify-center">
        <Button @click="$emit('addRow')" class="w-1/2">
          Add row
        </Button>
      </div>
    </template>
  </DataTable>
</template>

<style scoped>
/* Ensure delete button only shows on hover */
.DataTable .p-datatable-tbody tr:hover .p-button-danger {
  display: inline-block;
}

.DataTable .p-button-danger {
  display: none;
}
</style>