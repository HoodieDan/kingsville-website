<script setup lang="ts">
import ContainerWrapper from "~/src/components/container-wrapper.vue";
import EventPromoBanner from "~/src/components/event-promo-banner.vue";
import { outpourEvent } from "~/src/data/events";

// Preserve links to the previous featured-event page.
definePageMeta({ alias: ["/crusade"] });

useHead({
  title: `${outpourEvent.primary.event_name} | Kingsville Church`,
  meta: [
    { name: "description", content: outpourEvent.primary.short_description[0].text },
    { property: "og:title", content: `${outpourEvent.primary.event_name} | Kingsville Church` },
    { property: "og:description", content: outpourEvent.primary.short_description[0].text },
    { property: "og:image", content: "https://kingsvillechurch.org/images/the-outpour-2026.jpg" },
    { property: "og:url", content: "https://kingsvillechurch.org/outpour" },
  ],
});

const formatSession = (date: string) => new Date(date).toLocaleString("en-NG", {
  weekday: "long", month: "long", day: "numeric", year: "numeric",
  hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Africa/Lagos",
});
</script>

<template>
  <ContainerWrapper class="py-8 md:py-12">
    <h1 class="text-primary-blue !font-bold">{{ outpourEvent.primary.event_name }}</h1>
    <EventPromoBanner :event="outpourEvent" />
    <div id="upcoming-event-section" class="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
      <div class="w-full md:w-1/2">
        <img
          :src="outpourEvent.primary.images[0].image.url"
          :alt="outpourEvent.primary.images[0].image.alt"
          width="1118"
          height="1600"
          class="w-full h-auto rounded-2xl"
        >
      </div>
      <div class="w-full md:w-1/2 space-y-8">
        <section>
          <h2 class="text-primary-blue !font-bold">Join us for The Outpour</h2>
          <p class="mt-4 text-gray-600">{{ outpourEvent.primary.short_description[0].text }}</p>
        </section>
        <section>
          <h3 class="text-primary-blue !font-bold">Service schedule</h3>
          <p class="mt-2 text-gray-600">All times are West Africa Time (WAT).</p>
          <ul class="mt-4 space-y-3 !list-none">
            <li v-for="session in outpourEvent.sessions" :key="session.start" class="bg-grey rounded-xl p-4">
              <p class="font-semibold text-primary-blue">{{ session.label }}</p>
              <time :datetime="session.start" class="text-sm text-gray-600">{{ formatSession(session.start) }}</time>
              <span class="text-sm text-gray-600"> – {{ new Date(session.end).toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Africa/Lagos' }) }}</span>
            </li>
          </ul>
        </section>
        <section>
          <h3 class="text-primary-blue !font-bold">Hosts &amp; guest ministers</h3>
          <ul class="mt-4 space-y-3 !list-none">
            <li v-for="minister in outpourEvent.ministers" :key="minister.name">
              <p class="font-semibold text-primary-blue">{{ minister.name }}</p>
              <p class="text-sm text-gray-600">{{ minister.role }}</p>
            </li>
          </ul>
        </section>
        <section>
          <h3 class="text-primary-blue !font-bold">Venue</h3>
          <p class="mt-3 font-semibold">Kingsville Church</p>
          <p class="text-gray-600">{{ outpourEvent.location }}</p>
          <NuxtLink to="/contact" class="inline-block mt-4">
            <button>Get Directions</button>
          </NuxtLink>
        </section>
      </div>
    </div>
  </ContainerWrapper>
</template>
