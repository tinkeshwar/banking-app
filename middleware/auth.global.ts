export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  if (to.path === "/login") {
    return;
  }

  if (!authStore.isLoggedIn) {
    return navigateTo("/login");
  }
});
