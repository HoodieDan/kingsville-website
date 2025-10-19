<script setup lang="ts">
import ContainerWrapper from "~/src/components/container-wrapper.vue";
import SwiperCarousel from "~/src/components/swiper-carousel.vue";
import EventCarousel from "~/src/components/event-carousel.vue";
import EventPromoBanner from "~/src/components/event-promo-banner.vue";
import { SwiperSlide } from "swiper/vue";
import { PrismicRichText } from "@prismicio/vue";
import revMrsImage from "~/public/images/rev-mrs.jpg";
import revImage from "~/public/images/rev.jpg";
import { useScrollAnimations } from "~/src/composables/useScrollAnimation";
import { useQuery } from "@tanstack/vue-query";

useScrollAnimations();

const prismic = usePrismic();

const { data } = useQuery({
  queryKey: ["events"],
  queryFn: async () => {
    const response = await prismic.client.getSingle("events");
    return response;
  },
});

// Compute the next event
const nextEvent = computed(() => {
  if (!data.value?.data?.slices) return null;

  const now = new Date();

  // First, check for camp meeting that hasn't ended yet
  const campMeeting = data.value.data.slices.find(
    (slice: {
      primary: {
        event_name: string;
        end_date_and_time: string | Date;
        start_date_and_time: string | Date;
      };
    }) => {
      const isCampMeeting = slice.primary.event_name
        ?.toLowerCase()
        .includes("camp meeting");
      const endTime = new Date(
        slice.primary.end_date_and_time || slice.primary.start_date_and_time
      );
      return isCampMeeting && endTime > now;
    }
  );

  if (campMeeting) {
    return campMeeting;
  }

  // Otherwise, find the next upcoming event by start time
  const sorted = [...data.value.data.slices].sort((a, b) => {
    return (
      new Date(a.primary.start_date_and_time).getTime() -
      new Date(b.primary.start_date_and_time).getTime()
    );
  });

  return sorted.find(
    (slice) => new Date(slice.primary.start_date_and_time) > now
  );
});

// Get images for the next event
const nextEventImages = computed(() => {
  if (!nextEvent.value?.primary?.images) return [];

  const images = nextEvent.value.primary.images
    .filter((imgObj: any) => imgObj.image && imgObj.image.url)
    .map((imgObj: any) => ({
      url: imgObj.image.url,
      alt: imgObj.image.alt,
    }));

  return images;
});

// Countdown timer
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const eventStatus = ref<"upcoming" | "today" | "started">("upcoming");

