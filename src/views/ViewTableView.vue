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
})
</script>

<template>
    <div class="py-12 container flex flex-col gap-3 justify-start items-center">
        <h1 class="display-6">Tables</h1>
        <div
            class="transition-all duration-500 rounded-2xl w-full lg:w-1/2">
            <table class="table text-sm md:text-lg">
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
                        <th scope="row" class="truncate text-ellipsis max-w-[5ch] md:max-w-[20ch]">{{ tbl.key }}</th>
                        <td>{{ tbl.data.seats }}</td>
                        <td>{{ tbl.data.reserved ? "Yes" : "No" }}</td>
                        <td>{{ tbl.data.available ? "Yes" : "No" }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>