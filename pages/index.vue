<script setup lang="ts">
import ContainerWrapper from "~/src/components/container-wrapper.vue";
</script>

<template>
	<div class="py-5 flex flex-col gap-10">
		<ContainerWrapper>
			<div
				class="bg-black text-white p-4 rounded-2xl flex flex-col items-start gap-3"
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

		<ContainerWrapper class="mt-5">
			<h2 class="!font-bold">
				Visit any of our
				<span class="font-zenith italic font-normal">Branches</span>
			</h2>
			<p class="font-semibold mt-4">
				Our roots are in Alagomeji and Okota though we are reaching the
				world. Join us to enjoy the word at any of our branches.
			</p>
			<div class="flex gap-10 mt-5 flex-col md:flex-row">
				<div class="flex-1">
					<div class="h-screen w-full flex flex-col gap-3">
						<div class="bg-placeholder flex-1 rounded-md"></div>
						<h3 class="!font-bold">Alagomeji</h3>
						<p>
							2 Akinwunmi street, off Hughes Ave, Alagomeji-Yaba,
							Lagos
						</p>
					</div>
				</div>
				<div class="flex-1">
					<div class="h-screen w-full flex flex-col gap-3">
						<div class="bg-placeholder flex-1 rounded-md"></div>
						<h3 class="!font-bold">Okota</h3>
						<p>101 Okota Rd, Ilasamaja, Lagos 102214, Lagos.</p>
					</div>
				</div>
			</div>
		</ContainerWrapper>

		<ContainerWrapper class="mt-32">
			<div class="bg-grey rounded-lg relative p-10">
				<div class="flex flex-col-reverse md:flex-row gap-3">
					<div class="flex-1 mt-72 md:mt-0">
						<h1 class="!font-bold mb-12 md:absolute md:-top-18 md:left-24">
							Join Us
						</h1>
						<div class="md:px-24 md:-pb-12 relative bottom-10">
							<h2 class="font-zenith !font-normal">in Church</h2>
							<h2 class="font-zenith !font-normal italic">
								Online
							</h2>
							<p class="mt-3">
								Join us every Sunday at 9:00 AM and 11:30 AM in
								church or you can join our service online and
								stream from wherever you are.
							</p>
                            <button class="mt-4">
                                Watch Online
                            </button>
						</div>
					</div>
					<div class="flex-1 relative">
						<div class="bg-placeholder w-full md:h-[500px] h-96 !absolute -top-32 rounded-lg"></div>
					</div>
				</div>
			</div>
		</ContainerWrapper>
	</div>
</template>
