<script setup lang="ts">
  useSeoMeta({
    title: 'Members Page'
  });

  const memberStore = useMemberStore()
  const toast = useToast()

  const loading = computed(() => memberStore.loading)
  const members = computed(() => memberStore.members)
  const meta = computed(() => memberStore.meta)
  const alert = computed(() => memberStore.alert)

  watch(alert, (newAlert) => {
    if (newAlert) {
      toast.add(newAlert as any)
    }
  })

  const onPageChange = async (page: number) => {
    await memberStore.list(page, meta.value.perPage)
  }

  onMounted(async() => {
    await memberStore.list()
  })

</script>

<template>
  <UCard>
    <template #header>
      <h1 class="text-sm font-bold">Members</h1>
    </template>
    <UTable v-if="!loading" :data="members" :loading="loading" class="flex-1" />
    <template v-if="(meta.perPage < meta.total)" #footer>
      <UPagination v-model="meta.page" :total="meta.total" :per-page="meta.perPage" @update:page="onPageChange" />
    </template>
  </UCard>
</template>
