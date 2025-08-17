<script setup lang="ts">
import ContainerWrapper from "~/src/components/container-wrapper.vue";
import SwiperCarousel from "~/src/components/swiper-carousel.vue";
import { SwiperSlide } from "swiper/vue";
import revMrsImage from "~/public/images/rev-mrs.jpg";
import revImage from "~/public/images/rev.jpg";
import { useScrollAnimations } from "~/src/composables/useScrollAnimation";

useScrollAnimations();

const pastors = ref([
	{
		name: "Rev. Paul Rotua",
		title: "Senior Pastor",
		image: revImage,
		summary:
			"A pastor from the heart, Reverend Paul Rotua has been in the Lord’s service since his teenage years as president of the Christian Fellowship of the Federal Government College, Ijanikin, Lagos; and later as an associate pastor in Victory Christian Fellowship (VCF) at the University of Ibadan, where he studied Human Nutrition. Fondly called Pastor Paul, his life has been characterised by the manifestation of the grace of God; which has been the main thrust of his service to the Body of Christ and the world. With a passion to see people attain self-actualization by manifesting their potentials in the grace and love of God, he shares the message of God’s awesome grace with simplicity, clarity and an unwavering sincerity to see people’s lives transformed. A regular speaker at conferences at home and abroad, he is the host of the highly acclaimed Encounters with Grace on radio and Encounters with Grace Live, a specialised teaching outreach.",
	},
	{
		name: "Pastor Sade Paul-Rotua",
		title: "Co Pastor",
		image: revMrsImage,
		summary:
			"Reverend Olusade Paul-Rotua is an ordained minister of God. She co-pastors Kingsville Church with her husband Rev. Paul Rotua. She heads the Extraordinary Women Fellowship, a non-denominational ministry with the vision of building women to live extraordinarily in all aspect of life. She is the convener of the Extraordinary Women’s Conference, an annual conference for women and the Demystifying Singleness, Marriage and Divorce Conference aimed at helping people navigate life as they transition throughout their different marital statuses.She is a graduate of University of Ibadan, with a B.Sc. and M.Sc. degrees in Biochemistry. She also holds an M.Sc. Degree in Human Resources Management from the Robert Gordon University, Aberdeen, Scotland. She is a Graduate of Rhema Bible Training Center, Nigeria.Olusade Paul-Rotua is a prolific writer and is passionate about assisting people to discover and attain their full potentials.She is happily married to her husband of over 25 years and they are blessed with three daughters.",
	},
]);
</script>

