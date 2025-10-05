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
          <p v-if="pending || audioPending || lifewayPending">Loading...</p>

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

            <div v-else>
              <div class="flex flex-col">
                <!-- Desktop Header -->
                <div class="hidden md:flex font-semibold border-b pb-2 mb-2 gap-4">
                  <div class="w-20 flex-shrink-0"></div> <!-- Thumbnail column -->
                  <div class="w-1/4">Date</div>
                  <div class="flex-1">Title</div>
                  <div class="w-auto text-center">Actions</div>
                </div>

                <div
                  v-for="audio in filteredItems"
                  :key="audio.id"
                  class="flex flex-col py-3 border-b"
                >
                  <!-- Desktop Layout -->
                  <div class="hidden md:flex items-center gap-4">
                    <!-- Thumbnail -->
                    <div v-if="audio.primary.thumbnail?.url" class="w-20 h-20 flex-shrink-0">
                      <img
                        :src="audio.primary.thumbnail.url"
                        :alt="audio.primary.message_title"
                        class="w-full h-full object-cover rounded-md"
                      >
                    </div>

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
                    <div class="flex gap-3 items-center">
                      <button
                        v-if="audio.primary.message_audio_link?.url"
                        class="ghost !px-2 !py-2"
                        :title="
                          activePlayer === audio.id ? 'Hide Player' : 'Play'
                        "
                        @click="togglePlayer(audio.id)"
                      >
                        <svg
                          v-if="activePlayer !== audio.id"
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
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <svg
                          v-else
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
                            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                      <a
                        :href="audio.primary.message_audio_link?.url"
                        target="_blank"
                        rel="noopener"
                        class="text-blue-600 hover:text-blue-800 cursor-pointer p-2"
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

                  <!-- Mobile Layout -->
                  <div class="md:hidden flex flex-col gap-3">
                    <div class="flex gap-3 items-start">
                      <!-- Thumbnail -->
                      <div v-if="audio.primary.thumbnail?.url" class="w-16 h-16 flex-shrink-0">
                        <img
                          :src="audio.primary.thumbnail.url"
                          :alt="audio.primary.message_title"
                          class="w-full h-full object-cover rounded-md"
                        >
                      </div>

                      <div class="flex-1">
                        <p class="text-xs text-gray-500 mb-1">
                          {{ formatDateMobile(audio.primary.date) }}
                        </p>
                        <h6 class="text-sm">
                          {{ audio.primary.message_title }}
                        </h6>
                        <p class="text-xs text-gray-600 mt-1">
                          {{ audio.primary.minister }}
                        </p>
                      </div>
                    </div>
                    <div class="flex gap-3">
                      <button
                        v-if="audio.primary.message_audio_link?.url"
                        class="flex-1 ghost !px-4 !py-3 flex items-center justify-center gap-2"
                        :title="
                          activePlayer === audio.id ? 'Hide Player' : 'Play'
                        "
                        @click="togglePlayer(audio.id)"
                      >
                        <svg
                          v-if="activePlayer !== audio.id"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span class="text-sm">{{ activePlayer === audio.id ? 'Hide' : 'Play' }}</span>
                      </button>
                      <a
                        :href="audio.primary.message_audio_link?.url"
                        target="_blank"
                        rel="noopener"
                        class="flex-1 text-blue-600 hover:text-blue-800 border border-blue-600 rounded-lg px-4 py-3 flex items-center justify-center gap-2"
                        title="Download"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
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
                        <span class="text-sm">Download</span>
                      </a>
                    </div>
                  </div>

                  <!-- Audio Player -->
                  <div v-if="activePlayer === audio.id" class="mt-3 w-full">
                    <audio
                      :src="audio.primary.message_audio_link.url"
                      controls
                      autoplay
                      preload="metadata"
                      class="w-full"
                    >
                      Your browser does not support the audio element.
                    </audio>
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

const { data: lifewaySessions, isPending: lifewayPending } = useQuery({
  queryKey: ["lifeway_sessions"],
  queryFn: () => prismic.client.getSingle("lifeway_sessions"),
});

const tab = ref("audio");

const switchTab = (newTab) => {
  tab.value = newTab;
  activePlayer.value = null; // Close any open player when switching tabs
};

// Search state
const searchQuery = ref("");

// Active player state
const activePlayer = ref(null);

const togglePlayer = (audioId) => {
  if (activePlayer.value === audioId) {
    activePlayer.value = null; // Close if already open
  } else {
    activePlayer.value = audioId; // Open this player and close others
  }
};

// Filter logic
const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  const videoItems = data.value?.data?.slices ?? [];
  const lifewayItems = lifewaySessions.value?.data?.slices ?? [];

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
  } else {
    // Audio tab - show all audio messages
    return getSortedFiltered(audioMessages.value?.data?.slices ?? []);
  }
});

// Date formatting for desktop
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return format(date, "EEEE, MMMM d, yyyy"); // e.g., Sunday, June 25, 2025
}

// Date formatting for mobile (compact)
function formatDateMobile(dateStr) {
  const date = new Date(dateStr);
  return format(date, "MMM d, yyyy"); // e.g., Jun 25, 2025
}

function getResponsiveEmbed(rawHtml) {
  return rawHtml
    .replace(/width="\d+"/g, 'width="100%"')
    .replace(/height="\d+"/g, 'height="100%"')
    .replace(/style="[^"]*"/g, ""); // remove inline styles if any
}
</script>
