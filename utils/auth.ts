export const getJwtToken = async () => {
  const authStore = useAuthStore();
  return authStore.accessToken;
};
