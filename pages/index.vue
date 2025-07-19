<script setup lang="ts">
import ContainerWrapper from "~/src/components/container-wrapper.vue";
import SwiperCarousel from "~/src/components/swiper-carousel.vue";
import { SwiperSlide } from "swiper/vue";

const pastors = ref([
	{
		name: "Reverend Paul Rotua",
		title: "Global Pastor",
		image: "/images/pastor1.jpg",
		summary:
			"With a passion to see people attain self-actualization by manifesting their potentials in the grace and love of God, he shares the message of God’s awesome grace with simplicity, clarity and an unwavering sincerity to see people’s lives transformed.",
	},
	{
		name: "Pastor Uba Onyenefa",
		title: "Okota branch Pastor",
		image: "/images/pastor1.jpg",
		summary:
			"With a passion to see people attain self-actualization by manifesting their potentials in the grace and love of God, he shares the message of God’s awesome grace with simplicity, clarity and an unwavering sincerity to see people’s lives transformed.",
	},
]);
</script>

<template>
	<div class="py-5 flex flex-col md:gap-10">
		<ContainerWrapper>
			<div
				class="bg-black text-white p-10 rounded-3xl flex flex-col items-start gap-3"
			>
				<div class="flex flex-col gap-2">
					<h1>Raising</h1>
					<h1>Successful</h1>
					<h1>Godly</h1>
					<h1>Lights</h1>
				</div>
				<p class="md:w-2/5 mt-10">
					Welcome to a place where the gospel is central and Jesus is
					always the lead story. We are a Jesus church and want to
					gather in worship and scatter to shine His light and love
					throughout the city and beyond.
				</p>
				<button>Learn More</button>
			</div>
		</ContainerWrapper>

		<ContainerWrapper class="mt-24">
			<h2 class="!font-bold text-primary-blue">
				Visit any of our
				<span class="font-zenith italic font-normal text-primary-orange">Branches</span>
			</h2>
			<p class="font-semibold mt-4">
				Our roots are in Alagomeji and Okota though we are reaching the
				world. Join us to enjoy the word at any of our branches.
			</p>
			<div class="flex gap-10 mt-5 flex-col md:flex-row">
				<div class="flex-1">
					<div class="h-96 md:h-screen w-full flex flex-col gap-3">
						<div class="bg-placeholder flex-1 rounded-md"/>
						<h3 class="!font-bold text-primary-blue">Alagomeji</h3>
						<p>
							2 Akinwunmi street, off Hughes Ave, Alagomeji-Yaba,
							Lagos
						</p>
					</div>
				</div>
				<div class="flex-1">
					<div class="h-96 md:h-screen w-full flex flex-col gap-3">
						<div class="bg-placeholder flex-1 rounded-md"/>
						<h3 class="!font-bold text-primary-orange">Okota</h3>
						<p>101 Okota Rd, Ilasamaja, Lagos 102214, Lagos.</p>
					</div>
				</div>
			</div>
		</ContainerWrapper>

		<ContainerWrapper class="mt-50">
			<div class="bg-grey rounded-lg relative p-10">
				<div class="flex flex-col-reverse md:flex-row gap-3">
					<div class="flex-1 mt-72 md:mt-0">
						<h1
							class="!font-bold mb-12 md:absolute md:-top-18 md:left-24 text-primary-blue"
						>
							Join Us
						</h1>
						<div class="md:px-24 md:-pb-12 relative bottom-10">
							<h2 class="font-zenith !font-normal text-primary-orange">in Church</h2>
							<h2 class="font-zenith !font-normal italic text-primary-orange">
								Online
							</h2>
							<p class="mt-3">
								Join us every Sunday at 9:00 AM and 11:15 AM in
								church or you can join our service online and
								stream from wherever you are.
							</p>
							<button class="mt-4">Watch Online</button>
						</div>
					</div>
					<div class="flex-1 relative">
						<div
							class="bg-placeholder w-full lg:h-[32rem] md:h-[32rem] h-96 !absolute -top-32 rounded-lg"
						/>
					</div>
				</div>
			</div>
		</ContainerWrapper>

		<ContainerWrapper class="mt-24">
			<div class="bg-grey rounded-lg p-8">
				<h2 class="!font-bold text-primary-blue">Our Leadership</h2>
				<div class="lg:px-10 lg:pt-10">
					<swiper-carousel
						:slides-per-view="1"
						:space-between="0"
						:loop="true"
						theme="light"
						class="mt-10 w-full"
					>
						<swiper-slide
							v-for="pastor in pastors"
							:key="pastor.name"
							class="w-full max-w-full overflow-hidden"
						>
							<div
								class="flex flex-col-reverse md:flex-row gap-5"
							>
								<div class="flex-1 sm:p-10">
									<small class="!font-mono">{{
										pastor.title
									}}</small>
									<h3 class="mt-2 !font-semibold text-primary-orange">{{ pastor.name }}</h3>
									<p class="mt-3">{{ pastor.summary }}</p>
								</div>
								<div class="flex-1">
									<div
										class="h-96 bg-placeholder w-full rounded-md"
									/>
								</div>
							</div>
						</swiper-slide>
					</swiper-carousel>
				</div>
			</div>
		</ContainerWrapper>
	</div>
</template>
