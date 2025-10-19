<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";
import { PrismicRichText } from "@prismicio/vue";

const props = defineProps<{
  event: any;
}>();

// Countdown timer
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const eventStatus = ref<"upcoming" | "today" | "started">("upcoming");

const updateCountdown = () => {
  if (!props.event) return;

  const now = new Date().getTime();
  const eventTime = new Date(props.event.primary.start_date_and_time).getTime();
  const distance = eventTime - now;

  // Event has already started
  if (distance < 0) {
    eventStatus.value = "started";
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.value = { days, hours, minutes, seconds };

  // Determine if it's today
  if (days === 0) {
    eventStatus.value = "today";
  } else {
    eventStatus.value = "upcoming";
  }
};

// Update countdown every second
let countdownInterval: NodeJS.Timeout | null = null;

watch(
  () => props.event,
  (newEvent) => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    if (newEvent) {
      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 1000);
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

// Get the first event image or fallback
const eventImage = computed(() => {
  if (props.event?.primary?.images && props.event.primary.images.length > 0) {
    return props.event.primary.images[0].image?.url;
  }
  return null;
});

const reserveSeat = () => {
  if (props.event?.primary?.registration_link?.text) {
    navigateTo(props.event.primary.registration_link.text, {
      external: true,
      open: { target: "_blank" },
    });
  }
};

const scrollToEvent = () => {
  const eventSection = document.querySelector("#upcoming-event-section");
  if (eventSection) {
    eventSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<template>
  <div
    class="promo-banner relative w-full overflow-hidden rounded-3xl shadow-2xl my-8 md:my-12"
  >
    <!-- Background Image with Overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center z-0"
      :style="
        eventImage
          ? `background-image: url('${eventImage}')`
          : 'background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
      "
    >
      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/70"
      ></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 px-6 py-10 md:px-12 md:py-16">
      <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <!-- Event Info -->
        <div class="flex-1">
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2 px-4 py-2 !bg-primary-orange rounded-full mb-4 banner-badge"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="white"
            >
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
              />
            </svg>
            <span class="font-bold text-sm uppercase tracking-wider !text-white"
              >Don't Miss Out!</span
            >
          </div>

          <!-- Event Title -->
          <h2
            class="text-3xl md:text-5xl font-bold mb-4 leading-tight !text-black"
          >
            {{ event.primary.event_name }}
          </h2>

          <!-- Event Description - Truncated -->
          <div class="mb-6 line-clamp-3 event-description !text-black">
            <PrismicRichText :field="event.primary.short_description" />
          </div>

          <!-- Event Dates -->
          <div
            class="flex flex-wrap gap-4 mb-6 text-sm event-dates !text-black"
          >
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="#ff6b35"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="!font-semibold">Starts:</span>
              <span>{{
                new Date(event.primary.start_date_and_time).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" }
                )
              }}</span>
            </div>
            <div
              v-if="event.primary.end_date_and_time"
              class="flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="#ff6b35"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="!font-semibold">Ends:</span>
              <span>{{
                new Date(event.primary.end_date_and_time).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" }
                )
              }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3">
            <button
              v-if="event.primary.registration_link?.text"
              @click="reserveSeat"
              class="px-8 py-3 !font-bold rounded-lg transform hover:scale-105 transition-all shadow-lg flex items-center gap-2 reserve-button !bg-primary-orange !text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="white"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fill-rule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              Reserve My Seat
            </button>
            <button
              @click="scrollToEvent"
              class="px-8 py-3 !font-bold rounded-lg transform hover:scale-105 transition-all shadow-lg learn-more-button !bg-primary-blue !text-white"
            >
              Learn More
            </button>
          </div>
        </div>

        <!-- Countdown Timer -->
        <div class="w-full lg:w-auto">
          <div
            class="backdrop-blur-md rounded-2xl p-6 countdown-container !bg-primary-blue !border-2 !border-primary-orange"
          >
            <!-- Event Started -->
            <div v-if="eventStatus === 'started'" class="text-center">
              <div class="flex items-center justify-center gap-2 mb-2">
                <div
                  class="w-3 h-3 rounded-full live-indicator !bg-primary-orange"
                />
                <p class="text-xl !font-bold !text-white">Event is Live!</p>
              </div>
              <p class="text-sm !text-white">Join us now!</p>
            </div>

            <!-- Event Today -->
            <div v-else-if="eventStatus === 'today'" class="text-center">
              <p class="!font-bold text-lg mb-3 !text-primary-orange">
                🎉 Event Starts Today!
              </p>
              <p class="text-sm mb-4 !text-white">Countdown:</p>
              <div class="grid grid-cols-3 gap-3">
                <div class="rounded-lg p-3 bg-white/15">
                  <div class="text-3xl !font-bold !text-white">
                    {{ countdown.hours }}
                  </div>
                  <div class="text-xs uppercase !text-white">Hours</div>
                </div>
                <div class="rounded-lg p-3 bg-white/15">
                  <div class="text-3xl !font-bold !text-white">
                    {{ countdown.minutes }}
                  </div>
                  <div class="text-xs uppercase !text-white">Minutes</div>
                </div>
                <div class="rounded-lg p-3 bg-white/15">
                  <div class="text-3xl !font-bold !text-white">
                    {{ countdown.seconds }}
                  </div>
                  <div class="text-xs uppercase !text-white">Seconds</div>
                </div>
              </div>
            </div>

            <!-- Upcoming Event -->
            <div v-else class="text-center">
              <p
                class="!font-semibold text-sm mb-4 uppercase tracking-wider !text-white"
              >
                Event Starts In:
              </p>
              <div class="grid grid-cols-4 gap-2">
                <div class="rounded-lg p-3 !bg-primary-orange">
                  <div class="text-2xl md:text-3xl !font-bold !text-white">
                    {{ countdown.days }}
                  </div>
                  <div class="text-xs uppercase mt-1 !text-white">Days</div>
                </div>
                <div class="rounded-lg p-3 !bg-primary-orange">
                  <div class="text-2xl md:text-3xl !font-bold !text-white">
                    {{ countdown.hours }}
                  </div>
                  <div class="text-xs uppercase mt-1 !text-white">Hours</div>
                </div>
                <div class="rounded-lg p-3 !bg-primary-orange">
                  <div class="text-2xl md:text-3xl !font-bold !text-white">
                    {{ countdown.minutes }}
                  </div>
                  <div class="text-xs uppercase mt-1 !text-white">Min</div>
                </div>
                <div class="rounded-lg p-3 !bg-primary-orange">
                  <div class="text-2xl md:text-3xl !font-bold !text-white">
                    {{ countdown.seconds }}
                  </div>
                  <div class="text-xs uppercase mt-1 !text-white">Sec</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes livePulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.banner-badge {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.live-indicator {
  animation: livePulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Truncate text */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Button hover effects */
.reserve-button:hover {
  opacity: 0.9;
}

.learn-more-button:hover {
  opacity: 0.9;
}

/* Ensure rich text content has proper styling */
.event-description :deep(p) {
  margin: 0;
  line-height: 1.6;
  color: black !important;
}

.event-description :deep(strong) {
  color: black !important;
  font-weight: 700;
}
</style>
