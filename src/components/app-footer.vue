<script setup lang="ts">
import ContainerWrapper from "./container-wrapper.vue";
</script>

<template>
	<div class="bg-grey py-16 mt-16">
		<ContainerWrapper>
			<div class="flex flex-col md:flex-row p-4 md:p-10 gap-10 md:gap-3">
				<div class="w-full md:w-1/3 flex flex-col gap-5 items-start">
					<img
						src="../assets/images/logo.png"
						alt="kingsville church logo"
						class="h-15"
					/>
					<h4 class="!font-bold">Kingsville Church</h4>
					<p>Raising Successful Godly Lights.</p>
					<NuxtLink to="/contact" class="link">
						<button>Contact Us</button>
					</NuxtLink>
				</div>

				<div class="flex-1 flex gap-3">
					<div class="w-1/3 flex flex-col gap-5 items-start">
						<p class="text-dark-grey">Our Home</p>
						<div class="flex flex-col gap-3 items-start">
							<NuxtLink to="/about" class="link">About</NuxtLink>
							<NuxtLink to="#" class="link">Ministries</NuxtLink>
							<NuxtLink to="#" class="link"
								>Media Center</NuxtLink
							>
							<NuxtLink to="/contact" class="link"
								>Contact</NuxtLink
							>
						</div>
					</div>
					<div class="w-1/3 flex flex-col gap-5 items-start">
						<p class="text-dark-grey">Locations</p>
						<div class="flex flex-col gap-3 items-start">
							<NuxtLink to="#" class="link">Alagomeji</NuxtLink>
							<NuxtLink to="#" class="link">Okota</NuxtLink>
						</div>
					</div>
					<div class="w-1/3 flex flex-col gap-5 items-start">
						<p class="text-dark-grey">Families</p>
						<div class="flex flex-col gap-3 items-start">
							<NuxtLink to="#" class="link"
								>Extraordinary Women's Fellowship</NuxtLink
							>
							<NuxtLink to="#" class="link"
								>Livelystones Youth Fellowship</NuxtLink
							>
							<NuxtLink to="#" class="link">Men on Fire</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</ContainerWrapper>
	</div>
</template>
