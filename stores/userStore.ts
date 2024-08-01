// import {defineStore} from 'pinia'
// import {useNuxtApp} from '#app'
// import {getAuth, signInWithPopup, GoogleAuthProvider, signOut, type Auth, signInWithRedirect} from 'firebase/auth'
// import {useCurrentUser} from "vuefire";
//
// export const useUserStore = defineStore('user', {
//     state: () => ({
//         user: null as any,
//         fireAuth: useNuxtApp().$firebaseAuth as Auth
//     }),
//     getters: {
//         currentUser: (state) => {
//             return useCurrentUser()
//         },
//         getUser: state => {
//             return state.fireAuth
//         }
//
//     },
//     actions: {
//         async login() {
//             const provider = new GoogleAuthProvider()
//             provider.setCustomParameters({prompt: 'select_account'});
//             const result = await signInWithPopup(this.fireAuth, provider)
//             this.user = result.user
//             console.log(result)
//         },
//         async logout() {
//             await signOut(this.fireAuth)
//             this.user = null
//         },
//     }
// })
