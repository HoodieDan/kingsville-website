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
            media—it's fuel for your walk with God and your impact in the world.
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
            class="flex justify-center space-x-4 border-b border-gray-300 w-full md:w-2/3 lg:w-1/2"
          >
            <div
              :class="[
                'pb-2 text-sm font-semibold cursor-pointer',
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
                'pb-2 text-sm font-semibold cursor-pointer',
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
                'pb-2 text-sm font-semibold cursor-pointer',
                tab === 'lifeway'
                  ? 'text-primary-orange border-b-2 border-primary-orange'
                  : 'text-gray-500',
              ]"
              @click="switchTab('lifeway')"
            >
              LIFEWAY SESSIONS
            </div>
          </div>
        </div>

        <div>
          <p v-if="pending || audioPending">Loading...</p>

          <div v-else>
            <div
              v-if="tab === 'video' || tab === 'lifeway'"
              class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div
                v-for="item in filteredItems"
                :key="item.id"
                class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <!-- Embed video -->
                <div
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

            <div v-else>
              <div class="flex flex-col">
                <div class="flex font-semibold border-b pb-2 mb-2">
                  <div class="w-1/4">Date</div>
                  <div class="flex-1">Title</div>
                  <div class="w-auto text-center">Download</div>
                </div>
                <div
                  v-for="audio in filteredItems"
                  :key="audio.id"
                  class="flex items-center py-3 border-b"
                >
                  <div class="w-1/4 text-gray-600">
                    {{ formatDate(audio.primary.date) }}
                  </div>
                  <div class="flex-1">
                    <h6>
                      {{ audio.primary.message_title }}
                    </h6>
                    <p class="text-gray-600">
                      {{ audio.primary.minister }}
                    </p>
                  </div>
                  <div class="w-7 flex justify-center">
                    <a
                      :href="audio.primary.message_audio_link?.url"
                      target="_blank"
                      rel="noopener"
                      class="text-blue-600 hover:text-blue-800 cursor-pointer"
                      title="Download"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
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

const tab = ref("audio");

const switchTab = (newTab) => {
  tab.value = newTab;
};

// Search state
const searchQuery = ref("");

// Helper function to check if a message is a lifeway session
const isLifewaySession = (item) => {
  return item.primary.message_title?.toLowerCase().includes("lifeway session");
};

// Filter logic
const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  const videoItems = data.value?.data?.slices ?? [];

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
    // Show only video messages that are NOT lifeway sessions
    const regularVideos = videoItems.filter((item) => !isLifewaySession(item));
    return getSortedFiltered(regularVideos);
  } else if (tab.value === "lifeway") {
    // Show only lifeway sessions from video messages
    const lifewaySessions = videoItems.filter((item) => isLifewaySession(item));
    return getSortedFiltered(lifewaySessions);
  } else {
    // Audio tab - show all audio messages
    return getSortedFiltered(audioMessages.value?.data?.slices ?? []);
  }
});

// Date formatting
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
