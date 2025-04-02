<script setup lang="ts">
import { schema } from '~/utils/schemas/login.schema'

  definePageMeta({
    layout: false
  });

  useSeoMeta({
    title: 'Banking App Login'
  })

  const authStore = useAuthStore();
  const loading = computed(() => authStore.loading);
  const router = useRouter();

  const state = reactive({
    username: undefined,
    password: undefined
  });

  const onSubmit = async (event: any) => {
    const { username, password } = event.data;
    await authStore.login(username, password, 'admin');
    router.push('/');
  }

  onMounted(() => {
    if (authStore.isLoggedIn) {
      router.push('/');
    }
  });
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
        <h2 class="mb-6 text-xl">Sign in to your account</h2>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <div class="flex space-x-4">
            <UFormField name="username" class="flex-1">
              <UInput 
                v-model="state.username" 
                icon="mdi:account"
                type="text"
                placeholder="Enter your username"
                class="w-full"
              />
            </UFormField>
            <UFormField name="password" class="flex-1">
              <UInput 
                v-model="state.password"
                icon="mdi:form-textbox-password"
                type="password" 
                placeholder="Enter your password"
                class="w-full"
              />
            </UFormField>
          </div>
          <UButton 
            trailing-icon="mdi:login"
            :loading="loading"
            type="submit"
            color="primary"
            class="w-full justify-center"
          >
            Sign in
          </UButton>
        </UForm>
      </div>
    </div>
  </div>
</template>
