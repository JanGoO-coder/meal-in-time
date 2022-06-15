<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import MyNavbar from './components/MyNavbar.vue'

const currentRoute = computed(() => {
  return useRoute().path
})
</script>

<template>
  <MyNavbar v-if="currentRoute != '/signin'" />
  <RouterView />
</template>

<style>
</style>
