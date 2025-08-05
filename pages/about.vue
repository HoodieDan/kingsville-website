<script setup lang="ts">
import ContainerWrapper from "~/src/components/container-wrapper.vue";
import { useScrollAnimations } from "~/src/composables/useScrollAnimation";

useScrollAnimations();
</script>

<template>
	<div class="py-10 flex flex-col md:gap-10">
		<ContainerWrapper>
			<div class="flex flex-col-reverse md:flex-row">
				<div class="w-full md:w-5/12 p-5">
					<h2 class="!font-bold mb-5 text-primary-blue t__reveal__animate">
						Who we
						<span
							class="!font-normal !font-zenith italic text-primary-orange"
							>are</span
						>
					</h2>
					<p class="t__fade__animate">
						Kingsville Church was commissioned on a beautiful Easter
						Sunday in 2009. With worshippers from all the senatorial
						districts of Lagos state, we are a cosmopolitan church
						with an uncompromising tradition of life in the Word and
						the Spirit. We are driven by a desire for
						self-actualization in God; where every worshipper has
						unforgettable encounters and experiences with the word
						of His grace.
					</p>

					<div class="mt-6">
						<div class="mt-2">
							<h5
								class="!font-zenith !font-normal mb-4 text-primary-blue t__reveal__animate"
							>
								Service Times
							</h5>
							<div>
								<h6
									class="font-dark-grey mb-3 text-primary-orange t__reveal__animate"
								>
									Sundays
								</h6>
								<p class="t__fade__animate">
									English Language Service at 9:00 AM to 11:15
									AM
								</p>
								<p class="t__fade__animate">
									Yoruba Language Service at 11:30 AM to 1:00
									PM
								</p>
							</div>
							<div class="mt-4">
								<h6
									class="font-dark-grey mb-3 text-primary-orange t__reveal__animate"
								>
									Thursdays
								</h6>
								<p class="t__fade__animate">
									Every week from 6:45 PM to 8:00 PM
								</p>
							</div>
						</div>
					</div>
					<div class="mt-6">
						<div class="mt-2">
							<h5
								class="!font-zenith !font-normal mb-4 text-primary-blue t__reveal__animate"
							>
								Locations
							</h5>
							<p class="mb-1 t__fade__animate">
								2 Akinwunmi street, off Hughes Ave,
								Alagomeji-Yaba, Lagos
							</p>
							<p class="t__fade__animate">101 Okota Rd, Ilasamaja, Lagos 102214, Lagos.</p>
						</div>
					</div>
				</div>
				<div
					class="w-full md:w-7/12 h-[35rem] bg-placeholder rounded-md"
				>
					<img
						src="../public/images/who-we-are.jpeg"
						alt="people worshipping"
						class="w-full h-full object-cover rounded-md t__clip__animate"
					/>
				</div>
			</div>
		</ContainerWrapper>

		<ContainerWrapper class="mt-24">
			<div class="flex flex-col md:flex-row md:items-center">
				<div class="w-full md:w-1/3 h-72 bg-placeholder rounded-md">
					<img
						src="../public/images/our-passion.jpeg"
						alt="elder law worshipping"
						class="w-full h-full object-cover rounded-md t__clip__animate"
					/>
				</div>
				<div class="w-full md:w-2/3 p-10">
					<h5 class="!font-zenith text-primary-orange mb-5 t__reveal__animate">
						Our Passion
					</h5>
					<h4 class="my-7 !font-bold text-primary-blue t__reveal__animate">
						The future we're building
					</h4>
					<p class="t__fade__animate">
						4 Pillars of Kingsville Church: We are passionate about
						<span class="!font-zenith italic"
							>‘…raising successful godly lights’</span
						>
						in their:
					</p>
					<ul class="mt-4">
						<li class="t__reveal__animate">Career</li>
						<li class="t__reveal__animate">Relationship</li>
						<li class="t__reveal__animate">Health</li>
						<li class="t__reveal__animate">Finance</li>
					</ul>
				</div>
			</div>
		</ContainerWrapper>

		<ContainerWrapper class="mt-24">
			<div class="flex flex-col-reverse md:flex-row md:items-center">
				<div class="w-full md:w-2/3 p-10">
					<h5 class="!font-zenith text-primary-orange mb-5 t__reveal__animate">
						Our Vision
					</h5>
					<h4 class="my-7 !font-bold text-primary-blue t__fade__animate">
						Our Daily Pursuit
					</h4>
					<p class="t__fade__animate">
						At Kingsville Church, our vision is clear: to raise
						successful godly lights who shine in every area of life.
						This vision fuels all we do — from worship and
						discipleship to outreach and leadership.
					</p>

					<h6 class="mt-4">Our church is:</h6>
					<ul class="mt-2">
						<li class="t__reveal__animate">A soul-winning church</li>
						<li class="t__reveal__animate">A word-of-faith church</li>
						<li class="t__reveal__animate">A spirit-filled church</li>
						<li class="t__reveal__animate">
							Making a difference as a lighthouse through the love
							of God
						</li>
						<li class="t__reveal__animate">
							Equipping our members to be successful in life and
							ministry
						</li>
						<li class="t__reveal__animate">
							Equipping for godliness and preparing our people for
							eternity.
						</li>
					</ul>
				</div>
				<div class="w-full md:w-1/3 h-72 bg-placeholder rounded-md">
					<img
						src="../public/images/our-vision.jpeg"
						alt="ife on her knees worshipping"
						class="w-full h-full object-cover rounded-md t__clip__animate"
					/>
				</div>
			</div>
		</ContainerWrapper>

		<ContainerWrapper class="mt-24">
			<div class="flex flex-col md:flex-row md:items-center">
				<div class="w-full md:w-1/3 h-72 bg-placeholder rounded-md">
					<img
						src="../public/images/our-core-values.jpeg"
						alt="sis ufoma smiling"
						class="w-full h-full object-cover rounded-md t__clip__animate"
					/>
				</div>
				<div class="w-full md:w-2/3 p-10">
					<h5 class="!font-zenith text-primary-orange mb-5 t__reveal__animate">
						Our Core Values
					</h5>
					<h4 class="my-7 !font-bold text-primary-blue t__fade__animate">
						Living the Kingsville way
					</h4>
					<p class="t__fade__animate">
						Our values define our culture. SEAGRIP is more than an
						acronym — it’s how we serve, grow, and reflect Christ
						daily. These principles keep us grounded in purpose and
						unified in spirit.
					</p>
					<ul class="mt-4">
						<li class="t__reveal__animate">
							<span class="!font-zenith italic">S</span
							>pirituality
						</li>
						<li class="t__reveal__animate">
							<span class="!font-zenith italic">E</span>xcellence
						</li>
						<li class="t__reveal__animate">
							<span class="!font-zenith italic">A</span
							>ccountability
						</li>
						<li class="t__reveal__animate"><span class="!font-zenith italic">G</span>rowth</li>
						<li class="t__reveal__animate">
							<span class="!font-zenith italic">R</span
							>esponsibility
						</li>
						<li class="t__reveal__animate">
							<span class="!font-zenith italic">I</span>ntegrity
						</li>
						<li class="t__reveal__animate">
							<span class="!font-zenith italic">P</span
							>eople-friendliness
						</li>
					</ul>
				</div>
			</div>
		</ContainerWrapper>

		<ContainerWrapper>
			<div class="flex flex-col-reverse md:flex-row">
				<div class="w-full md:w-7/12 p-5">
					<h2 class="!font-bold mb-5 text-primary-blue">
						Meet
						<span
							class="!font-normal !font-zenith italic text-primary-orange"
							>Reverend Paul Rotua</span
						>
					</h2>
					<p class="t__fade__animate">
						A pastor from the heart, Reverend Paul Rotua has been in
						the Lord’s service since his teenage years as president
						of the Christian Fellowship of the Federal Government
						College, Ijanikin, Lagos; and later as an associate
						pastor in Victory Christian Fellowship (VCF) at the
						University of Ibadan, where he studied Human Nutrition.
						Fondly called Pastor Paul, his life has been
						characterised by the manifestation of the grace of God;
						which has been the main thrust of his service to the
						Body of Christ and the world.
					</p>
					<p class="mt-3 t__fade__animate">
						With a passion to see people attain self-actualization
						by manifesting their potentials in the grace and love of
						God, he shares the message of God’s awesome grace with
						simplicity, clarity and an unwavering sincerity to see
						people’s lives transformed. A regular speaker at
						conferences at home and abroad, he is the host of the
						highly acclaimed Encounters with Grace on radio and
						Encounters with Grace Live, a specialised teaching
						outreach.
					</p>
					<p class="mt-3 t__fade__animate">
						Happily married to his beloved Olusade who co-pastors
						with him and is also the convener of the annual
						Extraordinary Women Conference. They are blessed with
						three lovely daughters, Melissa, Melody and Megan.
					</p>
				</div>
				<div
					class="w-full md:w-5/12 h-[35rem] bg-placeholder rounded-md"
				>
					<img
						src="../public/images/meet-rev.jpeg"
						alt="Reverend Paul Rotua"
						class="w-full h-full object-cover rounded-md t__clip__animate"
					/>
				</div>
			</div>
		</ContainerWrapper>
	</div>
</template>
