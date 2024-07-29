export default defineNuxtRouteMiddleware((to, from) => {
    const {user} = useFirebaseAuth()
    const allowedRoutes = ['/', '/login']
    if (!user.value && !allowedRoutes.includes(to.path)) {
        return navigateTo('/login')
    }
})