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
                            <button @click="customerStore.deleteCustomer(customer.key)" class="btn btn-danger">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="1">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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