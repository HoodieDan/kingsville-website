<template>
	<div>
		<ContainerWrapper class="p-8">
			<div class="flex flex-col-reverse md:flex-row mb-15">
				<div class="w-full md:w-2/5 relative mt-5 md:mt-0 md:pb-40">
					<div class="text-center md:text-left md:p-10 md:pt-40">
						<h2 class="!font-bold t__reveal__animate">
							Upcoming Events at Kingsville Church
						</h2>
						<p class="mt-5 t__fade__animate">
							Discover upcoming events at Kingsville Church. Use
							the search below to find events that interest you!
						</p>
					</div>
				</div>

				<!-- Loading state for hero image/carousel -->
				<div v-if="pending" class="flex-1 bg-grey rounded-lg overflow-hidden h-[30rem] md:h-[35rem] flex items-center justify-center">
					<div class="spinner"></div>
				</div>

				<!-- Default fallback image when no event images -->
				<div v-else-if="!hasEventImages" class="flex-1 bg-grey rounded-lg overflow-hidden">
					<img
						src="../public/images/upcoming-events.jpeg"
						alt="upcoming-events"
						class="w-full h-full object-cover rounded-lg t__clip__animate"
					/>
				</div>

				<!-- Single event image (when only 1 image) -->
				<div v-else-if="allEventImages.length === 1" class="flex-1 bg-grey rounded-lg overflow-hidden h-[30rem] md:h-[35rem]">
					<img
						:src="allEventImages[0].url"
						:alt="allEventImages[0].alt || 'Event image'"
						class="w-full h-full object-cover rounded-lg t__clip__animate"
					/>
				</div>

				<!-- Event images carousel (when 2 or more images) -->
				<div v-else class="flex-1 bg-grey rounded-lg overflow-hidden h-[30rem] md:h-[35rem]">
					<EventCarousel
						:slides-per-view="1"
						:space-between="0"
						:loop="true"
						:autoplay="{ delay: 5000 }"
						class="w-full h-full"
					>
						<SwiperSlide
							v-for="(image, index) in allEventImages"
							:key="index"
							class="w-full h-full"
						>
							<img
								:src="image.url"
								:alt="image.alt || 'Event image'"
								class="w-full h-full object-cover"
							/>
						</SwiperSlide>
					</EventCarousel>
				</div>
			</div>

			<div class="bg-grey p-8 rounded-2xl relative">
				<h1 class="hidden md:block">Find Your Place</h1>
				<div class="flex flex-col md:flex-row gap-15 mt-5">
					<div class="w-full md:w-2/5 text-center md:text-left">
						<h5 class="mb-5 md:mb-2 !font-bold">Search</h5>
						<input
							v-model="searchQuery"
							type="text"
							class="w-full p-2 border rounded-md !bg-white"
							placeholder="Search events..."
						/>
					</div>

					<LoadingSpinner v-if="pending" />
					<div
						v-if="filteredEvents.length > 0 && !pending"
						class="flex-1 space-y-8"
					>
						<div
							v-for="event in filteredEvents"
							:key="event.id"
							class="flex flex-col md:flex-row items-center gap-5"
						>
							<div
								class="bg-white rounded-2xl w-30 h-30 flex flex-col gap-2 items-center justify-center relative overflow-hidden"
								:style="
									getEventImage(event)
										? `background-image: url('${getEventImage(event)}'); background-size: cover; background-position: center;`
										: ''
								"
							>
								<!-- Dark overlay -->
								<div
									v-if="getEventImage(event)"
									class="!absolute inset-0 bg-black/70 z-0"
								></div>
								<div
									class="relative z-10 flex flex-col items-center justify-center h-full w-full"
								>
									<h4 class="text-white">
										{{
											formatDay(
												event.primary.start_date_and_time
											)
										}}
									</h4>
									<p class="text-sm text-white">
										{{
											formatMonth(
												event.primary.start_date_and_time
											)
										}}
									</p>
								</div>
							</div>

							<div class="text-center md:text-left flex-1">
								<h5 class="mb-2">
									{{ event.primary.event_name }}
								</h5>
								<div class="flex flex-col gap-1 mb-2">
									<p class="text-sm">
										<span class="font-semibold">Starts:</span>
										{{ formatDateTime(event.primary.start_date_and_time) }}
									</p>
									<p v-if="event.primary.end_date_and_time" class="text-sm">
										<span class="font-semibold">Ends:</span>
										{{ formatDateTime(event.primary.end_date_and_time) }}
									</p>
								</div>
								<div class="mb-3">
									<PrismicRichText :field="event.primary.short_description" />
								</div>
								<div class="flex flex-wrap gap-2 justify-center md:justify-start">
									<button
										class="!w-auto text-sm"
										@click="addToGoogleCalendar(event)"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-4 w-4 inline-block mr-1"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
										Remind Me
									</button>
									<button
										v-if="event.primary.registration_link?.text"
										class="!w-auto text-sm !bg-primary-orange !text-white hover:!bg-primary-orange/90"
										@click="() => navigateTo(event.primary.registration_link.text, { external: true, open: { target: '_blank' } })"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-4 w-4 inline-block mr-1"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Reserve My Seat
									</button>
								</div>
							</div>
						</div>
					</div>

					<p v-if="filteredEvents.length === 0 && !pending" class="flex-1">
						No upcoming events match your search.
					</p>
				</div>
			</div>
		</ContainerWrapper>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import ContainerWrapper from "~/src/components/container-wrapper.vue";
