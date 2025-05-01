<script setup lang="ts">
const { data: page } = await useAsyncData('home', () => queryContent('/').findOne());

const targetDate = new Date(Date.UTC(2025, 2, 22, 20, 0, 0));

const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });

const updateCountdown = () => {
  const now = new Date().getTime();
  const timeLeft = targetDate.getTime() - now;

  if (timeLeft > 0) {
    countdown.value = {
      days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
    };
  } else {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
};

const faq_items = [{
  label: 'Why the name MAGIS?',
  content: 'Our team, MAGIS, embodies the Latin meaning of "more" or "greater" by constantly striving for excellence—pushing beyond limits, seeking continuous growth, fostering innovation, and working together to achieve more than we ever thought possible.'
}, {
  label: 'Can I join?',
  content: 'Absolutely! We’re always excited to welcome passionate and driven individuals to our FTC team. Whether you’re interested in coding, engineering, design, or strategy, there’s a place for you. Join us and be part of something amazing!'
}, {
  label: 'Do I need prior experience to join?',
  content: 'Not at all! We welcome students of all skill levels. Whether you’re a beginner or an expert, we provide training and mentorship to help you grow.'
}, {
  label: 'How can I support your FTC team if I’m not a student?',
  content: 'We appreciate any support! You can sponsor our team, donate materials, or volunteer as a mentor. Every contribution helps us reach new heights!'
}]

let countdownInterval;
onMounted(() => {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
  import('@google/model-viewer');
});

onUnmounted(() => {
  clearInterval(countdownInterval);
});

const achievements = [
  { title: "Lithuanian Championship Winning alliance 1st pick", description: "Lithuanian championship 2025", icon: "i-heroicons-trophy" },
  { title: "Inspire 2nd place", description: "Lithuanian championship 2025", icon: "i-heroicons-light-bulb" },
  { title: "Robot Games #1 - 2nd place", description: "Robot Games #1", icon: "i-heroicons-trophy" },
  { title: "Robot Games #2 - 1st place", description: "Robot Games #2", icon: "i-heroicons-trophy" },
  { title: "Robot Games #3 - 1st place", description: "Robot Games #3", icon: "i-heroicons-trophy" },
  { title: "Robot Games #4 - 1st place", description: "Robot Games #4", icon: "i-heroicons-trophy" },
  { title: "Robot Games #5 - 1st place", description: "Robot Games #5", icon: "i-heroicons-trophy" },
  { title: "Robot Games #6 - 1st place", description: "Robot Games #6", icon: "i-heroicons-trophy" }
];

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
});
</script>

<template>
  <AppHeader />
  <div>
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
      class="relative overflow-hidden"
    >
      <!-- Background Video -->
      <div class="absolute inset-0 -z-10">
        <video autoplay loop muted playsinline class="w-full h-full object-cover">
          <source src="https://res.cloudinary.com/donpcwlwk/video/upload/v1739458290/0001_bito1f.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </ULandingHero>

    <ULandingSection
      :title="page.features.title"
      :description="page.features.description"
      :headline="page.features.headline"
      id="about"
    >
      <UPageColumns class="xl:columns-4 scroll-mt-[calc(var(--header-height)+140px+128px+96px)]">
        <div v-for="(testimonial, index) in page.testimonials.items" :key="index" class="break-inside-avoid">
          <ULandingTestimonial v-bind="testimonial" />
        </div>
      </UPageColumns>
    </ULandingSection>


    <!-- Countdown Timer Section -->
    <ULandingSection
      title="Robot Reveal Countdown"
      description="The wait is finally over! Watch the reveal of our final robot version - MAG8."
      class="text-center flex flex-col items-center"
      :ui="{wrapper: 'py-4 sm:py-0'}"
    >
    <video autoplay loop muted playsinline class="w-full h-full object-cover">
      <source src="https://res.cloudinary.com/donpcwlwk/video/upload/v1746089719/MAG8Reveal_egopus.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    </ULandingSection>

    <!-- Achievements Section -->
    <ULandingSection title="Our Achievements" description="A look at our proudest milestones and accomplishments." class="text-center" :ui="{container: 'gap-10 sm:gap-y-10'}">
      <span id="achieve"></span>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        <div
          v-for="(achievement, index) in achievements"
          :key="index"
          class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
        >
          <UIcon :name="achievement.icon" class="text-primary-500 dark:text-primary-300 text-5xl mb-3" />
          <h3 class="text-xl font-semibold">{{ achievement.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400 mt-2">{{ achievement.description }}</p>
        </div>
      </div>
    </ULandingSection>

    <!-- 3D Model Viewer Section -->
    <span id="tech"></span>
    <ULandingSection
      headline="MAG5"
      title="Explore Our Robot in 3D"
      description="Interact with our championship winning robot CAD design in real-time. Rotate, zoom, and explore the details. Load times may vary from 10 seconds to several minutes."
      class="flex flex-col items-center justify-center text-center"
    >
      <model-viewer
        alt="Robot CAD Model"
        src="/Main.glb"
        auto-rotate
        shadow-intensity="1"
        camera-controls
        class="w-full h-[700px]"
      ></model-viewer>
    </ULandingSection>
    <ULandingSection 
      title="Have questions?" 
      description="We have the answers."
      :ui="{ 
        wrapper: 'py-4 sm:py-0', 
        container: 'gap-10 sm:gap-y-10', 
        title: 'bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text' 
      }">
      
      <span id="faq"></span>
      <ULandingFAQ :items="faq_items" multiple />
    </ULandingSection>

  </div>
</template>

<style>
/* Vue Transition for smooth updates */
.countdown-enter-active,
.countdown-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.countdown-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.countdown-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

/* Tailwind-inspired animations */
@keyframes flip {
  0% { transform: rotateX(90deg); opacity: 0; }
  100% { transform: rotateX(0deg); opacity: 1; }
}
.animate-flip {
  animation: flip 0.5s ease-in-out;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>
