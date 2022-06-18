<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import { useTableStore } from '../../stores/table'

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
        <div v-if="tableStore.tables.length > 0" class="transition-all duration-500 rounded-2xl w-full lg:w-1/2">
            <table class="table text-sm md:text-lg">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">#</th>
                        <th scope="col" class="text-center">Id</th>
                        <th scope="col">TID</th>
                        <th scope="col" class="text-center">Seats</th>
                        <th scope="col" class="text-center">Reserved</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tbl, index) in tableStore.tables" :key="index">
                        <th scope="row" class="text-center">{{ index + 1 }}</th>
                        <th scope="row" class="text-center">{{ tbl.data.id }}</th>
                        <th scope="row" class="truncate text-ellipsis max-w-[5ch] md:max-w-[48ch]">{{ tbl.key }}</th>
                        <td class="text-center">{{ tbl.data.seats }}</td>
                        <td class="text-center">{{ tbl.data.reserved ? "Yes" : "No" }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else-if="tableStore.loading">
            <span class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </span>
        </div>
        <div v-else>
            <h1 class="text-slate-500 font-extralight">There is nothing to show here.</h1>
        </div>
    </div>
</template>