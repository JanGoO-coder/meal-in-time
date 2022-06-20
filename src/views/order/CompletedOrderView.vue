<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import { useOrderStore } from '../../stores/order'

const userStore = useAdminStore()
const orderStore = useOrderStore()

onMounted(() => {
    userStore.getToken()
    orderStore.readTableBookingOrdersData()
    orderStore.readTakeAwayOrdersData()
    if (userStore.user.uid != null) {
        useRouter().push({ path: '/completed-orders' })
    } else {
        useRouter().push({ path: '/signin' })
    }
})
</script>

<template>
    <div class="container py-16">
        <div class="flex flex-row justify-between items-center">
            <h1 class="display-6 pb-8">Completed Orders</h1>
        </div>
        <div>
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item me-2" role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                        aria-selected="true">Take Away Completed Orders</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                        aria-selected="false">Table Booking Completed Orders</button>
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
                                <th scope="col" class="text-center">Status</th>
                                <th scope="col" class="text-center">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(takeAway, index) in orderStore.takeAwayOrders" :key="index"
                                v-show="takeAway.data.orderStatus == 'Completed'">
                                <th scope="row" class="text-center">{{ index + 1 }}</th>
                                <td scope="row" class="truncate text-ellipsis max-w-[5ch] md:max-w-[48ch]">
                                    <ul class="list-group">
                                        <li v-for="(item, i) in takeAway.data.order" :key="i" class="list-group-item">{{
                                                item.itemName
                                        }} | {{ item.itemQuantity }} | {{ item.price }}</li>
                                    </ul>
                                </td>
                                <td scope="row" class="text-center">{{ takeAway.key }}</td>
                                <td class="text-center">{{ takeAway.data.orderStatus }}</td>
                                <td class="text-center">{{ takeAway.data.totalAmount }}</td>
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
                                <th scope="col" class="text-center">Table ID</th>
                                <th scope="col" class="text-center">Status</th>
                                <th scope="col" class="text-center">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(tableBook, index) in orderStore.tableBookingOrders" :key="index" v-show="tableBook.data.orderStatus == 'Completed'">
                                <th scope="row" class="text-center">{{ index + 1 }}</th>
                                <td scope="row" class="truncate text-ellipsis max-w-[5ch] md:max-w-[48ch]">
                                    <ul class="list-group">
                                        <li v-for="(item, i) in tableBook.data.order" :key="i" class="list-group-item">
                                            {{ item.itemName }} | {{ item.itemQuantity }} | {{ item.price }}</li>
                                    </ul>
                                </td>
                                <td class="text-center">{{ tableBook.data.tableId }}</td>
                                <td class="text-center">{{ tableBook.data.orderStatus }}</td>
                                <td class="text-center">{{ tableBook.data.totalAmount }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>