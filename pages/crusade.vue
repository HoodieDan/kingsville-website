<script setup lang="ts">
import ContainerWrapper from "~/src/components/container-wrapper.vue";
import { useScrollAnimations } from "~/src/composables/useScrollAnimation";

useScrollAnimations();

useHead({
  title: "It Is Finished - Easter Crusade | Kingsville Church",
  meta: [
    {
      name: "description",
      content:
        "Join Kingsville Church for our Easter Crusade - It Is Finished: Celebrating Resurrection. Good Friday 3rd April, Holy Saturday 4th April at 5:00 PM, and Easter Sunday 5th April.",
    },
  ],
});

const features = ["Healing", "Deliverance", "Salvation", "Hope Restored"];

// Countdown timer logic
const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
const countdownLabel = ref("Good Friday Service");
const countdownEnded = ref(false);

const GOOD_FRIDAY_TARGET = new Date("2026-04-03T17:00:00+01:00"); // WAT
const HOLY_SATURDAY_TARGET = new Date("2026-04-04T17:00:00+01:00");

const currentTarget = ref(GOOD_FRIDAY_TARGET);

const updateCountdown = () => {
  const now = new Date().getTime();

  if (now >= HOLY_SATURDAY_TARGET.getTime()) {
    countdownEnded.value = true;
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    countdownLabel.value = "The Crusade Has Begun!";
    return;
  }

  if (now >= GOOD_FRIDAY_TARGET.getTime()) {
    currentTarget.value = HOLY_SATURDAY_TARGET;
    countdownLabel.value = "Holy Saturday Service";
  } else {
    currentTarget.value = GOOD_FRIDAY_TARGET;
    countdownLabel.value = "Good Friday Service";
  }

  const distance = currentTarget.value.getTime() - now;

  countdown.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
};

let countdownInterval: NodeJS.Timeout | null = null;

onMounted(() => {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval);
});

// Videos — Replace cloudinaryUrl with actual Cloudinary video URLs after uploading
const videos = ref([
  {
    id: 1,
    cloudinaryUrl: "https://res.cloudinary.com/du5cun8t9/video/upload/v1774708188/Rev_preaching_1_h5vace.mp4",
    placeholderLabel: "Rev. Paul Preaching",
  },
  {
    id: 2,
    cloudinaryUrl: "https://res.cloudinary.com/du5cun8t9/video/upload/v1774705198/Rev_Paul_prophesying_1_cmd6sk.mp4",
    placeholderLabel: "Rev. Paul Prophesying",
  },
  {
    id: 3,
    cloudinaryUrl: "https://res.cloudinary.com/du5cun8t9/video/upload/v1774708153/Testimony_1_hcodel.mp4",
    placeholderLabel: "Testimony",
  },
]);

const padZero = (n: number) => String(n).padStart(2, "0");
</script>

