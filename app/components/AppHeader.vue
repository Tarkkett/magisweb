<script setup lang="ts">
import { NuxtImg } from '#components';

const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const links = computed(() => [{
  label: 'About us',
  to: '#about',
  icon: 'i-heroicons-cube-transparent',
  active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('pricing')
}, {
  label: 'Technical',
  to: '#tech',
  icon: 'i-heroicons-credit-card',
  active: activeHeadings.value.includes('pricing') && !activeHeadings.value.includes('testimonials')
}, {
  label: 'Achievements',
  to: '#achieve',
  icon: 'i-heroicons-academic-cap',
  active: activeHeadings.value.includes('testimonials')
}, {
  label: 'FAQ',
  to: '#faq',
  icon: 'i-heroicons-question-mark-circle',
  active: activeHeadings.value.includes('faq')
}])

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#about'),
    document.querySelector('#tech'),
    document.querySelector('#achieve'),
    document.querySelector('#faq')
  ])
})
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      MAGIS 25584 
      <UBadge
        label="MAG6.5"
        variant="subtle"
        class="mb-0.5 hidden sm:block"
      />
    </template>

    <template #right>
      <UColorModeButton />
      <img 
        src="https://res.cloudinary.com/donpcwlwk/image/upload/v1734038815/LowPolyBlackHole_V4_2x_uahsml.png" 
        width="50px" 
        height="50px"
        alt="MAGIS logo"
        class="transition-transform duration-500 hover:rotate-180"
      />
    </template>

    <template #panel>
      <UAsideLinks :links="links" />

      <UDivider class="my-6" />

      <UButton
        label="Get started"
        block
      />
    </template>
  </UHeader>
</template>
