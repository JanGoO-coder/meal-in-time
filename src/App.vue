<script setup>
import { computed } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import MyNavbar from './components/MyNavbar.vue'

const currentRoute = computed(() => {
  return useRouter().currentRoute.value.fullPath
})
</script>

<template>
  <MyNavbar v-if="currentRoute != '/signin'" />
  <RouterView />
</template>

<style>
</style>