const updateCountdown = () => {
  if (!nextEvent.value) return;

  const now = new Date().getTime();
  const eventTime = new Date(
    nextEvent.value.primary.start_date_and_time
  ).getTime();
  const distance = eventTime - now;

  // Event has already started
  if (distance < 0) {
    eventStatus.value = "started";
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.value = { days, hours, minutes, seconds };

  // Determine if it's today
  if (days === 0) {
    eventStatus.value = "today";
  } else {
    eventStatus.value = "upcoming";
  }
};

// Update countdown every second
let countdownInterval: NodeJS.Timeout | null = null;

watch(
  nextEvent,
  (newEvent) => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    if (newEvent) {
      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 1000);
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

const pastors = ref([
  {
    name: "Rev. Paul Rotua",
    title: "Senior Pastor",
    image: revImage,
    summary:
      "A pastor from the heart, Reverend Paul Rotua has been in the Lord’s service since his teenage years as president of the Christian Fellowship of the Federal Government College, Ijanikin, Lagos; and later as an associate pastor in Victory Christian Fellowship (VCF) at the University of Ibadan, where he studied Human Nutrition. Fondly called Pastor Paul, his life has been characterised by the manifestation of the grace of God; which has been the main thrust of his service to the Body of Christ and the world. With a passion to see people attain self-actualization by manifesting their potentials in the grace and love of God, he shares the message of God’s awesome grace with simplicity, clarity and an unwavering sincerity to see people’s lives transformed. A regular speaker at conferences at home and abroad, he is the host of the highly acclaimed Encounters with Grace on radio and Encounters with Grace Live, a specialised teaching outreach.",
  },
  {
    name: "Rev. Sade Paul-Rotua",
    title: "Co Pastor",
    image: revMrsImage,
    summary:
      "Reverend Olusade Paul-Rotua is an ordained minister of God. She co-pastors Kingsville Church with her husband Rev. Paul Rotua. She heads the Extraordinary Women Fellowship, a non-denominational ministry with the vision of building women to live extraordinarily in all aspect of life. She is the convener of the Extraordinary Women’s Conference, an annual conference for women and the Demystifying Singleness, Marriage and Divorce Conference aimed at helping people navigate life as they transition throughout their different marital statuses.She is a graduate of University of Ibadan, with a B.Sc. and M.Sc. degrees in Biochemistry. She also holds an M.Sc. Degree in Human Resources Management from the Robert Gordon University, Aberdeen, Scotland. She is a Graduate of Rhema Bible Training Center, Nigeria.Olusade Paul-Rotua is a prolific writer and is passionate about assisting people to discover and attain their full potentials.She is happily married to her husband of over 25 years and they are blessed with three daughters.",
  },
]);

const viewOtherEvents = () => {
  navigateTo("/events");
};
</script>

<template>
  <div class="py-5 flex flex-col md:gap-10">
    <!-- Event Promo Banner - First Thing Users See -->
    <ContainerWrapper v-if="nextEvent" class="pt-0">
      <EventPromoBanner :event="nextEvent" />
    </ContainerWrapper>

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
            <source src="../public/bg.mp4" type="video/mp4" />
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
              Welcome to a place where the gospel is central and Jesus is always
              the lead story. We are a Jesus church and want to gather in
              worship and scatter to shine His light and love throughout the
              city and beyond.
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
        Our roots are in Yaba and Okota though we are reaching the world. Join
        us to enjoy the word at any of our branches.
      </p>
      <div class="flex gap-12 md:gap-10 mt-5 flex-col md:flex-row">
        <div class="md:flex-1">
          <div class="h-[30rem] md:h-[40rem] w-full flex flex-col gap-3">
            <img
              src="../public/images/kvc-yaba.jpg"
              alt="kingsville church Yaba"
              class="w-full h-full object-cover rounded-md t__clip__animate"
            />
            <h3 class="!font-bold text-primary-blue t__reveal__animate">
              Yaba
            </h3>
            <p class="t__fade__animate">
              2 Akinwunmi Street, off Hughes Ave, Alagomeji-Yaba, Lagos
            </p>
          </div>
        </div>
        <div class="md:flex-1">
          <div class="h-[30rem] md:h-[40rem] w-full flex flex-col gap-3">
            <img
              src="../public/images/kvc-okota.JPEG"
              alt="kingsville church alagomeji"
              class="w-full h-full object-cover rounded-md t__clip__animate"
            />
            <h3 class="!font-bold text-primary-orange t__reveal__animate">
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
        <div class="flex flex-col-reverse md:flex-row items-center gap-3">
          <div class="flex-1 md:mt-0">
            <div class="md:pt-20 md:px-24 md:-pb-12">
              <h2 class="!font-bold text-primary-orange t__reveal__animate">
                Join Us Online
              </h2>
              <p class="mt-3 t__fade__animate">
                Join us every Sunday at 9:00 AM and 11:30 AM in church or you
                can join our service online and stream from wherever you are.
              </p>
              <button class="mt-4">Watch Online</button>
            </div>
          </div>
          <div class="flex-1 relative">
            <div class="bg-placeholder w-full h-full rounded-lg">
              <img
                src="../public/images/join-us.JPG"
                alt="join us"
                class="w-full h-full object-cover rounded-lg t__clip__animate"
              />
            </div>
          </div>
        </div>
      </div>
    </ContainerWrapper>

    <ContainerWrapper
      v-if="nextEvent"
      id="upcoming-event-section"
      class="mt-12"
    >
      <div class="">
        <h2 class="!font-bold text-primary-blue mb-10">Upcoming Event</h2>
        <div class="flex flex-col md:flex-row items-center gap-8">
          <!-- Event Image(s) -->
          <div class="w-full md:w-2/5">
            <!-- Single Image -->
            <img
              v-if="nextEventImages.length === 1"
              :src="nextEventImages[0].url"
              :alt="nextEventImages[0].alt || nextEvent.primary.event_name"
              class="w-full md:min-h-[40rem] h-full object-cover rounded-xl t__clip__animate"
            />
            <!-- Carousel for Multiple Images -->
            <EventCarousel
              v-else-if="nextEventImages.length > 1"
              :slides-per-view="1"
              :space-between="0"
              :loop="true"
              :autoplay="{ delay: 5000 }"
              class="w-full md:min-h-[40rem] h-full rounded-xl overflow-hidden"
            >
              <SwiperSlide
                v-for="(image, index) in nextEventImages"
                :key="index"
                class="w-full h-full"
              >
                <img
                  :src="image.url"
                  :alt="image.alt || nextEvent.primary.event_name"
                  class="w-full md:min-h-[40rem] h-full object-cover"
                />
              </SwiperSlide>
            </EventCarousel>
          </div>

          <!-- Event Details -->
          <div class="w-full md:w-3/5 flex flex-col gap-4 md:px-10">
            <h2 class="text-2xl font-bold text-primary-blue t__reveal__animate">
              {{ nextEvent.primary.event_name }}
            </h2>

            <div class="text-gray-700 t__fade__animate">
              <PrismicRichText :field="nextEvent.primary.short_description" />
            </div>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in nextEvent.primary.tags"
                :key="tag.tag_name"
                class="px-3 py-1 bg-primary-orange/10 text-primary-orange rounded-full text-sm t__fade__animate"
              >
                {{ tag.tag_name }}
              </span>
            </div>

            <div class="flex flex-col gap-1">
              <time
                class="text-gray-500 font-medium t__fade__animate"
                :datetime="nextEvent.primary.start_date_and_time"
              >
                <span class="font-semibold">Starts:</span>
                {{
                  new Date(
                    nextEvent.primary.start_date_and_time
                  ).toLocaleString()
                }}
              </time>
              <time
                v-if="nextEvent.primary.end_date_and_time"
                class="text-gray-500 font-medium t__fade__animate"
                :datetime="nextEvent.primary.end_date_and_time"
              >
                <span class="font-semibold">Ends:</span>
                {{
                  new Date(nextEvent.primary.end_date_and_time).toLocaleString()
                }}
              </time>
            </div>

            <!-- Countdown Timer -->
            <div class="mt-6 p-6 bg-primary-blue/5 rounded-lg">
              <!-- Event has started -->
              <div v-if="eventStatus === 'started'" class="text-center">
                <div class="flex items-center justify-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p class="text-lg font-bold text-green-600">
                    Event has started!
                  </p>
                </div>
                <p class="text-sm text-gray-600">
                  This event is currently in progress. Join us now!
                </p>
              </div>

              <!-- Event is today -->
              <div v-else-if="eventStatus === 'today'">
                <div class="text-center mb-4">
                  <p class="text-lg font-bold text-primary-orange mb-1">
                    🎉 Today is the day!
                  </p>
                  <p class="text-sm text-gray-600">Event starts in:</p>
                </div>
                <div class="grid grid-cols-3 gap-2 md:gap-4">
                  <div class="flex flex-col items-center">
                    <div
                      class="bg-primary-orange text-white rounded-lg p-3 md:p-4 w-full text-center"
                    >
                      <span class="text-2xl md:text-3xl font-bold">{{
                        countdown.hours
                      }}</span>
                    </div>
                    <span class="text-xs md:text-sm text-gray-600 mt-2"
                      >Hours</span
                    >
                  </div>
                  <div class="flex flex-col items-center">
                    <div
                      class="bg-primary-orange text-white rounded-lg p-3 md:p-4 w-full text-center"
                    >
                      <span class="text-2xl md:text-3xl font-bold">{{
                        countdown.minutes
                      }}</span>
                    </div>
                    <span class="text-xs md:text-sm text-gray-600 mt-2"
                      >Minutes</span
                    >
                  </div>
                  <div class="flex flex-col items-center">
                    <div
                      class="bg-primary-orange text-white rounded-lg p-3 md:p-4 w-full text-center"
                    >
                      <span class="text-2xl md:text-3xl font-bold">{{
                        countdown.seconds
                      }}</span>
                    </div>
                    <span class="text-xs md:text-sm text-gray-600 mt-2"
                      >Seconds</span
                    >
                  </div>
                </div>
              </div>

              <!-- Upcoming event -->
              <div v-else>
                <p class="text-sm text-gray-600 mb-3 font-semibold text-center">
                  Event starts in:
                </p>
                <div class="grid grid-cols-4 gap-2 md:gap-4">
                  <div class="flex flex-col items-center">
                    <div
                      class="bg-primary-blue text-white rounded-lg p-3 md:p-4 w-full text-center"
                    >
                      <span class="text-2xl md:text-3xl font-bold">{{
                        countdown.days
                      }}</span>
                    </div>
                    <span class="text-xs md:text-sm text-gray-600 mt-2"
                      >Days</span
                    >
                  </div>
                  <div class="flex flex-col items-center">
                    <div
                      class="bg-primary-blue text-white rounded-lg p-3 md:p-4 w-full text-center"
                    >
                      <span class="text-2xl md:text-3xl font-bold">{{
                        countdown.hours
                      }}</span>
                    </div>
                    <span class="text-xs md:text-sm text-gray-600 mt-2"
                      >Hours</span
                    >
                  </div>
                  <div class="flex flex-col items-center">
                    <div
                      class="bg-primary-blue text-white rounded-lg p-3 md:p-4 w-full text-center"
                    >
                      <span class="text-2xl md:text-3xl font-bold">{{
                        countdown.minutes
                      }}</span>
                    </div>
                    <span class="text-xs md:text-sm text-gray-600 mt-2"
                      >Minutes</span
                    >
                  </div>
                  <div class="flex flex-col items-center">
                    <div
                      class="bg-primary-blue text-white rounded-lg p-3 md:p-4 w-full text-center"
                    >
                      <span class="text-2xl md:text-3xl font-bold">{{
                        countdown.seconds
                      }}</span>
                    </div>
                    <span class="text-xs md:text-sm text-gray-600 mt-2"
                      >Seconds</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 justify-center md:justify-start">
              <button class="mt-4 px-6 py-2 !w-auto" @click="viewOtherEvents">
                View other events
              </button>
              <button
                v-if="nextEvent.primary.registration_link?.text"
                class="mt-4 px-6 py-2 !w-auto !bg-primary-orange !text-white hover:!bg-primary-orange/90"
                @click="
                  () =>
                    navigateTo(nextEvent.primary.registration_link.text, {
                      external: true,
                      open: { target: '_blank' },
                    })
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 inline-block mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Reserve My Seat
              </button>
            </div>
          </div>
        </div>
      </div>
    </ContainerWrapper>

    <ContainerWrapper class="mt-24">
      <div class="bg-grey rounded-lg p-8">
        <h2 class="!font-bold text-primary-blue t__reveal__animate lg:px-10">
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
                  <small class="!font-mono">{{ pastor.title }}</small>
                  <h3 class="mt-2 !font-semibold text-primary-orange">
                    {{ pastor.name }}
                  </h3>
                  <p class="mt-3">
                    {{ pastor.summary }}
                  </p>
                </div>
                <div class="flex-1">
                  <div class="h-96 bg-placeholder w-full rounded-md">
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
