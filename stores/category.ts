import { defineStore } from 'pinia'
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { useNuxtApp } from '#app'
import type {Category} from '@/types'

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [] as Category[],
    }),
    getters: {
        getCategory: (state) => (id: number) => state.categories.find(category => category.id === id),
        getAllCategories: (state) => state.categories,
    },
    actions: {
        async addCategory(category: Category) {
            const { $firestore } = useNuxtApp().$firebase
            const docRef = await addDoc(collection($firestore, 'categories'), category)
            this.categories.push({ ...category, id: docRef.id })
        },
        async deleteCategory(id: number) {
            const { $firestore } = useNuxtApp().$firebase
            await deleteDoc(doc($firestore, 'categories', id.toString()))
            this.categories = this.categories.filter(category => category.id !== id)
        },
        async fetchCategories() {
            const { $firestore } = useNuxtApp().$firebase
            const querySnapshot = await getDocs(collection($firestore, 'categories'))
            this.categories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Category[]
        }
    }
})
