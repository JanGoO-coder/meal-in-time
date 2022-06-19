<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import { useCatagoryStore } from '../../stores/catagories'

const catagoryStore = useCatagoryStore()
const userStore = useAdminStore()

onMounted(() => {
    // catagoryStore.readCatagoryData()
    userStore.getToken()
    if (userStore.user.uid != null) {
        useRouter().push({ path: '/catagories' })
    } else {
        useRouter().push({ path: '/signin' })
    }
})
</script>

<template>
    <div class="container py-16">
        <h1 class="display-6 pb-8">Catagories</h1>
        <div v-if="catagoryStore.catagroies.length > 0" class="flex flex-row flex-wrap gap-3">
            <div v-for="(catagory, index) in catagoryStore.catagroies" :key="index" class="card text-dark bg-light mb-3" style="max-width: 18rem;">
                <div class="card-header">{{ index + 1 }}</div>
                <div class="card-body">
                    <h5 class="card-title">Light card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                        card's content.</p>
                </div>
            </div>
        </div>
        <div v-else-if="catagoryStore.loading">
            <span class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </span>
        </div>
        <div v-else>
            <h1 class="text-slate-500 font-extralight">There is nothing to show here.</h1>
        </div>
    </div>
</template>