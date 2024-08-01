import {useNuxtApp} from '#app';
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where} from 'firebase/firestore';
import {computed, ref} from 'vue';
import type {Purchase} from '~/types';
import useCategories from "~/composables/useCategories";

export default function usePurchases() {
    const {$firebaseDb, $firebaseAuth} = useNuxtApp();
    const purchases = ref([] as Purchase[]);

    const user = computed(() => {
        const authUser = $firebaseAuth.currentUser;
        return authUser ? authUser.uid : null;
    });

    const fetchPurchases = async () => {
        if (!user.value) return;
        const q = query(collection($firebaseDb, 'purchases'), where('userId', '==', user.value));
        const querySnapshot = await getDocs(q);
        const preparePurchases = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        const {getCategory} = useCategories()
        const loadPurchasesWithCategories = preparePurchases.map(async (purchase) => {
            const categoryData = await Promise.all(
                purchase.categoryIds.map((categoryId: string) => getCategory(categoryId))
            );
            return { ...purchase, categories: categoryData };
        });
        purchases.value = await Promise.all(loadPurchasesWithCategories);
        return purchases.value
    };

    const createPurchase = async ({
                                      name,
                                      value,
                                      currency,
                                      categoryIds,
                                  }: {
        name: string;
        value: number;
        currency: string;
        categoryIds: string[];
    }) => {
        if (!user.value) return;
        await addDoc(collection($firebaseDb, 'purchases'), {
            name,
            value,
            currency,
            userId: user.value,
            categoryIds,
            timeCreate: new Date().toISOString(),
        });
        await fetchPurchases();
    };

    const deletePurchase = async (purchaseId: string) => {
        if (!user.value) return;
        const purchaseRef = doc($firebaseDb, 'purchases', purchaseId);
        await deleteDoc(purchaseRef);
        await fetchPurchases();
    };

    // Method to edit an existing purchase
    const editPurchase = async (purchaseId: string, updatedData: Partial<Purchase>) => {
        if (!user.value) return;
        const purchaseRef = doc($firebaseDb, 'purchases', purchaseId);
        await updateDoc(purchaseRef, updatedData);
        await fetchPurchases();
    };


    const getPurchase = async (purchaseId: string) => {
        if (!user.value) return;
        const purchaseRef = doc($firebaseDb, 'purchases', purchaseId)
        const purchaseSnapshot = await getDoc(purchaseRef);
        if (purchaseSnapshot.exists()) {
            return {id: purchaseSnapshot.id, ...purchaseSnapshot.data()} as Purchase;
        } else {
            return null; // Handle the case where the document does not exist
        }
    };

    return {
        purchases,
        fetchPurchases,
        createPurchase,
        deletePurchase,
        editPurchase,
        getPurchase,
    };
}
