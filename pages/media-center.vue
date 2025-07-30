<template>
	<div>
		<ContainerWrapper class="py-32">
			<div class="bg-grey rounded-lg p-8 pt-20">
				<div class="mb-6">
					<h1 class="tight !absolute -top-32">Previous Messages</h1>
					<p>
						Dive into Spirit-led teachings and timeless truth. This
						is more than media—it's fuel for your walk with God and
						your impact in the world.
					</p>
				</div>

				<div class="w-full flex flex-col justify-center items-center mb-8">
                    <h5 class="text-center !not-italic !font-bold">Search Messages</h5>
					<input
						v-model="searchQuery"
						type="text"
						placeholder="Search messages..."
						class="mb-6 px-4 py-2 border rounded-md w-full md:!w-1/2 lg:!w-1/3"
					/>
				</div>

				<p v-if="pending">Loading...</p>

				<div
					v-else
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
							v-html="
								getResponsiveEmbed(
									item.primary.embed_link[0].text
								)
							"
						></div>

						<!-- Content -->
						<div class="p-4 flex flex-col gap-2">
							<p class="text-sm text-gray-500">
								{{ formatDate(item.primary.date) }}
							</p>
							<h5
								class="!font-semibold !font-zenith text-primary-blue"
							>
								{{ item.primary.message_title }}
							</h5>
							<p class="text-gray-600 italic">
								Minister: {{ item.primary.minister }}
							</p>
							<p class="text-gray-700">
								{{ item.primary.description }}
							</p>
							<p class="text-gray-500 mt-2">
								Scriptures: {{ item.primary.scriptures }}
							</p>
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

const prismic = usePrismic();
const { data, pending } = await useAsyncData("media_center", () =>
	prismic.client.getSingle("media_center")
);

// Search state
const searchQuery = ref("");

// Computed list of slices
const items = computed(() => data.value?.data?.slices ?? []);

// Filter logic
const filteredItems = computed(() => {
	if (!searchQuery.value.trim()) return items.value;

	const query = searchQuery.value.toLowerCase();
	return items.value.filter((item) => {
		const primary = item.primary;
		return (
			primary.message_title?.toLowerCase().includes(query) ||
			primary.minister?.toLowerCase().includes(query) ||
			primary.description?.toLowerCase().includes(query) ||
			primary.scriptures?.toLowerCase().includes(query) ||
			primary.date?.toLowerCase().includes(query)
		);
	});
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