<template>
  <div class="flex flex-col">
    <!-- Hero Banner -->
    <section class="relative w-full h-[28rem] md:h-[36rem] overflow-hidden">
      <img
        src="../public/images/who-we-are.JPG"
        alt="It Is Finished - Easter Crusade"
        class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-black/60" />
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <p class="text-xs md:text-sm uppercase tracking-[0.3em] text-primary-orange mb-4 font-semibold t__reveal__animate">
          Kingsville Church Presents
        </p>
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight t__reveal__animate">
          it is
          <span class="block text-5xl md:text-7xl lg:text-8xl font-serif italic">Finished</span>
        </h1>
        <p class="text-base md:text-xl uppercase tracking-[0.15em] mt-4 text-white/80 t__fade__animate">
          Celebrating Resurrection
        </p>
        <p class="text-sm text-white/60 mt-3 t__fade__animate">
          Good Friday &amp; Holy Saturday at 5:00 PM | Easter Sunday at 9:00 AM &amp; 11:30 AM
        </p>
      </div>
    </section>

    <!-- Feature Tags + Countdown Bar -->
    <section class="bg-primary-blue text-white py-6">
      <ContainerWrapper>
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <!-- Features -->
          <div class="flex flex-wrap justify-center md:justify-start gap-2">
            <span class="text-sm font-semibold uppercase tracking-wider text-primary-orange mr-2">Featuring:</span>
            <span
              v-for="feature in features"
              :key="feature"
              class="text-sm text-white/80"
            >
              {{ feature }}<span class="mx-1 text-primary-orange">&middot;</span>
            </span>
          </div>
          <!-- Countdown -->
          <div class="flex items-center gap-4">
            <p v-if="!countdownEnded" class="text-xs uppercase tracking-wider text-white/60 hidden md:block">
              {{ countdownLabel }} in:
            </p>
            <p v-else class="text-sm text-primary-orange font-semibold">
              The Crusade is Here!
            </p>
            <div v-if="!countdownEnded" class="flex gap-2">
              <div class="bg-white/10 rounded-lg px-3 py-2 text-center min-w-[3rem]">
                <span class="text-lg font-bold block">{{ padZero(countdown.days) }}</span>
                <span class="text-[10px] uppercase text-white/50">Days</span>
              </div>
              <div class="bg-white/10 rounded-lg px-3 py-2 text-center min-w-[3rem]">
                <span class="text-lg font-bold block">{{ padZero(countdown.hours) }}</span>
                <span class="text-[10px] uppercase text-white/50">Hrs</span>
              </div>
              <div class="bg-white/10 rounded-lg px-3 py-2 text-center min-w-[3rem]">
                <span class="text-lg font-bold block">{{ padZero(countdown.minutes) }}</span>
                <span class="text-[10px] uppercase text-white/50">Min</span>
              </div>
              <div class="bg-primary-orange/20 rounded-lg px-3 py-2 text-center min-w-[3rem]">
                <span class="text-lg font-bold block text-primary-orange">{{ padZero(countdown.seconds) }}</span>
                <span class="text-[10px] uppercase text-primary-orange/60">Sec</span>
              </div>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </section>

    <!-- Main Content Area -->
    <div class="py-16">
      <ContainerWrapper>
        <!-- Intro -->
        <div class="mb-16">
          <h2 class="!font-bold text-primary-blue t__reveal__animate">
            It Is <span class="!font-normal text-primary-orange">Finished</span>
            — Celebrating Resurrection
          </h2>
          <p class="mt-4 text-gray-600 leading-relaxed t__fade__animate">
            Kingsville Church invites you to a special Easter Crusade themed
            <strong>"It Is Finished — Celebrating Resurrection."</strong> Join us
            for three unforgettable days of worship, the Word, healing,
            deliverance, salvation, and hope restored as we mark the death and
            glorious resurrection of our Lord Jesus Christ.
          </p>

          <!-- Schedule Details -->
          <div class="mt-8 space-y-4 t__reveal__animate">
            <div class="flex items-start gap-4 p-4 bg-grey rounded-lg">
              <div class="bg-primary-blue text-white text-center rounded-lg px-3 py-2 min-w-[4.5rem]">
                <span class="text-xs uppercase block">Apr</span>
                <span class="text-2xl font-bold block">3</span>
              </div>
              <div>
                <h5 class="font-semibold text-primary-blue">Good Friday</h5>
                <p class="text-sm text-gray-600">5:00 PM Prompt</p>
                <p class="text-sm text-gray-500">On Akinwunmi Street, Off Hughes Avenue, Alagomeji Yaba Lagos</p>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-grey rounded-lg">
              <div class="bg-primary-blue text-white text-center rounded-lg px-3 py-2 min-w-[4.5rem]">
                <span class="text-xs uppercase block">Apr</span>
                <span class="text-2xl font-bold block">4</span>
              </div>
              <div>
                <h5 class="font-semibold text-primary-blue">Holy Saturday</h5>
                <p class="text-sm text-gray-600">5:00 PM Prompt</p>
                <p class="text-sm text-gray-500">On Akinwunmi Street, Off Hughes Avenue, Alagomeji Yaba Lagos</p>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-grey rounded-lg">
              <div class="bg-primary-orange text-white text-center rounded-lg px-3 py-2 min-w-[4.5rem]">
                <span class="text-xs uppercase block">Apr</span>
                <span class="text-2xl font-bold block">5</span>
              </div>
              <div>
                <h5 class="font-semibold text-primary-orange">Easter Sunday</h5>
                <p class="text-sm text-gray-600">1st Service: 9:00 AM &middot; 2nd Service: 11:30 AM</p>
                <p class="text-sm text-gray-500">Kingsville Church, 2 Akinwunmi Street Off Hughes Avenue, Alagomeji Yaba Lagos</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <hr class="border-gray-200 mb-16">

        <!-- Videos Section -->
        <div class="mb-16">
          <h2 class="!font-bold text-primary-blue t__reveal__animate">
            A Glimpse of What <span class="!font-normal text-primary-orange">God Is Doing</span>
          </h2>
          <p class="mt-4 text-gray-600 leading-relaxed t__fade__animate">
            At Kingsville Church, we have seen the hand of God move in remarkable
            ways — lives healed, chains broken, and hope restored. As we prepare
            for this Easter Crusade, we want to share a few moments that remind us
            why we gather with such expectation.
          </p>

          <!-- Video 1: Rev. Paul Preaching -->
          <div class="mt-12 t__reveal__animate">
            <p class="text-gray-600 leading-relaxed mb-4 t__fade__animate">
              In this message, Rev. Paul Rotua shares the significance of Christ's
              finished work on the cross — a word that captures the very heart of
              what this Easter Crusade is about. Come expecting to encounter the
              power of the resurrection.
            </p>
            <div class="t__clip__animate">
              <div v-if="videos[0].cloudinaryUrl" class="aspect-video rounded-xl overflow-hidden">
                <video
                  :src="videos[0].cloudinaryUrl"
                  controls
                  preload="metadata"
                  class="w-full h-full object-cover bg-black"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div v-else class="aspect-video rounded-xl overflow-hidden bg-gray-900 flex flex-col items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 text-primary-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-lg font-semibold">{{ videos[0].placeholderLabel }}</p>
                <p class="text-sm text-white/50 mt-1">Video coming soon</p>
              </div>
            </div>
          </div>

          <!-- Video 2: Rev. Paul Prophesying -->
          <div class="mt-12 t__reveal__animate">
            <p class="text-gray-600 leading-relaxed mb-4 t__fade__animate">
              Watch as the Spirit of God moves through Rev. Paul in a powerful
              prophetic moment. Lives are touched, destinies redirected, and God's
              promises declared over His people. This is the atmosphere you can
              expect when you join us this Easter.
            </p>
            <div class="t__clip__animate">
              <div v-if="videos[1].cloudinaryUrl" class="aspect-video rounded-xl overflow-hidden">
                <video
                  :src="videos[1].cloudinaryUrl"
                  controls
                  preload="metadata"
                  class="w-full h-full object-cover bg-black"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div v-else class="aspect-video rounded-xl overflow-hidden bg-gray-900 flex flex-col items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 text-primary-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-lg font-semibold">{{ videos[1].placeholderLabel }}</p>
                <p class="text-sm text-white/50 mt-1">Video coming soon</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <hr class="border-gray-200 mb-16">

        <!-- Testimony Section -->
        <div class="mb-16">
          <h2 class="!font-bold text-primary-blue t__reveal__animate">
            Stories of <span class="!font-normal text-primary-orange">God's Faithfulness</span>
          </h2>
          <p class="mt-4 text-gray-600 leading-relaxed t__fade__animate">
            These are real stories from real people whose lives have been
            transformed by the power of God at Kingsville Church. As you watch,
            let faith rise in your heart — because the same God who did it for
            them is ready to do it for you this Easter.
          </p>

          <!-- Video 3: Testimony -->
          <div class="mt-8 t__reveal__animate">
            <div class="t__clip__animate">
              <div v-if="videos[2].cloudinaryUrl" class="aspect-video rounded-xl overflow-hidden">
                <video
                  :src="videos[2].cloudinaryUrl"
                  controls
                  preload="metadata"
                  class="w-full h-full object-cover bg-black"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div v-else class="aspect-video rounded-xl overflow-hidden bg-gray-900 flex flex-col items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 text-primary-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-lg font-semibold">{{ videos[2].placeholderLabel }}</p>
                <p class="text-sm text-white/50 mt-1">Video coming soon</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <hr class="border-gray-200 mb-16">

        <!-- CTA -->
        <div class="bg-primary-blue rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-primary-orange/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-primary-orange/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div class="relative z-10 text-center">
            <h3 class="!font-bold text-white t__reveal__animate">
              Join Us This Easter
            </h3>
            <p class="mt-4 text-white/80 max-w-xl mx-auto t__fade__animate">
              Come and experience the power of the resurrection. Whether you need
              healing, deliverance, salvation, or hope — God has a miracle waiting
              for you. Invite your family and friends!
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                class="!bg-primary-orange !text-white px-8 py-3 rounded-xl font-semibold hover:!bg-primary-orange/90 transition"
                @click="navigateTo('/contact')"
              >
                Get Directions
              </button>
              <button
                class="!bg-white/10 !text-white border border-white/30 px-8 py-3 rounded-xl font-semibold hover:!bg-white/20 transition"
                @click="navigateTo('/')"
              >
                Back to Home
              </button>
            </div>

            <!-- Social Icons -->
            <div class="mt-8 flex justify-center gap-5">
              <a
                href="https://www.facebook.com/share/1CK52nBB4j/?mibextid=wwXIfr"
                class="text-white/60 hover:text-white transition"
                target="_blank"
                rel="noopener"
              >
                <UIcon name="lucide:facebook" class="text-xl" />
              </a>
              <a
                href="https://www.instagram.com/kingsvillechurchglobal?igsh=Mm9uZTV1ZW1ycGMy&utm_source=ig_contact_invite"
                class="text-white/60 hover:text-white transition"
                target="_blank"
                rel="noopener"
              >
                <UIcon name="lucide:instagram" class="text-xl" />
              </a>
              <a
                href="https://youtube.com/@kingsvillechurchlagos?si=ha27xgsETbiN2_FK"
                class="text-white/60 hover:text-white transition"
                target="_blank"
                rel="noopener"
              >
                <UIcon name="lucide:youtube" class="text-xl" />
              </a>
              <a
                href="https://x.com/kingsvillelagos?s=21"
                class="text-white/60 hover:text-white transition"
                target="_blank"
                rel="noopener"
              >
                <UIcon name="lucide:twitter" class="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </div>
  </div>
</template>
