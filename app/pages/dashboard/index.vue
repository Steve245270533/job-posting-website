<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-8">控制台</h1>

    <div class="grid gap-8 md:grid-cols-2">
      <div>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-900">发布职位</h2>
          <NuxtLink
            to="/jobs/post"
            class="text-green-600 hover:text-green-700 font-medium"
          >
            发布新职位
          </NuxtLink>
        </div>

        <div class="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
          <p
            v-if="postedJobs.length === 0"
            class="p-6 text-gray-500 text-center"
          >
            您还没有发布任何职位。
          </p>
          <template v-else>
            <div v-for="job in postedJobs" :key="job.id" class="p-6">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-1">
                    {{ job.title }}
                  </h3>
                  <p class="text-gray-600 mb-2">{{ job.company }}</p>
                  <div class="flex items-center text-sm text-gray-500">
                    <span>{{ job.location }}</span>
                    <span class="mx-2">•</span>
                    <span>{{ job.type }}</span>
                    <span class="mx-2">•</span>
                    <span>
                      {{
                        formatDistanceToNow(new Date(job.postedAt), {
                          addSuffix: true,
                          locale: zhCN,
                        })
                      }}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {{ job._count.applications }} 人申请
                  </span>
                </div>
              </div>
              <div class="mt-4 flex justify-end space-x-4">
                <NuxtLink
                  :to="`/jobs/${job.id}`"
                  class="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  查看职位
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">你的申请</h2>

        <div class="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
          <p
            v-if="applications.length === 0"
            class="p-6 text-gray-500 text-center"
          >
            您还没有申请任何职位。
          </p>
          <template v-else>
            <div
              v-for="application in applications"
              :key="application.id"
              class="p-6"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-1">
                    {{ application.job.title }}
                  </h3>
                  <p class="text-gray-600 mb-2">
                    {{ application.job.company }}
                  </p>
                  <div class="flex items-center text-sm text-gray-500">
                    <span>{{ application.job.location }}</span>
                    <span class="mx-2">•</span>
                    <span>{{ application.job.type }}</span>
                    <span class="mx-2">•</span>
                    <span>
                      Applied{" "}
                      {{
                        formatDistanceToNow(new Date(application.appliedAt), {
                          addSuffix: true,
                          locale: zhCN,
                        })
                      }}
                    </span>
                  </div>
                </div>
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="
                    application.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800'
                      : application.status === 'ACCEPTED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                  "
                >
                  {{ application.status }}
                </span>
              </div>
              <div class="mt-4 flex justify-end">
                <NuxtLink
                  :to="`/jobs/${application.job.id}`"
                  class="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  查看职位
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";

const { user } = useUserSession();

const { data: applicationsRawData } = useFetch(
  `/api/application/${user.value?.id}`,
);
const { data: postedJobsRawData } = useFetch(
  `/api/jobs/findJobByUser/${user.value?.id}`,
);

const applications = computed(() => applicationsRawData.value?.data ?? []);
const postedJobs = computed(() => postedJobsRawData.value?.data ?? []);
</script>
