<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {name: 'og:title', content: 'https://res.cloudinary.com/donpcwlwk/image/upload/v1739542274/7B7A5267_gxrees.jpg'}
  ],
  link: [
    { rel: 'icon', href: 'https://res.cloudinary.com/donpcwlwk/image/upload/v1734038815/LowPolyBlackHole_V4_2x_uahsml.png' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  ogImage: 'https://res.cloudinary.com/donpcwlwk/image/upload/v1739542274/7B7A5267_gxrees.jpg',
  twitterImage: 'https://res.cloudinary.com/donpcwlwk/image/upload/v1739542274/7B7A5267_gxrees.jpg',
  twitterCard: 'summary_large_image'
})
</script>

<template>

  <NuxtLoadingIndicator />
  <UMain>
    <NuxtPage />
  </UMain>

  <AppFooter />

  <UNotifications />
</template>
