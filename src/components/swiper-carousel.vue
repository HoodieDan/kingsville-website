<script setup>
import { ref } from "vue";
import { Swiper } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const paginationRef = ref(null);

defineProps({
	slidesPerView: {
		type: Number,
		default: 1.5,
	},
	spaceBetween: {
		type: Number,
		default: 20,
	},
	loop: {
		type: Boolean,
		default: true,
	},
	theme: {
		type: String,
		default: "light",
		validator: (value) => ["light", "dark"].includes(value),
	},
});
</script>

<template>
	<div>
		<!-- Swiper Carousel -->
		<Swiper
			:slides-per-view="slidesPerView"
			:space-between="spaceBetween"
			:pagination="{ el: paginationRef, clickable: true }"
			:navigation="{
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}"
			:modules="[Pagination, Navigation]"
			:loop="loop"
			class="relative"
		>
			<slot/>
		</Swiper>

		<div class="relative flex justify-end items-center mt-4 py-5 z-0 mx-16">

			<!-- Navigation Buttons (Right Side) -->
			<div class="flex items-center gap-12">
				<div
					:class="[
						'swiper-button-prev relative after:content-none w-8 h-8',
						theme === 'dark'
							? 'bg-white/40 text-white'
							: 'bg-transparent text-black',
					]"
				>
					<UIcon name="lucide:arrow-right" class="!size-6 text-black" />
				</div>
				<div
					:class="[
						'swiper-button-next relative after:content-none w-8 h-8',
						theme === 'dark'
							? 'bg-white/40 text-white'
							: 'bg-transparent text-black',
					]"
				>
					<UIcon name="lucide:arrow-left" class="!size-6 text-black" />
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.swiper-pagination-bullet {
	background-color: transparent !important;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	overflow: hidden;
}

.swiper-pagination-bullet-active {
	background-color: transparent !important;
	width: 25px;
	border-radius: 10px;
}

.swiper-pagination-bullet-active::after {
	content: "";
	width: 10px;
	height: 10px;
	background: #000;
	border-radius: 50%;
	position: relative;
	transition: all 0.3s ease;
}

.bg-chinese-black .swiper-pagination-bullet-active {
	background-color: #323131 !important;
	width: 25px;
	border-radius: 10px;
}

.bg-chinese-black .swiper-pagination-bullet-active::after {
	background: #fff;
}

.swiper-button-next::after,
.swiper-button-prev::after {
	display: none !important;
	content: none !important;
}
</style>
