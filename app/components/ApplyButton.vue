<template>
  <button
    v-if="!ready"
    disabled
    class="w-full bg-green-600 text-white px-6 py-3 rounded-md opacity-50 cursor-not-allowed"
  >
    加载中...
  </button>

  <div v-if="applicationStatus === 'success'" class="text-center">
    <p class="text-green-600 font-medium mb-4">
      申请提交成功！
    </p>
    <NuxtLink
      href="/dashboard"
      class="text-blue-600 hover:text-blue-700 font-medium"
    >
      查看你的申请 →
    </NuxtLink>
  </div>
  <button
    v-else
    @click="handleApply"
    class="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
  >
    申请此职位
  </button>

  <p v-if="applicationStatus === 'error'" class="mt-2 text-red-600 text-center">
    {{ errorMessage }}
  </p>
</template>

<script setup lang="ts">
const props = defineProps<{
  jobId: string;
}>();

const applicationStatus = ref<"idle" | "success" | "error">("idle");
const errorMessage = ref("");
const { session, user, ready } = useUserSession();

const handleApply = async () => {
  if (!session.value || !user.value) {
    navigateTo("/auth/signin");
    return;
  }

  errorMessage.value = "";
  applicationStatus.value = "idle";

  try {
    const res = await $fetch(`/api/jobs/${props.jobId}/apply`, {
      method: "POST",
    });

    if (res.code === 200) {
      applicationStatus.value = "success";
    } else {
      applicationStatus.value = "error";
      errorMessage.value = res.message || "申请职位失败，请稍后再试。";
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = "申请职位失败，请稍后再试。";
    }
    applicationStatus.value = "error";
  }
};
</script>
