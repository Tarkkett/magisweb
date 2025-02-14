<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FormError } from '#ui/types'

// State to manage form data and validation messages
const motivation = ref('')  // Store motivation input
const name = ref('')
const email = ref('')
const phone = ref('')
const about = ref('')
const isLoading = ref(false)
const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null)
const validationErrors = ref<FormError[]>([])  // Track validation errors

// Validation logic
const validate = () => {
  validationErrors.value = []  // Clear previous validation errors

  // Check if each field is filled
  if (!name.value) validationErrors.value.push({ path: 'name', message: 'Full Name is required' })
  if (!email.value) validationErrors.value.push({ path: 'email', message: 'Email is required' })
  if (!phone.value) validationErrors.value.push({ path: 'phone', message: 'Phone Number is required' })
  if (!about.value) validationErrors.value.push({ path: 'about', message: 'Tell us about yourself is required' })

  // Validate motivation word count (at least 70 words)
  if (!motivation.value || motivation.value.split(/\s+/).length < 70) {
    validationErrors.value.push({ path: 'motivation', message: 'Motivation must be at least 70 words long' })
  }

  return validationErrors.value.length === 0 // Return true if no errors
}

// Function to calculate word count
const getWordCount = (text: string) => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

// Live word counter state
const wordCount = ref(getWordCount(motivation.value))

// Watch for changes in motivation input
watch(motivation, (newValue) => {
  wordCount.value = getWordCount(newValue)
})

// Function to handle form submission
async function onSubmit() {
  if (!validate()) {
    return // If validation fails, do not proceed with submission
  }

  isLoading.value = true
  successMessage.value = null
  errorMessage.value = null

  try {
    const response = await fetch('/api/send-email', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        phone: phone.value,
        about: about.value,
        motivation: motivation.value
      })
    })

    const result = await response.json()

    if (result.success) {
      successMessage.value = "Application submitted successfully! We will get back to you soon."
    } else {
      errorMessage.value = "Failed to send application. Please try again."
    }
  } catch (error) {
    console.error("Error submitting form:", error)
    errorMessage.value = "An error occurred while sending your application."
  } finally {
    isLoading.value = false
  }
}

// Function to go back to the previous page
const goBack = () => {
  window.history.back()
}
</script>

<template>
  <!-- Back Button -->
  <UButton @click="goBack" icon="i-heroicons-arrow-left" class="fixed top-4 left-4 p-2 bg-gray-200 rounded-full shadow-md text-gray-700 hover:bg-gray-300 focus:outline-none" :square="true">
  </UButton>

  <!-- Contact Information Section -->
  <ULandingSection title="Contact Us" class="flex items-center justify-center" :ui="{wrapper: 'py-12 sm:py-24'}">
    <div class="text-center">
      <p class="text-gray-400">Reach out to us for any inquiries or collaborations.</p>
      <p class="mt-2">
        📧 Email: <a href="mailto:rokas.kirdulis@gmail.com" class="text-cyan-300 underline">rokas.kirdulis@gmail.com</a>
      </p>
    </div>
  </ULandingSection>

  <!-- Team Selection Process Section -->
  <ULandingSection 
  title="Selection Process" 
  class="flex flex-col items-center justify-center text-center" 
  :ui="{
    wrapper: 'py-4 sm:py-4',
    container: 'gap-4 sm:gap-4 flex flex-col', 
    base: 'text-center flex flex-col items-center',
    title: 'text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl',
    description: 'mt-6 text-lg/8 text-gray-600 dark:text-gray-300'
  }"
>
  <ul class="text-gray-400 space-y-1">
    <li>Step 1 → Fill out the application form</li>
    <li>Step 2 → Online interview with the team</li>
    <li>Step 3 → Acceptance confirmation</li>
  </ul>

  <!-- Name Input -->
  <UInput v-model="name" label="Full Name" placeholder="Enter your full name" color="purple" />
  <p v-if="validationErrors.find(e => e.path === 'name')" class="text-red-500 mt-1">{{ validationErrors.find(e => e.path === 'name')?.message }}</p>

  <!-- Email Input -->
  <UInput v-model="email" type="email" label="Email" placeholder="Enter your email" color="purple" />
  <p v-if="validationErrors.find(e => e.path === 'email')" class="text-red-500 mt-1">{{ validationErrors.find(e => e.path === 'email')?.message }}</p>

  <!-- Phone Input -->
  <UInput v-model="phone" label="Phone Number" placeholder="Enter your phone number" color="purple" />
  <p v-if="validationErrors.find(e => e.path === 'phone')" class="text-red-500 mt-1">{{ validationErrors.find(e => e.path === 'phone')?.message }}</p>

  <!-- About Input -->
  <UInput v-model="about" label="Tell us about yourself" placeholder="Skills, hobbies, interests" color="purple" />
  <p v-if="validationErrors.find(e => e.path === 'about')" class="text-red-500 mt-1">{{ validationErrors.find(e => e.path === 'about')?.message }}</p>

  <!-- Motivation Textarea -->
  <UTextarea v-model="motivation" label="Why do you want to join?" placeholder="Share your motivation" color="purple" />
  <p v-if="validationErrors.find(e => e.path === 'motivation')" class="text-red-500 mt-1">{{ validationErrors.find(e => e.path === 'motivation')?.message }}</p>

  <!-- Word count display -->
  <div class="text-gray-500 mt-1">
    <p>Word count: {{ wordCount }} / 70</p>
    <p v-if="wordCount < 70" class="text-yellow-500">Please write at least 70 words for motivation.</p>
  </div>

  <!-- Submit Button -->
  <UButton :loading="isLoading" @click="onSubmit" color="purple" class="mt-2">Submit</UButton>

  <!-- Display success or error messages -->
  <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
  <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
</ULandingSection>



  <!-- Application Form Section -->



</template>
