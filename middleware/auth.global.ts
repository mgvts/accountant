export default defineNuxtRouteMiddleware(async (to, from) => {
    const {getCurrentUser } = useFirebaseAuth()
    const user = await getCurrentUser()
    const allowedRoutes = ['/', '/login']
    if (!user && !allowedRoutes.includes(to.path)) {
        return navigateTo('/login')
    }
})