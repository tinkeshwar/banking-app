<script setup lang="ts">
import { schema } from '~/utils/schemas/members.schema';
import type { UForm } from '~/.nuxt/components';
import type { FormSubmitEvent } from '@nuxt/ui';

  useSeoMeta({
    title: 'Add Member Page'
  });

  const formReference = ref<any|null>(null)
  
  const state = reactive({
    first_name: undefined,
    middle_name: undefined,
    last_name: undefined,
    guardian: undefined,
    relation_with_guardian: '',
    date_of_birth: undefined,
    gender: undefined,
    marital_status: undefined,
    email: undefined,
    mobile: undefined,
    alternate_number: undefined,
    department: undefined,
    staff_type: undefined,
    income: undefined,
    employment_status: undefined
  });

  watch(() => state.marital_status, (newVal) => {
    if(newVal && ['Married', 'Widowed'].includes(newVal)){
      state.relation_with_guardian = 'Spouse'
    } else {
      state.relation_with_guardian = 'Father'
    }
  })
  const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
    console.log(event);
  };

  const submitForm = () => (formReference.value) ? formReference.value.submit() : null;
  const clearForm = () => (formReference.value) ? formReference.value.clear() : null;
</script>

<template>
  <UCard>
    <template #header>
      <h1 class="text-sm font-bold">Add Member</h1>
    </template>
    <UForm ref="formReference" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <div class="grid grid-cols-3 gap-4">
        <UFormField name="first_name">
            <UInput v-model="state.first_name" placeholder="First Name" class="w-full" />
          </UFormField>
          <UFormField name="middle_name">
            <UInput v-model="state.middle_name" placeholder="Middle Name" class="w-full" />
          </UFormField>
          <UFormField name="last_name">
            <UInput v-model="state.last_name" placeholder="Last Name" class="w-full" />
          </UFormField>
          <UFormField name="marital_status">
            <USelect
              v-model="state.marital_status" 
              placeholder="Marital Status"
              :items="['Single', 'Married', 'Divorced', 'Widowed']"
              class="w-full" 
            />
          </UFormField>
          <UFormField name="guardian">
            <UInput v-model="state.guardian" :placeholder="`${state.relation_with_guardian} Name`" class="w-full" />
          </UFormField>
          <UFormField name="date_of_birth">
            <UInput v-model="state.date_of_birth" type="date" placeholder="Date of Birth" class="w-full" />
          </UFormField>
          <UFormField name="gender">
            <USelect
              v-model="state.gender" 
              placeholder="Gender"
              :items="['Male', 'Female', 'Transgender']"
              class="w-full" 
            />
          </UFormField>
          <UFormField name="email">
            <UInput v-model="state.email" type="email" placeholder="Email" class="w-full" />
          </UFormField>
          <UFormField name="mobile">
            <UInput v-model="state.mobile" placeholder="Mobile" class="w-full" />
          </UFormField>
          <UFormField name="alternate_number">
            <UInput v-model="state.alternate_number" placeholder="Alternate Number" class="w-full" />
          </UFormField>
          <UFormField name="department">
            <UInput v-model="state.department" placeholder="Department" class="w-full" />
          </UFormField>
          <UFormField name="staff_type">
            <UInput v-model="state.staff_type" placeholder="Staff Type" class="w-full" />
          </UFormField>
          <UFormField name="income">
            <UInput v-model="state.income" type="number" placeholder="Income" class="w-full" />
          </UFormField>
          <UFormField name="employment_status">
            <USelect
              v-model="state.employment_status" 
              placeholder="Employment Status"
              :items="['Active', 'Retired', 'Resigned', 'Terminated']"
              class="w-full" 
            />
          </UFormField>
      </div>
    </UForm>     
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton label="Add Member" color="primary" @click="submitForm" icon="i-heroicons-plus" />
        <UButton label="Clear" color="secondary" @click="clearForm" icon="i-heroicons-x-mark" />
      </div>
    </template> 
  </UCard>
</template>
