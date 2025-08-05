<template>
	<div class="font-dosis">
		<NuxtLayout>
			<AppHeader />
			<NuxtPage />
			<AppFooter />
		</NuxtLayout>
	</div>
</template>

<script setup>
import AppHeader from "./src/components/app-header.vue";
import AppFooter from "./src/components/app-footer.vue";
</script>
