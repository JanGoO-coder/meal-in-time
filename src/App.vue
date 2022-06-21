<script setup>
import { computed, onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import MyNavbar from './components/MyNavbar.vue'
import { useAdminStore } from './stores/admin'

const adminStore = useAdminStore()

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
