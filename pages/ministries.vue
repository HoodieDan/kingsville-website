<template>
  <div>
    <ContainerWrapper>
      <div
        class="text-center mb-12 flex flex-col gap-2 justify-center items-center mt-10"
      >
        <h1 class="t__reveal__animate">Our Ministries</h1>
        <p class="mt-2 max-w-2xl mx-auto t__fade__animate">
          Welcome to the ministries page of our church. Explore the various
          ministries that serve our community and find ways to be a part of what
          God is doing.
        </p>
        <img
          src="../public/images/ministries.JPG"
          alt="ministries"
          class="w-full md:w-1/2 h-auto rounded-lg"
        />
      </div>

      <!-- Ministries Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- King's Minstrels -->
        <div
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <h5 class="mb-2 !font-bold t__reveal__animate">King's Minstrels</h5>
          <p class="t__fade__animate">
            Leading the congregation in heartfelt worship through music and
            song, lifting up praises that prepare hearts for God’s word.
          </p>
        </div>

        <!-- Technical -->
        <div
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <h5 class="mb-2 !font-bold t__reveal__animate">Technical</h5>
          <p class="t__fade__animate">
            Supporting services with sound, lighting, and media to ensure a
            smooth and engaging worship experience.
          </p>
        </div>

        <!-- Audio Visual -->
        <div
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <h5 class="mb-2 !font-bold t__reveal__animate">Audio Visual</h5>
          <p class="t__fade__animate">
            Enhancing worship through video, projections, and creative visuals
            that communicate the gospel effectively.
          </p>
        </div>

        <!-- Royal Scribe -->
        <div
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <h5 class="mb-2 !font-bold t__reveal__animate">Royal Scribe</h5>
          <p class="t__fade__animate">
            Managing and distributing church messages as their primary work,
            while also documenting activities, events, and testimonies to
            preserve the story of God’s faithfulness.
          </p>
        </div>

        <!-- Protocol -->
        <div
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <h5 class="mb-2 !font-bold t__reveal__animate">Protocol</h5>
          <p class="t__fade__animate">
            Coordinating order and organization during services, ensuring guests
            and ministers are received with excellence.
          </p>
        </div>

        <!-- Greeters -->
        <div
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <h5 class="mb-2 !font-bold t__reveal__animate">Greeters</h5>
          <p class="t__fade__animate">
            Offering a warm welcome and friendly smiles, making everyone feel at
            home from the moment they arrive.
          </p>
        </div>

        <!-- Church 252 -->
        <div
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <h5 class="mb-2 !font-bold t__reveal__animate">Church 252</h5>
          <p class="t__fade__animate">
            A vibrant children’s ministry that nurtures kids in faith, teaching
            biblical truths in fun and engaging ways.
          </p>
        </div>

        <!-- Benevolence -->
        <div
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <h5 class="mb-2 !font-bold t__reveal__animate">Benevolence</h5>
          <p class="t__fade__animate">
            Extending compassion and practical support to those in need within
            and beyond the church community.
          </p>
        </div>

        <!-- People's Warden -->
        <div
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <h5 class="mb-2 !font-bold t__reveal__animate">People's Warden</h5>
          <p class="t__fade__animate">
            Ensuring security and order during services and events, helping
            maintain a safe and welcoming environment.
          </p>
        </div>

        <!-- Ushering -->
        <div
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <h5 class="mb-2 !font-bold t__reveal__animate">Ushering</h5>
          <p class="t__fade__animate">
            Assisting the congregation with seating, offerings, and guidance
            throughout worship gatherings.
          </p>
        </div>

        <!-- Finance -->
        <div
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <h5 class="mb-2 !font-bold t__reveal__animate">Finance</h5>
          <p class="t__fade__animate">
            Managing church finances with integrity, ensuring faithful
            stewardship of resources entrusted by members.
          </p>
        </div>

        <!-- Maintenance -->
        <div
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <h5 class="mb-2 !font-bold t__reveal__animate">Maintenance</h5>
          <p class="t__fade__animate">
            Caring for the church facilities and grounds, keeping them clean,
            functional, and welcoming for all.
          </p>
        </div>

        <!-- FCT -->
        <div
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <h5 class="mb-2 !font-bold t__reveal__animate">
            FCT (Follow-up & Counselling Team)
          </h5>
          <p class="t__fade__animate">
            Reaching out to new members and providing spiritual counselling,
            discipleship, and support for those in need of guidance and care.
          </p>
        </div>
      </div>
    </ContainerWrapper>
  </div>
</template>

<script setup>
import ContainerWrapper from "~/src/components/container-wrapper.vue";
import { useScrollAnimations } from "~/src/composables/useScrollAnimation";

useScrollAnimations();
</script>
