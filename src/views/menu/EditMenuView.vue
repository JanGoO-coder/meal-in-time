<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import { useMenuStore } from '../../stores/menu'
import { useCatagoryStore } from '../../stores/catagories'

const menuStore = useMenuStore()
const userStore = useAdminStore()
const catagoryStore = useCatagoryStore()

const pid = ref("")
const title = ref("")
const detail = ref("")
const price = ref("")
const catagory = ref("")

onMounted(() => {
    userStore.checkAuth('/edit-menu')
    menuStore.readMenuData()
    catagoryStore.catagroies = []
    catagoryStore.readCatagoryData()
    userStore.getToken()
})

const getFile = async () => {
    menuStore.loading = true
    const file = document.getElementById("image").files[0]
    await menuStore.uploadImage(file)
}

const onClickEditMenuItem = () => {
    const data = {
        'title': title.value,
        'image': menuStore.image,
        'catagory': catagory.value,
        'price': price.value,
        'detail': detail.value
    }
    menuStore.loading = true
    menuStore.editMenuItem(pid.value, data)
}
</script>

<template>
    <div class="py-12 container flex flex-col gap-3 justify-start items-center md:!w-1/3">
        <h1 class="display-6">Add Menu Item</h1>
        <div
            class="flex flex-col gap-3 transition-all duration-500 w-full mx-auto p-6 !shadow-md bg-white hover:!shadow-xl rounded-2xl">
            <div class="form-floating">
                <select class="form-select" id="pid" v-model="pid" aria-label="pid">
                    <option value="" selected>Select Product Id [PID]</option>
                    <option v-for="(item, index) in menuStore.menu" :key="index" :value="item.key">{{ item.key }}</option>
                </select>
                <label for="pid">Select Product Id [PID]</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="title" v-model="title" placeholder="New Item Title">
                <label for="title">Item Title</label>
            </div>
            <img v-show="menuStore.image != ''" class="w-32 mx-auto" :src="menuStore.image">
            <span v-show="menuStore.loading" class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </span>
            <div>
                <label for="image" class="form-label">Upload Item Image</label>
                <input @change="getFile" class="form-control form-control-lg" id="image" type="file">
            </div>
            <div class="form-floating">
                <select class="form-select" id="catagory" v-model="catagory" aria-label="Catagory">
                    <option value="" selected>Select Product Catagory</option>
                    <option v-for="(opt, index) in catagoryStore.catagroies" :key="index" :value="opt.data.categoryName">{{ opt.data.categoryName }}</option>
                </select>
                <label for="seats">Select Product Catagory</label>
            </div>
            <div class="form-floating">
                <input type="number" class="form-control" id="price" v-model="price" placeholder="Item Price">
                <label for="price">Item Price</label>
            </div>
            <div class="form-floating">
                <textarea class="form-control" placeholder="Write Item Detail" id="detail" style="height: 100px"
                    v-model="detail"></textarea>
                <label for="detail">Item Detail</label>
            </div>
            <button @click="onClickEditMenuItem" type="button" class="btn btn-warning p-3 w-full mt-3">
                <span v-if="!menuStore.loading">Save Changes</span>
                <span v-else class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </span>
            </button>
        </div>
    </div>
</template>