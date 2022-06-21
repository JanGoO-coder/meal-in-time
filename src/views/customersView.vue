<script setup>
import { onBeforeMount } from 'vue'
import { useAdminStore } from '../stores/admin'
import { useRouter } from 'vue-router'
import { useCustomerStore } from '../stores/customer'

const userStore = useAdminStore()
const customerStore = useCustomerStore()

onBeforeMount(() => {
    userStore.checkAuth('/customers')
    userStore.getToken()
    customerStore.fetchCustomers()
})
</script>

<template>
    <div class="py-12 container flex flex-col gap-3 justify-start items-center">
        <h1 class="display-6">Customer Accounts</h1>
        <div v-if="customerStore.customers.length > 0" class="transition-all duration-500 rounded-2xl !w-full lg:w-1/2">
            <table class="table text-sm md:text-lg w-full">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">NO</th>
                        <th scope="col" class="text-left">UID</th>
                        <th scope="col" class="text-center">Seats</th>
                        <th scope="col" class="text-center">Available</th>
                        <th scope="col" class="text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(customer, index) in customerStore.customers" :key="index">
                        <th scope="row" class="text-center">{{ index + 1 }}</th>
                        <th scope="row" class="truncate text-ellipsis max-w-[5ch] md:max-w-[48ch]">{{ customer.key }}
                        </th>
                        <td class="text-center">{{ customer.data.name }}</td>
                        <td class="text-center">{{ customer.data.email }}</td>
                        <td class="flex justify-end gap-2">
                            <button class="btn btn-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                            </button>
                            <button class="btn btn-danger">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else-if="customerStore.loading">
            <span class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </span>
        </div>
        <div v-else>
            <h1 class="text-slate-500 font-extralight">There is nothing to show here.</h1>
        </div>
    </div>
</template>