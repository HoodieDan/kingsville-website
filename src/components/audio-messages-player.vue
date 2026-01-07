<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";
import { format } from "date-fns";

const props = defineProps<{
  messages: any[];
}>();

// State
const expandedMessage = ref<any>(null);
const currentTrack = ref<any>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const audioElement = ref<HTMLAudioElement | null>(null);

// Initialize with most recent message, reset when tab changes
watch(
  () => props.messages,
  (newMessages) => {
    if (newMessages && newMessages.length > 0) {
      // Check if current expanded message exists in the new messages
      const existsInNewMessages = expandedMessage.value &&
        newMessages.some((msg) => msg.id === expandedMessage.value.id);

      // Reset to first message if current doesn't exist in new list (tab changed)
      if (!existsInNewMessages) {
        expandedMessage.value = newMessages[0];

        // Stop playback when switching tabs
        if (audioElement.value) {
          audioElement.value.pause();
          isPlaying.value = false;
        }
        currentTrack.value = null;
      }
    }
  },
  { immediate: true }
);

// Grid messages (all except expanded)
const gridMessages = computed(() => {
  if (!expandedMessage.value) return props.messages;
  return props.messages.filter((msg) => msg.id !== expandedMessage.value.id);
});

// Swap message to expanded view
const expandMessage = (message: any) => {
  expandedMessage.value = message;
  // Stop current playback
  if (audioElement.value) {
    audioElement.value.pause();
    isPlaying.value = false;
  }
};

// Play track
const playTrack = (track: any, trackIndex: number) => {
  if (currentTrack.value?.url === track.audio_message_link.url && isPlaying.value) {
    // Pause if same track
    audioElement.value?.pause();
    isPlaying.value = false;
  } else {
    // Play new track
    currentTrack.value = {
      ...track.audio_message_link,
      trackNumber: trackIndex + 1,
      messageTitle: expandedMessage.value.primary.message_title,
    };

    if (audioElement.value) {
      audioElement.value.src = track.audio_message_link.url;
      audioElement.value.play();
      isPlaying.value = true;
    }
  }
};

// Audio event handlers
const onTimeUpdate = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime;
  }
};

const onLoadedMetadata = () => {
  if (audioElement.value) {
    duration.value = audioElement.value.duration;
  }
};

const onEnded = () => {
  isPlaying.value = false;
};

const togglePlayPause = () => {
  if (audioElement.value) {
    if (isPlaying.value) {
      audioElement.value.pause();
      isPlaying.value = false;
    } else {
      audioElement.value.play();
      isPlaying.value = true;
    }
  }
};

const seek = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const seekTime = (parseFloat(target.value) / 100) * duration.value;
  if (audioElement.value) {
    audioElement.value.currentTime = seekTime;
  }
};

// Format time
const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Progress percentage
const progress = computed(() => {
  if (!duration.value) return 0;
  return (currentTime.value / duration.value) * 100;
});

// Download track
const downloadTrack = (track: any) => {
  const link = document.createElement("a");
  link.href = track.audio_message_link.url;
  link.download = track.audio_message_link.name || "audio.mp3";
  link.click();
};

// Format date
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return format(date, "d MMMM yyyy"); // e.g., 16 June 2020
};
</script>

