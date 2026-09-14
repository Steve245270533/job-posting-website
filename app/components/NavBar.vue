<template>
  <UNavigationMenu :items="items" />
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { user, signOut } = useUserSession();

const items = computed<NavigationMenuItem[]>(() => {
  if (user.value) {
    return [
      { label: "职位", to: "/jobs" },
      { label: "发布职位", to: "/jobs/post" },
      { label: "控制台", to: "/dashboard" },
      { label: "退出登录", onSelect: handleLogout },
    ];
  } else {
    return [
      { label: "职位", to: "/jobs" },
      { label: "登录", to: "/auth/signin" },
    ];
  }
});

async function handleLogout() {
  await signOut({
    onSuccess: () => {
      navigateTo("/auth/signin");
    },
  });
}
</script>

<style></style>
