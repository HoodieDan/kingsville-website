<script setup>
import { Swiper } from "swiper/vue";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

defineProps({
	slidesPerView: {
		type: Number,
		default: 1,
	},
	spaceBetween: {
		type: Number,
		default: 0,
	},
	loop: {
		type: Boolean,
		default: true,
	},
	autoplay: {
		type: [Object, Boolean],
		default: () => ({ delay: 3000 }),
	},
});
</script>

<template>
	<div class="relative w-full h-full event-carousel-container">
		<!-- Swiper Carousel -->
		<Swiper
			:slides-per-view="slidesPerView"
			:space-between="spaceBetween"
			:pagination="{ clickable: true }"
			:navigation="{
				nextEl: '.event-swiper-button-next',
				prevEl: '.event-swiper-button-prev',
			}"
			:autoplay="autoplay"
			:modules="[Pagination, Navigation, Autoplay]"
			:loop="loop"
			class="w-full h-full event-carousel"
		>
			<slot />
		</Swiper>

		<!-- Navigation Buttons (Overlaid) -->
		<div
			class="event-swiper-button-prev !absolute !left-4 !top-1/2 !-translate-y-1/2 !z-50 !w-10 !h-10 !bg-white/80 hover:!bg-white !rounded-full !flex !items-center !justify-center !cursor-pointer !transition-all !shadow-lg"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 text-gray-800"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 19l-7-7 7-7"
				/>
			</svg>
		</div>
		<div
			class="event-swiper-button-next !absolute !right-4 !top-1/2 !-translate-y-1/2 !z-50 !w-10 !h-10 !bg-white/80 hover:!bg-white !rounded-full !flex !items-center !justify-center !cursor-pointer !transition-all !shadow-lg"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 text-gray-800"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 5l7 7-7 7"
				/>
			</svg>
		</div>
	</div>
</template>

<style scoped>
.event-carousel-container {
	position: relative;
}

/* Pagination bullets styling */
:deep(.swiper-pagination) {
	bottom: 20px !important;
	z-index: 10;
}

:deep(.swiper-pagination-bullet) {
	background-color: white !important;
	opacity: 0.5;
	width: 10px;
	height: 10px;
	transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
	opacity: 1;
	width: 24px;
	border-radius: 5px;
}

/* Navigation buttons - ensure they're visible */
.event-swiper-button-prev,
.event-swiper-button-next {
	position: absolute !important;
	top: 50% !important;
	transform: translateY(-50%) !important;
	z-index: 50 !important;
	width: 40px !important;
	height: 40px !important;
	background-color: rgba(255, 255, 255, 0.8) !important;
	border-radius: 50% !important;
	display: flex !important;
	align-items: center !important;
	justify-content: center !important;
	cursor: pointer !important;
	transition: all 0.3s ease !important;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
}

.event-swiper-button-prev {
	left: 16px !important;
}

.event-swiper-button-next {
	right: 16px !important;
}

.event-swiper-button-prev:hover,
.event-swiper-button-next:hover {
	background-color: rgba(255, 255, 255, 1) !important;
}

/* Hide default navigation arrows */
:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
	display: none !important;
}
</style>