import EventCarousel from "~/src/components/event-carousel.vue";
import LoadingSpinner from "~/src/components/loading-spinner.vue";
import { SwiperSlide } from "swiper/vue";
import { PrismicRichText } from "@prismicio/vue";
import { useScrollAnimations } from "~/src/composables/useScrollAnimation";
import { useQuery } from "@tanstack/vue-query";

useScrollAnimations();

const searchQuery = ref("");

const prismic = usePrismic();

const { data, isLoading: pending } = useQuery({
	queryKey: ["events"],
	queryFn: () => prismic.client.getSingle("events"),
});

// Filter out past events and match search
const filteredEvents = computed(() => {
	if (!data.value?.data?.slices) return [];

	const today = new Date();
	const events = data.value.data.slices
		.filter((event) => {
			// Use end_date_and_time if available, otherwise use start_date_and_time
			const eventDate = new Date(event.primary.end_date_and_time || event.primary.start_date_and_time);
			return eventDate >= today;
		})
		.filter((event) => {
			const name = event.primary.event_name?.toLowerCase() || "";
			return name.includes(searchQuery.value.toLowerCase());
		});

	return events;
});

// Get all event images for carousel
const allEventImages = computed(() => {
	if (!filteredEvents.value || filteredEvents.value.length === 0) return [];

	const images = [];
	filteredEvents.value.forEach((event) => {
		if (event.primary.images && event.primary.images.length > 0) {
			event.primary.images.forEach((imgObj) => {
				if (imgObj.image && imgObj.image.url) {
					images.push({
						url: imgObj.image.url,
						alt: imgObj.image.alt
					});
				}
			});
		}
	});
	return images;
});

// Check if there are any event images
const hasEventImages = computed(() => {
	return allEventImages.value.length > 0;
});

// Get first image from event's images array
const getEventImage = (event) => {
	if (event.primary.images && event.primary.images.length > 0 && event.primary.images[0].image) {
		return event.primary.images[0].image.url;
	}
	return null;
};

// Format date and time together
const formatDateTime = (time) => {
	const date = new Date(time);
	return date.toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
		timeZone: "Africa/Lagos",
	});
};

// Format day as number (e.g. 28)
const formatDay = (time) => {
	const date = new Date(time);
	return date.toLocaleDateString("en-US", {
		day: "2-digit",
		timeZone: "Africa/Lagos",
	});
};

// Format month as short text (e.g. Jul)
const formatMonth = (time) => {
	const date = new Date(time);
	return date.toLocaleDateString("en-US", {
		month: "short",
		timeZone: "Africa/Lagos",
	});
};

// Add to Google Calendar with .ics download for better reminder support
const addToGoogleCalendar = (event) => {
	const startDate = new Date(event.primary.start_date_and_time);
	const endDate = event.primary.end_date_and_time
		? new Date(event.primary.end_date_and_time)
		: new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours if no end time

	// Format dates for Google Calendar (YYYYMMDDTHHmmssZ)
	const formatGoogleDate = (date) => {
		return date.toISOString().replace(/-|:|\.\d+/g, '');
	};

	// Create ICS file content with proper reminders
	const icsContent = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Kingsville Church//Events//EN',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		'BEGIN:VEVENT',
		`DTSTART:${formatGoogleDate(startDate)}`,
		`DTEND:${formatGoogleDate(endDate)}`,
		`SUMMARY:${event.primary.event_name}`,
		`DESCRIPTION:${event.primary.short_description || ''}`,
		`LOCATION:Kingsville Church`,
		'BEGIN:VALARM',
		'TRIGGER:-P15D', // 15 days before
		'ACTION:DISPLAY',
		`DESCRIPTION:Reminder: ${event.primary.event_name} in 15 days`,
		'END:VALARM',
		'BEGIN:VALARM',
		'TRIGGER:-P7D', // 7 days before
		'ACTION:DISPLAY',
		`DESCRIPTION:Reminder: ${event.primary.event_name} in 1 week`,
		'END:VALARM',
		'BEGIN:VALARM',
		'TRIGGER:-P2D', // 2 days before
		'ACTION:DISPLAY',
		`DESCRIPTION:Reminder: ${event.primary.event_name} in 2 days`,
		'END:VALARM',
		'END:VEVENT',
		'END:VCALENDAR'
	].join('\r\n');

	// Create blob and download
	const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
	const link = document.createElement('a');
	link.href = window.URL.createObjectURL(blob);
	link.download = `${event.primary.event_name.replace(/[^a-z0-9]/gi, '_')}.ics`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
</script>

<style scoped>
.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e3e3e3;
  border-top: 4px solid #28166f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
