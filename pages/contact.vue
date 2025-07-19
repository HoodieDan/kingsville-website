<script setup lang="ts">
import ContainerWrapper from "~/src/components/container-wrapper.vue";
import { reactive } from "vue";

const formData = reactive({
	name: "",
	subject: "",
	message: "",
});

const handleFormSubmit = () => {
	const mailto = `mailto:info@kingsvillechurch.org?subject=${encodeURIComponent(
		formData.subject
	)}&body=${encodeURIComponent(
		`Hi Kingsville,\n\n${formData.message}\n\nBest regards,\n${formData.name}`
	)}`;
	window.location.href = mailto;
};
</script>

<template>
	<div class="py-10">
		<ContainerWrapper>
			<div class="flex flex-col md:flex-row gap-10">
				<div class="w-full md:w-7/12">
					<h2 class="!font-bold text-primary-blue">
						Let's connect —
					</h2>
					<h2
						class="!font-zenith !font-bold italic text-primary-orange"
					>
						We're here for you
					</h2>
					<p class="mt-4">
						Whether you have a question, need prayer, or simply want
						to say hello, we’d love to hear from you. At Kingsville
						Church, we believe in doing life together — and that
						includes staying connected with you. Reach out to us via
						any of the channels below or send us a message directly
						through the form.
					</p>
					<p class="mt-2">
						We’re ready to respond, pray with you, and walk with you
						on your journey of faith.
					</p>

					<div class="mt-6">
						<div class="mt-2">
							<div class="flex gap-3 mb-4">
								<UIcon
									name="lucide:map-pin"
									class="size-6 text-primary-orange"
								/>
								<h5
									class="!font-zenith !font-normal text-primary-blue"
								>
									Our Addresses
								</h5>
							</div>
							<p class="mb-1 font-medium">
								2 Akinwunmi street, off Hughes Ave,
								Alagomeji-Yaba, Lagos
							</p>
							<p class="font-medium">
								101 Okota Rd, Ilasamaja, Lagos 102214, Lagos.
							</p>
						</div>
					</div>

					<div class="mt-6">
						<div class="mt-2">
							<div class="flex gap-3 mb-4">
								<UIcon
									name="lucide:mail-check"
									class="size-6 text-primary-orange"
								/>
								<h5
									class="!font-zenith !font-normal text-primary-blue"
								>
									Email Us
								</h5>
							</div>
							<a
								href="mailto:info@kingsvillechurch.org"
								class="link"
								>info@kingsvillechurch.org</a
							>
						</div>
					</div>

					<div class="mt-6">
						<div class="mt-2">
							<div class="flex gap-3 mb-4">
								<UIcon
									name="lucide:phone"
									class="size-6 text-primary-orange"
								/>
								<h5
									class="!font-zenith !font-normal text-primary-blue"
								>
									Call Us
								</h5>
							</div>
							<div class="flex flex-col gap-3">
								<a href="tel:08087132005" class="link"
									>0808 713 2005</a
								>
								<a href="tel:08186740681" class="link"
									>0818 674 0681</a
								>
								<a href="tel:08024352686" class="link"
									>0802 435 2686</a
								>
							</div>
						</div>
					</div>
				</div>

				<div class="w-full md:w-5/12">
                    <h4 class="mb-7 text-primary-blue">Send a <span class="font-zenith italic text-primary-orange underline">message</span></h4>
					<form
						class="flex flex-col gap-5"
						@submit.prevent="handleFormSubmit"
					>
						<div>
							<label for="name" class="block mb-1 font-semibold"
								>Name</label
							>
							<input
								id="name"
								v-model="formData.name"
								name="name"
								type="text"
								class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-orange"
								placeholder="e.g. Osemudiame Obode"
								required
							/>
						</div>
						<div>
							<label
								for="subject"
								class="block mb-1 font-semibold"
								>Subject</label
							>
							<input
								id="subject"
								v-model="formData.subject"
								name="subject"
								type="text"
								class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-orange"
								placeholder="e.g. Inquiry about service times"
								required
							/>
						</div>
						<div>
							<label
								for="message"
								class="block mb-1 font-semibold"
								>Message</label
							>
							<textarea
								id="message"
								v-model="formData.message"
								name="message"
								rows="5"
								class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-orange"
								placeholder="Type your message here..."
								required
							/>
						</div>
						<button type="submit">Send Message</button>
					</form>
				</div>
			</div>
		</ContainerWrapper>
	</div>
</template>