<template>
	<div class="py-5 flex flex-col md:gap-10">
		<div class="h-[45rem] md:h-screen w-screen md:px-10 pb-20">
			<ContainerWrapper class="h-full w-full">
				<div
					class="hero__div relative bg-black text-white rounded-3xl overflow-hidden h-full w-full"
					style="clip-path: inset(100% 0 0 0)"
				>
					<!-- Background video -->
					<video
						autoplay
						muted
						loop
						playsinline
						class="!absolute inset-0 w-full h-full object-cover z-0"
					>
						<source
							src="../src/assets/videos/bg.MOV"
							type="video/mp4"
						/>
						Your browser does not support the video tag.
					</video>

					<!-- Gradient overlay -->
					<div
						class="!absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"
					></div>

					<!-- Content -->
					<div
						class="!absolute bottom-0 z-20 flex flex-col items-start gap-3 p-10"
					>
						<div class="flex flex-col gap-2">
							<h1
								class="text-4xl font-bold t-animate hero__title"
								style="transform: translateY(100%); opacity: 0"
							>
								Raising Successful
							</h1>
							<h1
								class="text-4xl font-bold t-animate hero__title"
								style="transform: translateY(100%); opacity: 0"
							>
								Godly Lights
							</h1>
						</div>
						<p
							class="md:w-2/5 mt-10 hero__p"
							style="transform: translateY(100%); opacity: 0"
						>
							Welcome to a place where the gospel is central and
							Jesus is always the lead story. We are a Jesus
							church and want to gather in worship and scatter to
							shine His light and love throughout the city and
							beyond.
						</p>
						<button
							class="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition"
						>
							Learn More
						</button>
					</div>
				</div>
			</ContainerWrapper>
		</div>

		<ContainerWrapper>
			<h2 class="!font-bold text-primary-blue t__reveal__animate">
				Visit any of our
				<span class="font-normal text-primary-orange">Branches</span>
			</h2>
			<p class="font-semibold mt-4 t__fade__animate">
				Our roots are in Yaba and Okota though we are reaching the
				world. Join us to enjoy the word at any of our branches.
			</p>
			<div class="flex gap-30 md:gap-10 mt-5 flex-col md:flex-row">
				<div class="md:flex-1">
					<div class="h-screen w-full flex flex-col gap-3">
						<img
							src="../public/images/kvc-alagomeji.jpeg"
							alt="kingsville church Yaba"
							class="w-full h-full object-cover rounded-md t__clip__animate"
						/>
						<h3
							class="!font-bold text-primary-blue t__reveal__animate"
						>
							Yaba
						</h3>
						<p class="t__fade__animate">
							2 Akinwunmi Street, off Hughes Ave, Alagomeji-Yaba,
							Lagos
						</p>
					</div>
				</div>
				<div class="md:flex-1">
					<div class="h-screen w-full flex flex-col gap-3">
						<img
							src="../public/images/kvc-okota.jpg"
							alt="kingsville church alagomeji"
							class="w-full h-full object-cover rounded-md t__clip__animate"
						/>
						<h3
							class="!font-bold text-primary-orange t__reveal__animate"
						>
							Okota
						</h3>
						<p class="t__fade__animate">
							101 Okota Road, Okota, Lagos 102214, Lagos.
						</p>
					</div>
				</div>
			</div>
		</ContainerWrapper>

		<ContainerWrapper class="mt-12">
			<div class="bg-grey rounded-lg relative p-10">
				<div
					class="flex flex-col-reverse md:flex-row items-center gap-3"
				>
					<div class="flex-1 md:mt-0">
						<div
							class="md:pt-20 md:px-24 md:-pb-12"
						>
							<h2
								class="!font-bold text-primary-orange t__reveal__animate"
							>
								Join Us Online
							</h2>
							<p class="mt-3 t__fade__animate">
								Join us every Sunday at 9:00 AM and 11:30 AM in
								church or you can join our service online and
								stream from wherever you are.
							</p>
							<button class="mt-4">Watch Online</button>
						</div>
					</div>
					<div class="flex-1 relative">
						<div class="bg-placeholder w-full h-full rounded-lg">
							<img
								src="../public/images/join-us.jpeg"
								alt="join us"
								class="w-full h-full object-cover rounded-lg t__clip__animate"
							/>
						</div>
					</div>
				</div>
			</div>
		</ContainerWrapper>

		<ContainerWrapper class="mt-24">
			<div class="bg-grey rounded-lg p-8">
				<h2
					class="!font-bold text-primary-blue t__reveal__animate lg:px-10"
				>
					Our Leadership
				</h2>
				<div class="lg:px-10">
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
								class="flex flex-col-reverse md:flex-row md:items-center gap-5"
							>
								<div class="flex-1 sm:p-10">
									<small class="!font-mono">{{
										pastor.title
									}}</small>
									<h3
										class="mt-2 !font-semibold text-primary-orange"
									>
										{{ pastor.name }}
									</h3>
									<p class="mt-3">
										{{ pastor.summary }}
									</p>
								</div>
								<div class="flex-1">
									<div
										class="h-96 bg-placeholder w-full rounded-md"
									>
										<img
											:src="pastor.image"
											:alt="pastor.name"
											class="w-full h-full object-cover rounded-md t__clip__animate"
										/>
									</div>
								</div>
							</div>
						</swiper-slide>
					</swiper-carousel>
				</div>
			</div>
		</ContainerWrapper>
	</div>
</template>
