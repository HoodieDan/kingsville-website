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
				<div class="flex-1 bg-grey rounded-lg overflow-hidden">
					<img
						src="../public/images/upcoming-events.jpeg"
						alt="upcoming-events"
						class="w-full h-full object-cover rounded-lg t__clip__animate"
					/>
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

					<p v-if="pending">Loading...</p>
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
									event.primary.image
										? `background-image: url('${event.primary.image.url}'); background-size: cover; background-position: center;`
										: ''
								"
							>
								<!-- Dark overlay -->
								<div
									v-if="event.primary.image"
									class="!absolute inset-0 bg-black/70 z-0"
								></div>
								<div
									class="relative z-10 flex flex-col items-center justify-center h-full w-full"
								>
									<h4 class="text-white">
										{{
											formatDay(
												event.primary.date_and_time
											)
										}}
									</h4>
									<p class="text-sm text-white">
										{{
											formatMonth(
												event.primary.date_and_time
											)
										}}
									</p>
								</div>
							</div>

							<div class="text-center md:text-left flex-1">
								<h5 class="mb-2">
									{{ event.primary.event_name }}
								</h5>
								<p>
									{{
										formatTime(event.primary.date_and_time)
									}}
								</p>
								<p>{{ event.primary.short_description }}</p>
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
	return data.value.data.slices
		.filter((event) => {
			const eventDate = new Date(event.primary.date_and_time);
			return eventDate >= today;
		})
		.filter((event) => {
			const name = event.primary.event_name?.toLowerCase() || "";
			return name.includes(searchQuery.value.toLowerCase());
		});
});

// Format for time display
const formatTime = (time) => {
	const date = new Date(time);
	const options = {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
		timeZone: "Africa/Lagos",
	};
	return date.toLocaleTimeString("en-US", options);
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
</script>
