import {defineNuxtPlugin} from '#app'
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from "@firebase/firestore";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const {firebase} = config.public
    const app = initializeApp({...firebase})
    const auth = getAuth(app)
    const db = getFirestore(app)

    return {
        provide: {
            firebaseApp: app,
            firebaseAuth: auth,
            firebaseDb: db,
        }
    }
})