<template>
  <div class="audio-messages-container">
    <!-- Expanded Message -->
    <div v-if="expandedMessage" class="expanded-message mb-12">
      <h3 class="!font-bold !text-primary-blue mb-2">
        {{ expandedMessage.primary.message_title }}
      </h3>
      <p v-if="expandedMessage.primary.date" class="!text-gray-500 text-sm mb-6">
        {{ formatDate(expandedMessage.primary.date) }}
      </p>

      <div class="flex flex-col md:flex-row gap-6">
        <!-- Thumbnail -->
        <div class="w-full md:w-64 h-64 flex-shrink-0">
          <img
            v-if="expandedMessage.primary.thumbnail?.url"
            :src="expandedMessage.primary.thumbnail.url"
            :alt="expandedMessage.primary.message_title"
            class="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <!-- Minister and Tracks -->
        <div class="flex-1">
          <p class="!text-gray-600 mb-4 !font-semibold">
            Minister: {{ expandedMessage.primary.minister }}
          </p>

          <!-- Tracks List -->
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div
              v-for="(message, index) in expandedMessage.primary.messages"
              :key="index"
              class="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              :class="{ 'border-b border-gray-200': index !== expandedMessage.primary.messages.length - 1 }"
            >
              <!-- Track Number -->
              <span class="!font-semibold !text-gray-700 flex-1">Track {{ index + 1 }}</span>

              <!-- Play Button -->
              <button
                class="!w-10 !h-10 !p-0 flex items-center justify-center !bg-primary-blue !text-white rounded-full hover:!bg-primary-blue/90 flex-shrink-0"
                @click="playTrack(message, index)"
              >
                <svg
                  v-if="currentTrack?.url !== message.audio_message_link.url || !isPlaying"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- Download Button -->
              <button
                class="!w-10 !h-10 !p-0 flex items-center justify-center !bg-primary-orange !text-white rounded-full hover:!bg-primary-orange/90 flex-shrink-0"
                @click="downloadTrack(message)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid Messages -->
    <div v-if="gridMessages.length > 0">
      <h4 class="!font-bold !text-primary-blue mb-6">Other Messages</h4>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div
          v-for="message in gridMessages"
          :key="message.id"
          class="relative group cursor-pointer overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
          @click="expandMessage(message)"
        >
          <!-- Thumbnail -->
          <div class="aspect-square rounded-lg overflow-hidden">
            <img
              v-if="message.primary.thumbnail?.url"
              :src="message.primary.thumbnail.url"
              :alt="message.primary.message_title"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Hover Overlay with Title -->
          <div
            class="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 rounded-lg"
          >
            <p class="!text-white text-center !font-semibold text-sm">
              {{ message.primary.message_title }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Hidden Audio Element -->
    <audio
      ref="audioElement"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
    ></audio>
  </div>

  <!-- Fixed Audio Player at Bottom (Outside Container) -->
  <div
    v-if="currentTrack"
    class="audio-player-fixed !fixed !bottom-0 !left-0 !right-0 !bg-primary-blue !text-white !shadow-2xl !z-[9999] !px-6 !py-4"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Desktop Layout -->
      <div class="hidden md:flex items-center gap-4">
        <!-- Play/Pause Button -->
        <button
          class="!w-12 !h-12 !p-0 flex items-center justify-center !bg-white !text-primary-blue rounded-full hover:!bg-gray-100 flex-shrink-0"
          @click="togglePlayPause"
        >
          <svg
            v-if="!isPlaying"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Track Info -->
        <div class="flex-shrink-0 min-w-0">
          <p class="!font-semibold !text-white truncate">{{ currentTrack.messageTitle }}</p>
          <p class="!text-white/80 text-sm">Track {{ currentTrack.trackNumber }}</p>
        </div>

        <!-- Seeker and Time -->
        <div class="flex-1 flex items-center gap-3">
          <span class="!text-white/90 text-sm flex-shrink-0 !leading-none">{{ formatTime(currentTime) }}</span>
          <input
            type="range"
            min="0"
            max="100"
            :value="progress"
            class="flex-1 bg-white/20 rounded-lg appearance-none cursor-pointer audio-seeker"
            @input="seek"
          />
          <span class="!text-white/90 text-sm flex-shrink-0 !leading-none">{{ formatTime(duration) }}</span>
        </div>
      </div>

      <!-- Mobile Layout -->
      <div class="md:hidden flex flex-col gap-3">
        <div class="flex items-center gap-4">
          <!-- Play/Pause Button -->
          <button
            class="!w-12 !h-12 !p-0 flex items-center justify-center !bg-white !text-primary-blue rounded-full hover:!bg-gray-100 flex-shrink-0"
            @click="togglePlayPause"
          >
            <svg
              v-if="!isPlaying"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Track Info -->
          <div class="flex-1 min-w-0">
            <p class="!font-semibold !text-white truncate text-sm">{{ currentTrack.messageTitle }}</p>
            <p class="!text-white/80 text-xs">Track {{ currentTrack.trackNumber }}</p>
          </div>
        </div>

        <!-- Seeker and Time (Below on Mobile) -->
        <div class="flex items-center gap-3">
          <span class="!text-white/90 text-xs flex-shrink-0 !leading-none">{{ formatTime(currentTime) }}</span>
          <input
            type="range"
            min="0"
            max="100"
            :value="progress"
            class="flex-1 bg-white/20 rounded-lg appearance-none cursor-pointer audio-seeker"
            @input="seek"
          />
          <span class="!text-white/90 text-xs flex-shrink-0 !leading-none">{{ formatTime(duration) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fixed player using dvh for mobile compatibility */
.audio-player-fixed {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;

  /* Use dvh (dynamic viewport height) to account for mobile browser UI */
  bottom: calc(100dvh - 100dvh) !important;

  /* Fallback for browsers that don't support dvh */
  @supports not (height: 100dvh) {
    bottom: 0 !important;
  }
}

/* Custom seeker styling */
.audio-seeker {
  -webkit-appearance: none !important;
  appearance: none !important;
  background: transparent !important;
  outline: none !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  height: 16px !important;
  display: block !important;
}

.audio-seeker::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -4px;
}

.audio-seeker::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.audio-seeker::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
}

.audio-seeker::-moz-range-track {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
}

.audio-seeker:focus {
  outline: none !important;
}
</style>
