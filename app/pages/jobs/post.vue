<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">发布职位</h1>
    <form class="space-y-6" @submit="handleSubmit">
      <div>
        <label htmlFor="title" class="block text-sm font-medium text-gray-700">
          职位名称
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
      </div>

      <div>
        <label
          htmlFor="company"
          class="block text-sm font-medium text-gray-700"
        >
          公司
        </label>
        <input
          type="text"
          name="company"
          id="company"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
      </div>

      <div>
        <label
          htmlFor="location"
          class="block text-sm font-medium text-gray-700"
        >
          地址
        </label>
        <input
          type="text"
          name="location"
          id="location"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="type" class="block text-sm font-medium text-gray-700">
          职位类型
        </label>
        <select
          name="type"
          id="type"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
        >
          <option value="">选择职位类型</option>
          <option value="全职">全职</option>
          <option value="兼职">兼职</option>
          <option value="合同工">合同工</option>
          <option value="实习">实习</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="description"
          class="block text-sm font-medium text-gray-700"
        >
          职位描述
        </label>
        <textarea
          name="description"
          id="description"
          rows="{6}"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="salary" class="block text-sm font-medium text-gray-700">
          薪资 (可选)
        </label>
        <input
          type="text"
          name="salary"
          id="salary"
          placeholder="例如 8k - 10k"
          class="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        发布职位
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();

async function handleSubmit(e: Event) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget as HTMLFormElement);
  const data = {
    title: formData.get("title"),
    company: formData.get("company"),
    location: formData.get("location"),
    type: formData.get("type"),
    description: formData.get("description"),
    salary: formData.get("salary"),
  };
  const res = await $fetch("/api/jobs", {
    method: "POST",
    body: data,
  });

  if (res.code === 200) {
    toast.add({
      title: "职位发布成功！",
      color: "success",
    });
    navigateTo("/jobs")
  }
}
</script>

<style></style>
