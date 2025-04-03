<script setup lang="ts">

  const formReference = ref<any>(null)

  useSeoMeta({
    title: 'Add Member Page'
  });

  const submitForm = () => formReference?.value?.submitForm();
  const clearForm = () => formReference?.value?.clearForm();
  
</script>

<template>
  <UCard>
    <template #header>
      <h1 class="text-sm font-bold">Add Member</h1>
    </template>
    <MemberForm ref="formReference"/>
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton label="Add Member" color="primary" icon="i-heroicons-plus" @click="submitForm" />
        <UButton label="Clear" color="secondary" icon="i-heroicons-x-mark" @click="clearForm" />
      </div>
    </template> 
  </UCard>
</template>
