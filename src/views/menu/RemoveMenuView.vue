<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import { useMenuStore } from '../../stores/menu'

const menuStore = useMenuStore()
const userStore = useAdminStore()

const pid = ref("")

onMounted(() => {
    menuStore.readMenuData()
    userStore.getToken()
    if (userStore.user.uid != null) {
        useRouter().push({ path: '/remove-menu' })
    } else {
        useRouter().push({ path: '/signin' })
    }
})

const onClickRemoveMenu = () => {
    menuStore.loading = true
    menuStore.removeMenuItem(pid.value)
}
</script>

<template>
    <div class="py-12 container flex flex-col gap-3 justify-start items-center md:!w-1/3">
        <h1 class="display-6">Remove Menu Item</h1>
        <div class="flex flex-col gap-3 transition-all duration-500 w-full mx-auto p-6 !shadow-md bg-white hover:!shadow-xl rounded-2xl">
            <div class="form-floating">
                <input type="text" class="form-control" id="pid" v-model="pid" placeholder="Product ID [PID]">
                <label for="tid">Product ID [PID]</label>
            </div>
            <button @click="onClickRemoveMenu" type="button" class="btn btn-warning p-3 w-full mt-3">
                <span v-if="!menuStore.loading">Remove Menu Item</span>
                <span v-else class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </span>
            </button>
        </div>
    </div>
</template>