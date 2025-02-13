<script setup lang="ts">
const links = [{
  label: 'Contacts',
  to: ''
}, {
  label: 'Support us',
  to: ''
}]
</script>

<template>
  <UFooter :links="links">
    <template #left>
      Copyright © {{ new Date().getFullYear() }}
    </template>

    <template #right>
      <UButton icon="i-simple-icons-instagram" color="gray" variant="ghost" to="https://www.instagram.com/magis_25584/" target="_blank" />
      <UButton icon="i-simple-icons-github" color="gray" variant="ghost" to="https://github.com/Tarkkett/ITD-MAGIS-Main" target="_blank" />
    </template>
  </UFooter>
</template>

