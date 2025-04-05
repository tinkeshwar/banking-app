interface AuthStateInterface {
  user: null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  abort: AbortController | null;
}


export const useAuthStore = defineStore("auth-store", {
  state: (): AuthStateInterface => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    abort: null,
  }),
  persist: {
    key: 'banking-app',
    storage: sessionStorage,
    pick: ['accessToken', 'refreshToken', 'user'],
  },
  actions: {
    async login (username: string, password: string, type: string): Promise<void> {
      this.loading = true;
      this.abort = new AbortController();
      const { $auth } = useNuxtApp() as any;
      const response = await $auth.login({ username, password, user_type: type}, this.abort.signal);
      if(response && response.error){
        this.error = response.error;
      } else {
        console.log(response.data);
        this.accessToken = response.data?.access_token as string;
        this.refreshToken = response.data?.refresh_token as string;
        this.user = response.data?.user as any;
      }
      this.loading = false;
    },

    async refresh (): Promise<string> {
      this.loading = true;
      this.abort = new AbortController();
      const { $auth } = useNuxtApp() as any;
      const response = await $auth.refresh({token: this.refreshToken}, this.abort.signal);
      if(response && response.error){
        this.error = response.error;
      } else {
        this.accessToken = response.data?.access_token as string;
        this.refreshToken = response.data?.refresh_token as string;
      }
      this.loading = false;
      return this.accessToken as string;
    },
    resetStore () {
      this.accessToken = null;
      this.refreshToken = null;
      this.loading = false;
      this.error = null;
      this.abort = null;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
  },
})
