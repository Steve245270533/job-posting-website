<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="job" class="bg-white rounded-lg shadow-sm p-8">
      <div class="mb-8">
        <NuxtLink
          href="/jobs"
          class="text-green-600 hover:text-green-700 font-medium mb-4 inline-block"
        >
          ← 返回职位列表
        </NuxtLink>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ job.title }}</h1>
        <p class="text-xl text-gray-600 mb-4">{{ job.company }}</p>
        <div class="flex items-center gap-4 text-gray-500 mb-6">
          <span>{{ job.location }}</span>
          <span>•</span>
          <span>{{ job.type }}</span>
          <template v-if="job.salary">
            <span>•</span>
            <span class="text-gray-900 font-medium">{{ job.salary }}</span>
          </template>
        </div>
        <div v-if="job.postedBy" class="flex items-center text-sm text-gray-500">
          <span>发布者：{{ job.postedBy.name }}</span>
          <span class="mx-2">•</span>
          <span>
            {{
              formatDistanceToNow(new Date(job.postedAt), { addSuffix: true, locale: zhCN })
            }}
          </span>
        </div>
      </div>

      <div class="prose max-w-none">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">
          职位描述
        </h2>
        <div class="text-gray-600 whitespace-pre-wrap">
          {{ job.description }}
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-200">
        <ApplyButton :jobId="job.id" />
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      <p>Loading job details...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {formatDistanceToNow} from "date-fns";
import { zhCN } from 'date-fns/locale';

const { id } = useRoute().params;

const { data } = useFetch(`/api/jobs/${id}`, {
  method: "GET",
});

const job = computed(() => data.value?.data ?? null);
</script>
