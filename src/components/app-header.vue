<script setup lang="ts">
import ContainerWrapper from "./container-wrapper.vue";
</script>

<template>
	<div>
		<div class="bg-grey py-2">
			<ContainerWrapper>
				<div class="flex justify-center gap-5">
					<NuxtLink to="/about" class="link">About</NuxtLink>
					<NuxtLink to="#" class="link">Ministries</NuxtLink>
					<NuxtLink to="#" class="link">Media Center</NuxtLink>
					<NuxtLink to="/contact" class="link">Contact</NuxtLink>
				</div>
			</ContainerWrapper>
		</div>
		<ContainerWrapper>
			<div class="flex justify-between items-center py-3">
				<NuxtLink to="/"
					><img
						src="../assets/images/logo.png"
						alt="kingsville church logo"
						class="h-15"
				></NuxtLink>

				<div class="flex gap-2 items-center">
					<button>Upcoming Events</button>
					<UIcon name="lucide:menu" class="text-black size-7" />
				</div>
			</div>
		</ContainerWrapper>
	</div>
</template>
