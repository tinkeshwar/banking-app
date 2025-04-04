<script setup lang="ts">

  useSeoMeta({
    title: 'Add Member Page'
  });

  const formReference = ref<any>(null)
  const submitForm = () => formReference?.value?.submitForm();
  const clearForm = () => formReference?.value?.clearForm();
  const toast = useToast();

  const memberStore = useMemberStore();
  const alert = computed(() => memberStore.alert)
  const loading = computed(() => memberStore.loading);

  watch(alert, (newAlert) => {
    if (newAlert) {
      toast.add(newAlert as any)
    }
  })
</script>

<template>
  <UCard>
    <template #header>
      <h1 class="text-sm font-bold">Add Member</h1>
    </template>
    <MemberForm ref="formReference"/>
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton :loading="loading" label="Add Member" color="primary" icon="i-heroicons-plus" @click="submitForm" />
        <UButton :loading="loading" label="Clear" color="secondary" icon="i-heroicons-x-mark" @click="clearForm" />
      </div>
    </template> 
  </UCard>
</template>
