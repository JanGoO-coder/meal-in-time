<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import { useMenuStore } from '../../stores/menu'

const menuStore = useMenuStore()
const userStore = useAdminStore()

onMounted(() => {
    menuStore.readMenuData()
    userStore.getToken()
    if (userStore.user.uid != null) {
        useRouter().push({ path: '/menu' })
    } else {
        useRouter().push({ path: '/signin' })
    }
})
</script>

<template>
    <div class="py-12 container flex flex-col gap-3 justify-start items-center">
        <h1 class="display-6">Menu</h1>
        <div v-if="menuStore.menu.length > 0" class="flex gap-2 flex-wrap items-start justify-center">
            <div v-for="(menu, index) in menuStore.menu" :key="menu.key" class="card" style="width: 18rem;">
                <img :src="menu.data.imageSrc" class="card-img-top object-cover h-48" :alt="`Product: [${ menu.key }]`">
                <div class="card-body">
                    <h5 class="card-title">{{ menu.data.itemName }}</h5>
                    <p class="card-text line-clamp-3">{{ menu.data.description }}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Price: {{ menu.data.price }} <span class="text-sm">pkr</span></li>
                    <li class="list-group-item">PID: {{ menu.key }}</li>
                    <li class="list-group-item">Catagory: {{ menu.data.category }}</li>
                </ul>
                <div class="card-body">
                    <a href="#" class="btn btn-warning w-full card-link">View Details</a>
                </div>
            </div>
        </div>
        <div v-else-if="menuStore.loading">
            <span class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </span>
        </div>
        <div v-else>
            <h1 class="text-slate-500 font-extralight">There is nothing to show here.</h1>
        </div>
    </div>
</template>