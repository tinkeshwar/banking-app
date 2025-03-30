import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(() => {
  const pinia = usePinia()
  pinia.use(piniaPluginPersistedState)
})