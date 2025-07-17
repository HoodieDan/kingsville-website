<script setup lang="ts">
import ContainerWrapper from "./container-wrapper.vue";
</script>

<template>
	<div>
		<div class="bg-grey py-2">
			<ContainerWrapper>
				<div class="flex justify-center gap-5">
					<NuxtLink to="#">About</NuxtLink>
					<NuxtLink to="#">Ministries</NuxtLink>
					<NuxtLink to="#">Media Center</NuxtLink>
					<NuxtLink to="#">Contact</NuxtLink>
				</div>
			</ContainerWrapper>
		</div>
		<ContainerWrapper>
			<div class="flex justify-between items-center py-3">
				<img
					src="../assets/images/logo.png"
					alt="kingsville church logo"
					class="h-15"
				>

				<div class="flex gap-2 items-center">
					<button>
						Upcoming Events
					</button>
					<UIcon name="lucide:menu" class="text-black size-7" />
				</div>
			</div>
		</ContainerWrapper>
	</div>
</template>
