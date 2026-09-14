<template>
  <div class="space-y-8">
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">职位筛选</h1>
      <form class="grid gap-4 md:grid-cols-3">
        <input
          type="text"
          name="q"
          placeholder="搜索关键字"
          class="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
        />
        <select
          name="type"
          class="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
        >
          <option value="">全部</option>
          <option value="全职">全职</option>
          <option value="兼职">兼职</option>
          <option value="合同工">合同工</option>
          <option value="实习">实习</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="地点"
          class="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
        />
        <button
          type="submit"
          class="md:col-span-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          搜索
        </button>
      </form>
    </div>

    <div class="grid gap-6">
      <div
        v-for="job in jobs"
        key="{job.id}"
        class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">
              {{ job.title }}
            </h2>
            <p class="text-gray-600 mb-2">{{ job.company }}</p>
            <div class="flex items-center text-sm text-gray-500 mb-4">
              <span class="mr-4">{{ job.location }}</span>
              <span>{{ job.type }}</span>
            </div>
            <p class="text-gray-600 mb-4 line-clamp-2">{{ job.description }}</p>
          </div>
          <span v-if="job.salary" class="text-lg font-semibold text-gray-900 shrink-0">
            {{ job.salary }}
          </span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">
            发布者：{{ job.postedBy.name }}
          </span>
          <NuxtLink :to="`/jobs/${job.id}`" class="text-green-600 hover:text-green-700 font-medium">
            查看详情 →
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { query } = useRoute();

const { data } = useFetch("/api/jobs", {
  method: "GET",
  query: {
    ...query,
  },
});
const jobs = computed(() => data.value?.data ?? []);
</script>

<style></style>
