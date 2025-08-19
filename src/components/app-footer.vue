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

          <div class="flex gap-5">
            <a
              href="https://www.facebook.com/share/1CK52nBB4j/?mibextid=wwXIfr"
              class="link"
              target="_blank"
              rel="noopener"
            >
              <UIcon name="lucide:facebook" class="text-md" />
            </a>
            <a
              href="https://www.instagram.com/kingsvillechurchglobal?igsh=Mm9uZTV1ZW1ycGMy&utm_source=ig_contact_invite"
              class="link"
              target="_blank"
              rel="noopener"
            >
              <UIcon name="lucide:instagram" class="text-md" />
            </a>
            <a
              href="https://youtube.com/@kingsvillechurchlagos?si=ha27xgsETbiN2_FK"
              class="link"
              target="_blank"
              rel="noopener"
            >
              <UIcon name="lucide:youtube" class="text-md" />
            </a>
            <a
              href="https://x.com/kingsvillelagos?s=21"
              class="link"
              target="_blank"
              rel="noopener"
            >
              <UIcon name="lucide:twitter" class="text-md" />
            </a>
          </div>
          <p>Raising Successful Godly Lights.</p>
          <NuxtLink to="/contact" class="link">
            <button>Contact Us</button>
          </NuxtLink>
        </div>

        <div class="flex-1 flex gap-3">
          <div class="w-1/4 flex flex-col gap-5 items-start">
            <p class="text-dark-grey">Links</p>
            <div class="flex flex-col gap-3 items-start">
              <NuxtLink to="/" class="link">Home</NuxtLink>
              <NuxtLink to="/about" class="link">About</NuxtLink>
              <NuxtLink to="/events" class="link">Events</NuxtLink>
              <NuxtLink to="/ministries" class="link">Ministries</NuxtLink>
              <NuxtLink to="/media-center" class="link">Media Center</NuxtLink>
              <NuxtLink to="/contact" class="link">Contact</NuxtLink>
            </div>
          </div>
          <div class="w-1/4 flex flex-col gap-5 items-start">
            <p class="text-dark-grey">Locations</p>
            <div class="flex flex-col gap-3 items-start">
              <NuxtLink to="#" class="link">Yaba</NuxtLink>
              <NuxtLink to="#" class="link">Okota</NuxtLink>
            </div>
          </div>
          <div class="w-1/4 flex flex-col gap-5 items-start">
            <p class="text-dark-grey">Ministries</p>
            <div class="flex flex-col gap-3 items-start">
              <NuxtLink to="/ministries" class="link"
                >King's Minstrels</NuxtLink
              >
              <NuxtLink to="/ministries" class="link">FCT</NuxtLink>
              <NuxtLink to="/ministries" class="link">Royal Scribe</NuxtLink>
              <NuxtLink to="/ministries" class="link">Protocol</NuxtLink>
              <NuxtLink to="/ministries" class="link">Greeters</NuxtLink>
              <NuxtLink to="/ministries" class="link">Church 252</NuxtLink>
              <NuxtLink to="/ministries" class="link">Benevolence</NuxtLink>
              <NuxtLink to="/ministries" class="link">People's Warden</NuxtLink>
              <NuxtLink to="/ministries" class="link">Ushering</NuxtLink>
              <NuxtLink to="/ministries" class="link">Finance</NuxtLink>
              <NuxtLink to="/ministries" class="link">Maintenance</NuxtLink>
            </div>
          </div>
          <div class="w-1/4 flex flex-col gap-5 items-start">
            <p class="text-dark-grey">Families</p>
            <div class="flex flex-col gap-3 items-start">
              <NuxtLink to="#" class="link"
                >Extraordinary Women's Fellowship</NuxtLink
              >
              <NuxtLink to="#" class="link"
                >Livelystones Youth Fellowship</NuxtLink
              >
              <NuxtLink to="#" class="link">Men of Honor</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </ContainerWrapper>
  </div>
</template>
