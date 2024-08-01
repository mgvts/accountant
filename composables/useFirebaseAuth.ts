import {onAuthStateChanged, signOut, type User} from 'firebase/auth'
import {GoogleAuthProvider, signInWithPopup} from "@firebase/auth";

export default function () {
    const {$firebaseAuth} = useNuxtApp()

    const user = useState<User | null>("fb_user", () => $firebaseAuth.currentUser)

    onAuthStateChanged($firebaseAuth, (newUser) => {
        user.value = newUser
    })


    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt: 'select_account'});

    const getCurrentUser = (): Promise<User | null> => {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged($firebaseAuth, (user) => {
                unsubscribe(); // unsubscribe immediately since we only need it once
                resolve(user);
            }, reject);
        });
    }
    const signInWithPopupGoogle = async (): Promise<User | false> => {
        try {
            const userCreds = await signInWithPopup($firebaseAuth, provider)
            if (userCreds) {
                user.value = userCreds.user
                return userCreds.user
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error)
            }
            return false
        }
        return false
    }

    const logout = async () => {
        try {
            await signOut($firebaseAuth)
            user.value = null
            return true
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error)
            }
            return false
        }
    }

    return {
        user,
        signInWithPopupGoogle,
        getCurrentUser,
        logout,
    }
}