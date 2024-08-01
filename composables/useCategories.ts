// useCategories.ts
import { useNuxtApp } from '#app';
import {collection, addDoc, query, where, getDocs, deleteDoc, doc, getDoc} from 'firebase/firestore';
import { ref, computed } from 'vue';
import type {Category, Purchase} from '~/types';

export default function useCategories() {
    const { $firebaseDb, $firebaseAuth } = useNuxtApp();
    const categories = ref([] as Category[]);

    const user = computed(() => {
        const authUser = $firebaseAuth.currentUser;
        return authUser ? authUser.uid : null;
    });

    const fetchCategories = async () => {
        if (!user.value) return;
        const q = query(collection($firebaseDb, 'categories'), where('userId', '==', user.value));
        const querySnapshot = await getDocs(q);
        categories.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return categories
    };

    const createCategory = async (name: string, description: string = '') => {
        if (!user.value) return;
        await addDoc(collection($firebaseDb, 'categories'), {
            name,
            description,
            userId: user.value,
            timeCreate: new Date().toISOString(),
        });
        await fetchCategories();
    };

    const deleteCategory = async (categoryId: string) => {
        if (!user.value) return;
        const categoryRef =  doc($firebaseDb, 'categories', categoryId);
        await deleteDoc(categoryRef);
        await fetchCategories();
    };

    const getCategory = async (categoryId: string) => {
        if (!user.value) return;
        const categoryRef = doc($firebaseDb, 'categories', categoryId);
        const categorySnapshot = await getDoc(categoryRef);
        if (categorySnapshot.exists()) {
            return {id: categorySnapshot.id, ...categorySnapshot.data()} as Purchase;
        } else {
            return null; // Handle the case where the document does not exist
        }
    };

    return {
        categories,
        fetchCategories,
        createCategory,
        deleteCategory,
        getCategory,
    };
}
