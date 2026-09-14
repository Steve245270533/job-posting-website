<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <UApp :toaster="{position: 'top-right'}">
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>

<script setup lang="ts">
</script>
