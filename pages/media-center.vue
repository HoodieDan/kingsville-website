<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/no-v-html -->

<template>
  <div>
    <ContainerWrapper class="py-5">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold mb-4 text-primary-blue">Media Center</h1>
        <p class="text-lg text-gray-700 max-w-2xl mx-auto">
          Experience inspiring messages through audio and video. Watch or listen
          to recent sermons, teachings, and special events. Let these resources
          encourage your faith and deepen your walk with God.
        </p>
      </div>
      <div class="bg-grey rounded-lg p-8">
        <div class="mb-6">
          <h1 class="mb-3">Previous Messages</h1>
          <p>
            Dive into Spirit-led teachings and timeless truth. This is more than
            media. It's fuel for your walk with God and your impact in the world.
          </p>
        </div>

        <!-- Search Input -->
        <div class="w-full flex flex-col justify-center items-center mb-4">
          <h5 class="text-center !font-bold mb-2">Search Messages</h5>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search messages..."
            class="px-4 py-2 border rounded-md w-full md:!w-1/2 lg:!w-1/3 mb-6"
          />

          <!-- Tabs -->
          <div
            class="flex flex-wrap justify-center gap-x-2 gap-y-2 md:gap-x-4 border-b border-gray-300 w-full md:w-4/5 lg:w-3/4"
          >
            <div
              :class="[
                'pb-2 text-xs md:text-sm font-semibold cursor-pointer whitespace-nowrap',
                tab === 'audio'
                  ? 'text-primary-orange border-b-2 border-primary-orange'
                  : 'text-gray-500',
              ]"
              @click="switchTab('audio')"
            >
              AUDIO MESSAGES
            </div>
            <div
              :class="[
                'pb-2 text-xs md:text-sm font-semibold cursor-pointer whitespace-nowrap',
                tab === 'video'
                  ? 'text-primary-orange border-b-2 border-primary-orange'
                  : 'text-gray-500',
              ]"
              @click="switchTab('video')"
            >
              VIDEO MESSAGES
            </div>
            <div
              :class="[
                'pb-2 text-xs md:text-sm font-semibold cursor-pointer whitespace-nowrap',
                tab === 'lifeway'
                  ? 'text-primary-orange border-b-2 border-primary-orange'
                  : 'text-gray-500',
              ]"
              @click="switchTab('lifeway')"
            >
              LIFEWAY SESSIONS
            </div>
            <div
              :class="[
                'pb-2 text-xs md:text-sm font-semibold cursor-pointer whitespace-nowrap',
                tab === 'startYourDay'
                  ? 'text-primary-orange border-b-2 border-primary-orange'
                  : 'text-gray-500',
              ]"
              @click="switchTab('startYourDay')"
            >
              START YOUR DAY RIGHT
            </div>
          </div>
        </div>

        <div>
          <LoadingSpinner v-if="pending || audioPending || lifewayPending || startYourDayPending" />

          <div v-else>
            <!-- Empty State Message -->
            <div v-if="filteredItems.length === 0" class="text-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16 mx-auto mb-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              <h4 class="!text-gray-700 !font-semibold mb-2">No Content Available Yet</h4>
              <p class="!text-gray-600">
                We're working on adding new content to this section. Please check back soon for inspiring messages and teachings!
              </p>
            </div>

            <!-- Video and Lifeway Grid -->
            <div
              v-else-if="tab === 'video' || tab === 'lifeway'"
              class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div
                v-for="item in filteredItems"
                :key="item.id"
                class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <!-- Embed video -->
                <div
                  v-if="item.primary.embed_link && item.primary.embed_link[0]?.text"
                  class="aspect-video w-full"
                  v-html="getResponsiveEmbed(item.primary.embed_link[0].text)"
                ></div>

                <!-- Content -->
                <div class="p-4 flex flex-col gap-2">
                  <p class="text-sm text-gray-500">
                    {{ formatDate(item.primary.date) }}
                  </p>
                  <h5 class="!font-semibold text-primary-blue">
                    {{ item.primary.message_title }}
                  </h5>
                  <p class="text-gray-600">
                    Minister: {{ item.primary.minister }}
                  </p>
                  <p class="text-gray-700">
                    {{ item.primary.description }}
                  </p>
                  <p v-if="item.primary.scriptures" class="text-gray-500 mt-2">
                    Scriptures:
                    {{ item.primary.scriptures }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Audio Messages Player -->
            <div v-else-if="tab === 'audio' || tab === 'startYourDay'">
              <AudioMessagesPlayer :messages="filteredItems" />
            </div>
          </div>
        </div>
      </div>
    </ContainerWrapper>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ContainerWrapper from "~/src/components/container-wrapper.vue";
import AudioMessagesPlayer from "~/src/components/audio-messages-player.vue";
import LoadingSpinner from "~/src/components/loading-spinner.vue";
import { format } from "date-fns";
import { useQuery } from "@tanstack/vue-query";

const prismic = usePrismic();

const { data, isPending: pending } = useQuery({
  queryKey: ["media_center"],
  queryFn: () => prismic.client.getSingle("media_center"),
});

const { data: audioMessages, isPending: audioPending } = useQuery({
  queryKey: ["audio_messages"],
  queryFn: () => prismic.client.getSingle("audio_messages"),
});

const { data: lifewaySessions, isPending: lifewayPending } = useQuery({
  queryKey: ["lifeway_sessions"],
  queryFn: () => prismic.client.getSingle("lifeway_sessions"),
});

const { data: startYourDay, isPending: startYourDayPending } = useQuery({
  queryKey: ["start_your_day"],
  queryFn: () => prismic.client.getSingle("start_your_day"),
});

const tab = ref("audio");

const switchTab = (newTab) => {
  tab.value = newTab;
};

// Search state
const searchQuery = ref("");

// Filter logic
const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  const videoItems = data.value?.data?.slices ?? [];
  const lifewayItems = lifewaySessions.value?.data?.slices ?? [];
  const audioItems = audioMessages.value?.data?.slices ?? [];
  const startYourDayItems = startYourDay.value?.data?.slices ?? [];

  const getSortedFiltered = (items) => {
    const filtered = !query
      ? items
      : items.filter((item) => {
          const p = item.primary;
          return (
            p.message_title?.toLowerCase().includes(query) ||
            p.minister?.toLowerCase().includes(query) ||
            p.description?.toLowerCase().includes(query) ||
            p.scriptures?.toLowerCase().includes(query) ||
            p.date?.toLowerCase().includes(query)
          );
        });

    // Sort by date descending (make a shallow copy to avoid mutating readonly array)
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.primary.date || "").getTime();
      const dateB = new Date(b.primary.date || "").getTime();
      return dateB - dateA;
    });
  };

  if (tab.value === "video") {
    // Show video messages
    return getSortedFiltered(videoItems);
  } else if (tab.value === "lifeway") {
    // Show lifeway sessions from dedicated single
    return getSortedFiltered(lifewayItems);
  } else if (tab.value === "startYourDay") {
    // Show Start Your Day messages
    return getSortedFiltered(startYourDayItems);
  } else {
    // Audio tab - show all audio messages
    return getSortedFiltered(audioItems);
  }
});

// Date formatting for desktop
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return format(date, "EEEE, MMMM d, yyyy"); // e.g., Sunday, June 25, 2025
}

function getResponsiveEmbed(rawHtml) {
  return rawHtml
    .replace(/width="\d+"/g, 'width="100%"')
    .replace(/height="\d+"/g, 'height="100%"')
    .replace(/style="[^"]*"/g, ""); // remove inline styles if any
}
</script>
