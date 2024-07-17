import { defineNuxtPlugin } from '#app';
import { useIndexedDB } from '@/composables/IndexedDB';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('dexie', useIndexedDB());
});
