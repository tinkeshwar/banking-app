<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const authStore = useAuthStore() 

const logOut = () => {
  authStore.resetStore()
  navigateTo('/login')
}

const left = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Menu',
      type: 'label'
    },
    {
      label: 'Analytics',
      icon: 'material-symbols:bar-chart-4-bars-rounded',
      to: '/'
    },
    {
      label: 'Banking',
      icon: 'material-symbols:account-balance-outline',
      children: [
        {
          label: 'Members',
          icon: 'material-symbols:user-attributes',
          children: [
            {
              label: 'Add Member',
              icon: 'material-symbols:add',
              to: '/banking/members/add'
            },
            {
              label: 'View Members',
              icon: 'material-symbols:view-list-outline',
              to: '/banking/members'
            },
            {
              label: 'Import Members',
              icon: 'material-symbols:list-alt-add',
              to: '/banking/members/import'
            },
          ]
        },
        {
          label: 'Account',
          icon: 'material-symbols:account-balance-rounded',
          children: [
            {
              label: 'Add Account',
              icon: 'material-symbols:add',
              to: '/banking/accounts/add'
            },
            {
              label: 'View Accounts',
              icon: 'material-symbols:view-list-outline',
              to: '/banking/accounts'
            }
          ]
        },
        {
          label: 'Transactions',
          icon: 'material-symbols:swap-horiz-rounded',
        }
      ]
    },
    {
      label: 'Settings',
      icon: 'material-symbols:settings-rounded',
    }
  ]
]);

const top = ref<NavigationMenuItem[][]>([
  [],
  [
    {
      label: 'Account',
      icon: 'mdi:account-arrow-down-outline',
      active: true,
      children: [
        {
          label: 'Tinkeshwar Singh',
          icon: 'mdi:account-box',
        },
        {
          label: 'Logout',
          icon: 'mdi:logout',
          onSelect: () => logOut()
        }
      ]
    }
  ]
])
</script>
<template>
  <div class="flex min-h-screen">
    <!-- Navigation Menu -->
    <div class="flex-shrink-0 px-4 py-2 bg-white dark:bg-gray-800 shadow-xl">
      <div class="space-y-4">
        <div class="text-lg font-semibold">Banking System</div>
        <USeparator orientation="horizontal" />
        <UNavigationMenu orientation="vertical" :items="left" class="data-[orientation=vertical]:w-60" />
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 ">
      <div class="space-x-4 bg-white dark:bg-gray-800 shadow-xl">
        <UNavigationMenu content-orientation="vertical" color="neutral" variant="link" :items="top" class="w-full" />
      </div>
      <div class="p-2 m-2 bg-white dark:bg-gray-800 shadow-xl">
        <slot />
      </div>
    </div>
  </div>
</template>