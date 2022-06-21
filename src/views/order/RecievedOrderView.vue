<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import { useOrderStore } from '../../stores/order'

const userStore = useAdminStore()
const orderStore = useOrderStore()

onMounted(() => {
    userStore.checkAuth('/received-orders')
    userStore.getToken()
    orderStore.readTableBookingOrdersData()
    orderStore.readTakeAwayOrdersData()
})

const updateTakeAwayOrderStatus = (orderId, status) => {
    orderStore.updateTakeAwayOrderStatus(orderId, status)
}

const updateTableBookingOrderStatus = (orderId, status) => {
    orderStore.updateTableBookingOrderStatus(orderId, status)
}
</script>

<template>
    <div class="container py-16">
        <div class="flex flex-row justify-between items-center">
            <h1 class="display-6 pb-8">Received Orders</h1>
        </div>
        <div>
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item me-2" role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                        aria-selected="true">Take Away Received Orders</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                        aria-selected="false">Table Booking Recived Orders</button>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <table class="table text-sm md:text-lg">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">NO</th>
                                <th scope="col" class="text-center">Order</th>
                                <th scope="col" class="text-center">Order ID</th>
                                <th scope="col" class="text-center">User Email</th>
                                <th scope="col" class="text-center">UID</th>
                                <th scope="col" class="text-center">Status</th>
                                <th scope="col" class="text-center">Total Price</th>
                                <th scope="col" class="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(takeAway, index) in orderStore.takeAwayOrders" :key="index"
                                v-show="takeAway.data.orderStatus == 'Received'">
                                <th scope="row" class="text-center">{{ index + 1 }}</th>
                                <td scope="row" class="truncate text-ellipsis max-w-[5ch] md:max-w-[48ch]">
                                    <ul class="list-group">
                                        <li v-for="(item, i) in takeAway.data.order" :key="i" class="list-group-item">{{
                                                item.itemName
                                        }} | {{ item.itemQuantity }} | {{ item.price }}</li>
                                    </ul>
                                </td>
                                <td class="text-center">{{ takeAway.key }}</td>
                                <td class="text-center">{{ takeAway.data.email }}</td>
                                <td class="text-center">{{ takeAway.data.uId }}</td>
                                <td class="text-center">{{ takeAway.data.orderStatus }}</td>
                                <td class="text-center">{{ takeAway.data.totalAmount }}</td>
                                <td class="flex justify-end gap-2">
                                    <button class="btn btn-success"
                                        @click="orderStore.updateTakeAwayOrderStatus(takeAway.key, 'Ready')">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>
                                    <button class="btn btn-danger"
                                        @click="orderStore.updateTakeAwayOrderStatus(takeAway.key, 'Cancelled')">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <table class="table text-sm md:text-lg">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">NO</th>
                                <th scope="col" class="text-center">Order</th>
                                <th scope="col" class="text-center">Table</th>
                                <th scope="col" class="text-center">User Email</th>
                                <th scope="col" class="text-center">UID</th>
                                <th scope="col" class="text-center">Status</th>
                                <th scope="col" class="text-center">Total Price</th>
                                <th scope="col" class="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(tableBook, index) in orderStore.tableBookingOrders" :key="index" v-show="tableBook.data.orderStatus == 'Received'">
                                <th scope="row" class="text-center">{{ index + 1 }}</th>
                                <td scope="row" class="truncate text-ellipsis max-w-[5ch] md:max-w-[48ch]">
                                    <ul class="list-group">
                                        <li v-for="(item, i) in tableBook.data.order" :key="i" class="list-group-item">
                                            {{ item.itemName }} | {{ item.itemQuantity }} | {{ item.price }}</li>
                                    </ul>
                                </td>
                                <td scope="row" class="truncate text-ellipsis max-w-[5ch] md:max-w-[48ch]">
                                    <ul class="list-group">
                                        <li class="list-group-item list-group-item-secondary">{{
                                                    tableBook.data.tableId
                                            }} | {{ tableBook.data.tNo }} | {{ tableBook.data.seat }}</li>
                                    </ul>
                                </td>
                                <td class="text-center">{{ tableBook.data.email }}</td>
                                <td class="text-center">{{ tableBook.data.uId }}</td>
                                <td class="text-center">{{ tableBook.data.orderStatus }}</td>
                                <td class="text-center">{{ tableBook.data.totalAmount }}</td>
                                <td class="flex justify-end gap-2">
                                    <button class="btn btn-success"
                                        @click="orderStore.updateTableBookingOrderStatus(tableBook.key, tableBook.data.tableId, 'Ready')">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>
                                    <button class="btn btn-danger"
                                        @click="orderStore.updateTableBookingOrderStatus(tableBook.key, tableBook.data.tableId, 'Cancelled')">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>