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
  <div class="fixed bottom-0 w-full h-10 bg-slate-900 flex justify-center items-center">
    <span class="text-xl text-slate-400">© Copyright All Rights Reserved By <span class="font-bold">Malik Irfan</span> & <span class="font-bold">M. Shehrayar Ali</span></span>
  </div>
</template>

<style>
</style>
