// useCategories.ts
import { useNuxtApp } from '#app'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { ref, computed } from 'vue'

export default function useCategories() {
    const { $firebaseDb, $firebaseAuth } = useNuxtApp()
    const categories = ref([])

    const user = computed(() => {
        const authUser = $firebaseAuth.currentUser
        return authUser ? authUser.uid : null
    })

    const fetchCategories = async () => {
        if (!user.value) return
        const q = query(collection($firebaseDb, 'categories'), where('userId', '==', user.value))
        const querySnapshot = await getDocs(q)
        categories.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }

    const createCategory = async (name: string, description:string) => {
        if (!user.value) return
        await addDoc(collection($firebaseDb, 'categories'), {
            name,
            description,
            userId: user.value
        })
        await fetchCategories()
    }

    return {
        categories,
        fetchCategories,
        createCategory
    }
}
