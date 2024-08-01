<script lang="ts">
import {defineComponent} from 'vue'

export default defineNuxtComponent({
  name: "",

})
</script>

<template>
  <div class="mt-5 mx-auto w-11/12">
    <div class="font-semibold text-xl px-[16px] ">
      About This Project
    </div>
    <Accordion multiple :value="['0']">
      <AccordionPanel value="0">
        <AccordionHeader>Welcome</AccordionHeader>
        <AccordionContent>
          <div>
            Welcome to Online Accountant, a personal project designed to explore and learn the capabilities of Nuxt
            framework and some libs.
          </div>
          <div class="utility-table mx-auto">
            <div class="utility-row">
              <div class="utility-name">
                Main
              </div>
              <div class="utility-items">
                <div>
                  Nuxt 3
                </div>
              </div>
            </div>
            <div class="utility-row">
              <div class="utility-name">
                UI
              </div>
              <div class="utility-items">
                <div>
                  PrimeVue
                </div>
                <div>
                  tailwind
                </div>
              </div>
            </div>
            <div class="utility-row">
              <div class="utility-name">
                firebase
              </div>
              <div class="utility-items">
                <div>
                  @firebase/auth
                </div>
                <div>
                  @firebase/store
                </div>
              </div>
            </div>
          </div>
          <div>
            This project is a simple yet functional application focused on managing and categorizing purchases. Users
            can create categories and then associate these categories with their purchases.
          </div>
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="1">
        <AccordionHeader>Features</AccordionHeader>
        <AccordionContent>
          <div>
            Categories & Purchases
          </div>
          <div>
            <div>
              Create and manage categories that can be applied to purchase entries.
            </div>
            <div>
              Easily view and delete existing categories.
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<style scoped lang="postcss">
.utility-table {
  @apply grid grid-cols-2 gap-0 border border-gray-300 rounded-lg w-4/12;
}

.utility-row {
  @apply contents;
}

.utility-name {
  @apply flex items-center justify-center text-center;
}

.utility-items {
  @apply flex flex-col p-2;
}

/*
.utility-items div {
  @apply hover:underline hover:cursor-pointer;
}
*/

.utility-row:last-child {
  @apply border-b-0;
}
</style>