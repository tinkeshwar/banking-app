<script setup lang="ts">
import { schema } from '~/utils/schemas/members.schema';
import type { Form, FormSubmitEvent } from '@nuxt/ui';

  const formReference = ref<Form<Record<string, object>>| null>(null)

  const submitForm = () => formReference.value?.submit();
  const clearForm = () => formReference.value?.clear();

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
    employment_status: undefined,
    current: {
      line1: undefined,
      line2: undefined,
      city: undefined,
      state: undefined,
      country: undefined,
      postal_code: undefined,
    },
    permanent: {
      line1: undefined,
      line2: undefined,
      city: undefined,
      state: undefined,
      country: undefined,
      postal_code: undefined,
    }
  });

  watch(() => state.marital_status, (newVal) => {
    if(newVal && ['Married', 'Widowed'].includes(newVal)){
      state.relation_with_guardian = 'Spouse'
    } else {
      state.relation_with_guardian = 'Father'
    }
  })

  const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
    console.log(event.data);
  };

  defineExpose({ submitForm, clearForm });
</script>

<template>
  <UForm ref="formReference" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <h3 class="col-span-3 text-lg font-semibold">Personal Information</h3>
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
        <USelect v-model="state.marital_status" placeholder="Marital Status" :items="['Single', 'Married', 'Divorced', 'Widowed']" class="w-full"/>
      </UFormField>
      <UFormField name="guardian">
        <UInput v-model="state.guardian" :placeholder="`${state.relation_with_guardian} Name`" class="w-full" />
      </UFormField>
      <UFormField name="date_of_birth">
        <UInput v-model="state.date_of_birth" type="date" placeholder="Date of Birth" class="w-full" />
      </UFormField>
      <UFormField name="gender">
        <USelect v-model="state.gender" placeholder="Gender" :items="['Male', 'Female', 'Transgender']" class="w-full" />
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
        <USelect v-model="state.staff_type" placeholder="Staff Type" :items="['Superior', 'Clerk', 'Contract']" class="w-full" />
      </UFormField>
      <UFormField name="income">
        <UInput v-model="state.income" type="number" placeholder="Income" class="w-full" />
      </UFormField>
      <UFormField name="employment_status">
        <USelect v-model="state.employment_status" placeholder="Employment Status" :items="['Active', 'Retired', 'Resigned', 'Terminated']" class="w-full" />
      </UFormField>
    </div>
    <USeparator/>
    <h3 class="text-lg font-semibold">Current Address</h3>
    <div class="grid grid-cols-3 gap-4">
      <UFormField name="address_line_1">
        <UInput v-model="state.current.line1" placeholder="Address Line 1" class="w-full" />
      </UFormField>
      <UFormField name="address_line_2">
        <UInput v-model="state.current.line2" placeholder="Address Line 2" class="w-full" />
      </UFormField>
      <UFormField name="city">
        <UInput v-model="state.current.city" placeholder="City" class="w-full" />
      </UFormField>
      <UFormField name="state">
        <UInput v-model="state.current.state" placeholder="State" class="w-full" />
      </UFormField>
      <UFormField name="country">
        <UInput v-model="state.current.country" placeholder="Country" class="w-full" />
      </UFormField>
      <UFormField name="postal_code">
        <UInput v-model="state.current.postal_code" placeholder="Postal Code" class="w-full" />
      </UFormField>
    </div>
    <USeparator/>
    <h3 class="text-lg font-semibold">Permanent Address</h3>
    <div class="grid grid-cols-3 gap-4">
      <UFormField name="address_line_1">
        <UInput v-model="state.permanent.line1" placeholder="Address Line 1" class="w-full" />
      </UFormField>
      <UFormField name="address_line_2">
        <UInput v-model="state.permanent.line2" placeholder="Address Line 2" class="w-full" />
      </UFormField>
      <UFormField name="city">
        <UInput v-model="state.permanent.city" placeholder="City" class="w-full" />
      </UFormField>
      <UFormField name="state">
        <UInput v-model="state.permanent.state" placeholder="State" class="w-full" />
      </UFormField>
      <UFormField name="country">
        <UInput v-model="state.permanent.country" placeholder="Country" class="w-full" />
      </UFormField>
      <UFormField name="postal_code">
        <UInput v-model="state.permanent.postal_code" placeholder="Postal Code" class="w-full" />
      </UFormField>
    </div>
  </UForm>  
</template>
