<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MyBigBtn from '../components/MyBigBtn.vue'
import { useAdminStore } from '../stores/admin'
import { useTableStore } from '../stores/table'


import { ref } from 'vue'

const userStore = useAdminStore()
const tableStore = useTableStore()

const orderManagementSelected = ref(false)
const tableManagementSelected = ref(false)
const menuManagementSelected = ref(false)

const onClickOrderManagement = () => {
    orderManagementSelected.value = true
    tableManagementSelected.value = false
    menuManagementSelected.value = false
}

const onClickTableManagement = () => {
    orderManagementSelected.value = false
    tableManagementSelected.value = true
    menuManagementSelected.value = false
}

const onClickMenuManagement = () => {
    orderManagementSelected.value = false
    tableManagementSelected.value = false
    menuManagementSelected.value = true
}

const goBack = () => {
    window.location.reload()
}

onMounted(() => {
    userStore.getToken()
    if (userStore.user.uid != null) {
        useRouter().push({ path: '/' })
    } else {
        useRouter().push({ path: '/signin' })
    }
})
</script>

<template>
    <div class="w-full py-12 container flex gap-3 justify-start items-center">
        <button @click="goBack" v-show="orderManagementSelected || tableManagementSelected || menuManagementSelected"
            class="btn btn-dark !rounded-full" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
        </button>
        <h1 class="display-6">Management Options</h1>
    </div>
    <div class="transition-all duration-500 container mx-auto p-12 !shadow-md bg-white hover:!shadow-xl rounded-2xl">
        <div v-if="!orderManagementSelected && !tableManagementSelected && !menuManagementSelected"
            class="w-full flex flex-wrap gap-7 justify-center items-center">
            <MyBigBtn @click="onClickOrderManagement" btnText="Order Management" btnImage="/images/burger.svg" />
            <MyBigBtn @click="onClickTableManagement" btnText="Table Management" btnImage="/images/table.svg" />
            <MyBigBtn @click="onClickMenuManagement" btnText="Menu Management" btnImage="/images/menu.svg" />
        </div>
        <div v-else-if="orderManagementSelected" class="w-full flex flex-wrap gap-7 justify-center items-center">
            <router-link to="/pending-orders">
                <MyBigBtn btnText="Pending Order" btnImage="/images/Pending.svg" />
            </router-link>
            <router-link to="/received-orders">
                <MyBigBtn btnText="Recived Order" btnImage="/images/received.svg" />
            </router-link>
            <router-link to="/completed-orders">
                <MyBigBtn btnText="Completed Order" btnImage="/images/complete.svg" />
            </router-link>
        </div>
        <div v-else-if="tableManagementSelected" class="w-full flex flex-wrap gap-7 justify-center items-center">
            <router-link to="/tables">
                <MyBigBtn btnText="View Tables" btnImage="/images/view.svg" />
            </router-link>
            <router-link to="/add-table">
                <MyBigBtn btnText="Add Table" btnImage="/images/add.svg" />
            </router-link>
            <router-link to="/edit-table">
                <MyBigBtn btnText="Edit Table" btnImage="/images/edit.svg" />
            </router-link>
            <router-link to="/remove-table">
                <MyBigBtn btnText="Remove Table" btnImage="/images/delete.svg" />
            </router-link>
        </div>
        <div v-else-if="menuManagementSelected" class="w-full flex flex-wrap gap-7 justify-center items-center">
            <router-link to="/menu">
                <MyBigBtn btnText="View Menu" btnImage="/images/view.svg" />
            </router-link>
            <router-link to="/add-menu">
                <MyBigBtn btnText="Add Menu" btnImage="/images/add.svg" />
            </router-link>
            <router-link to="/edit-menu">
                <MyBigBtn btnText="Edit Menu" btnImage="/images/edit.svg" />
            </router-link>
            <router-link to="/remove-menu">
                <MyBigBtn btnText="Delete Menu" btnImage="/images/delete.svg" />
            </router-link>
        </div>
    </div>
</template>
