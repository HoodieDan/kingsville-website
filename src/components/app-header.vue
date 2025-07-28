<script setup lang="ts">
import ContainerWrapper from "./container-wrapper.vue";
import { gsap } from "gsap";

const navIsOpen = ref(false);

const tl = gsap.timeline({
	defaults: { duration: 0.5, ease: "power1.out" },
	paused: true,
});

onMounted(() => {
	tl.to(".navbar-overlay", {
		opacity: 1,
		backgroundColor: "rgba(0, 0, 0)",
		pointerEvents: "auto",
	})
		.fromTo(".nav-toggle", { color: "#000" }, { color: "#fff" })
		.from(".nav", { y: -50, opacity: 0 }, "<")
		.from(".nav-socials a", { y: -20, opacity: 0, stagger: 0.1 }, "<")
		.from(".nav-link", { y: -20, opacity: 0, stagger: 0.1 }, "<")
		.from(".nav-footer", { y: 20, opacity: 0 }, "<");
});

const toggleNav = () => {
	navIsOpen.value = !navIsOpen.value;
	if (navIsOpen.value) {
		tl.play();
	} else {
		tl.reverse();
	}
};
</script>

<template>
	<div>
		<div class="bg-grey py-2 hidden md:block">
			<ContainerWrapper>
				<div class="flex justify-center gap-5">
					<NuxtLink to="/about" class="link">About</NuxtLink>
					<!-- <NuxtLink to="#" class="link">Ministries</NuxtLink> -->
					<NuxtLink to="#" class="link">Media Center</NuxtLink>
					<NuxtLink to="/contact" class="link">Contact</NuxtLink>
				</div>
			</ContainerWrapper>
		</div>
		<ContainerWrapper>
			<div class="flex justify-between items-center py-5 md:py-3">
				<NuxtLink to="/"
					><img
						src="../assets/images/logo.png"
						alt="kingsville church logo"
						class="h-15"
				/></NuxtLink>

				<div class="flex gap-2 items-center">
					<NuxtLink to="/events"
						><button>Upcoming Events</button></NuxtLink
					>
					<UIcon
						:name="navIsOpen ? 'lucide:x' : 'lucide:menu'"
						class="nav-toggle size-7 cursor-pointer z-[10000]"
						@click="toggleNav"
					/>
				</div>
			</div>
		</ContainerWrapper>

		<div
			class="navbar-overlay !fixed opacity-0 top-0 left-0 bg-transparent pointer-events-none w-screen h-screen flex justify-center items-center text-white z-[9999]"
		>
			<ContainerWrapper>
				<div class="w-full p-4 md:p-48">
					<div>
						<div
							class="nav flex justify-between items-center w-full"
						>
							<div
								class="flex flex-col justify-between items-start p-10 lg:p-0"
							>
								<div class="logo mb-10">
									<img
										src="../assets/images/logo.png"
										alt="kingsville logo"
										class="h-15 md:h-30"
									/>
								</div>
								<div
									class="nav-socials flex gap-5 w-full justify-between"
								>
									<a
										href="https://www.facebook.com/share/1CK52nBB4j/?mibextid=wwXIfr"
										class="link"
										target="_blank"
										rel="noopener"
									>
										<UIcon name="lucide:facebook" class="text-md md:text-3xl" />
									</a>
									<a
										href="https://www.instagram.com/kingsvillechurchglobal?igsh=Mm9uZTV1ZW1ycGMy&utm_source=ig_contact_invite"
										class="link"
										target="_blank"
										rel="noopener"
									>
										<UIcon name="lucide:instagram" class="text-md md:text-3xl" />
									</a>
									<a
										href="https://youtube.com/@kingsvillechurchlagos?si=ha27xgsETbiN2_FK"
										class="link"
										target="_blank"
										rel="noopener"
									>
										<UIcon name="lucide:youtube" class="text-md md:text-3xl" />
									</a>
									<!-- <a
										href="https://www.tiktok.com/@kingsvillechurch?_t=ZM-8yPUGBZbZfM&_r=1"
										class="link"
										target="_blank"
										rel="noopener"
									>
										<UIcon name="lucide:tiktok" class="text-md md:text-3xl" />
									</a> -->
									<a
										href="https://x.com/kingsvillelagos?s=21"
										class="link"
										target="_blank"
										rel="noopener"
									>
										<UIcon name="lucide:twitter" class="text-md md:text-3xl" />
									</a>
								</div>
							</div>

							<div
								class="flex flex-col gap-10 justify-between items-start p-10 md:p-48 !font-zenith italic text-2xl md:text-7xl"
							>
								<div class="nav-link">
									<NuxtLink to="/about" class="link"
										>About</NuxtLink
									>
									<div class="nav-item-wrapper"></div>
								</div>
								<div class="nav-link">
									<NuxtLink to="/media-center" class="link"
										>Media</NuxtLink
									>
									<div class="nav-item-wrapper"></div>
								</div>
								<div class="nav-link">
									<NuxtLink to="/events" class="link"
										>Events</NuxtLink
									>
									<div class="nav-item-wrapper"></div>
								</div>
								<div class="nav-link">
									<NuxtLink to="/contact" class="link"
										>Contact</NuxtLink
									>
									<div class="nav-item-wrapper"></div>
								</div>
							</div>

							<div
								class="nav-footer !absolute -bottom-30 md:bottom-0 lg:bottom-20 left-0 w-full flex justify-between items-center py-4"
							>
								<div class="contact">
									<a href="mailto:info@kingsvillechurch.com"
										>info@kingsvillechurch.com</a
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ContainerWrapper>
		</div>
	</div>
</template>

<style scoped></style>
