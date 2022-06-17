<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../stores/admin'
import { useTableStore } from '../stores/table'

const tableStore = useTableStore()
const userStore = useAdminStore()

onMounted(() => {
    tableStore.readTablesData()
    userStore.getToken()
    if (userStore.user.uid != null) {
        useRouter().push({ path: '/tables' })
    } else {
        useRouter().push({ path: '/signin' })
    }
    
    if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
})
</script>

<template>
    <div class="py-12 container-fluid md:container flex flex-col gap-3 justify-start items-center md:!w-1/2">
        <h1 class="display-6">Tables</h1>
        <div
            class="transition-all duration-500 container md:mx-auto p-6 !shadow-md bg-white hover:!shadow-xl rounded-2xl">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Id</th>
                        <th scope="col">TID</th>
                        <th scope="col">Seats</th>
                        <th scope="col">Reserved</th>
                        <th scope="col">Available</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tbl, index) in tableStore.tables" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <th scope="row">{{ tbl.data.id }}</th>
                        <th scope="row">{{ tbl.key }}</th>
                        <td>{{ tbl.data.seats }}</td>
                        <td>{{ tbl.data.reserved ? "Yes" : "No" }}</td>
                        <td>{{ tbl.data.available ? "Yes" : "No" }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>