<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import { useTableStore } from '../../stores/table'

const tableStore = useTableStore()
const userStore = useAdminStore()

const tid = ref("")
const no = ref(0)
const seats = ref(4)
const available = ref(true)

onMounted(() => {
    userStore.checkAuth('/edit-table')
    tableStore.readTablesData()
    userStore.getToken()
})

const onClickEditTable = () => {
    let flag = available.value == '1' ? false : true;
    const data = {
        'tNo': no.value,
        'seat': seats.value,
        'available': flag
    }
    tableStore.loading = true
    tableStore.editTableData(tid.value, data)
}
</script>

<template>
    <div class="py-12 container flex flex-col gap-3 justify-start items-center md:!w-1/3">
        <h1 class="display-6">Edit Table</h1>
        <div class="flex flex-col gap-3 transition-all duration-500 w-full mx-auto p-6 !shadow-md bg-white hover:!shadow-xl rounded-2xl">
            <div class="form-floating">
                <select class="form-select" id="tid" v-model="tid" aria-label="tid">
                    <option value="" selected>Select Table Id [TID]</option>
                    <option v-for="(tbl, index) in tableStore.tables" :key="index" :value="tbl.key">{{ tbl.key }}</option>
                </select>
                <label for="tid">Select Table Id [TID]</label>
            </div>
            <div class="form-floating">
                <input type="number" class="form-control" id="tbl_no" v-model="no" placeholder="Table Number" min="0">
                <label for="tbl_no">Table Number</label>
            </div>
            <div class="form-floating">
                <select class="form-select" id="seats" v-model="seats" aria-label="Seats">
                    <option selected>Select Number Of Seats</option>
                    <option value="1">One Seat</option>
                    <option value="2">Two Seats</option>
                    <option value="3">Three Seats</option>
                    <option value="4">Four Seats</option>
                    <option value="5">Five Seats</option>
                    <option value="6">Six Seats</option>
                </select>
                <label for="seats">Works with selects</label>
            </div>
            <div class="form-floating">
                <select class="form-select" id="available" v-model="available" aria-label="Seats">
                    <option selected value="true">Table is Available Or Not</option>
                    <option value="1">Yes Table is Available</option>
                    <option value="0">No Table is not Available</option>
                </select>
                <label for="available">Works with selects</label>
            </div>
            <button @click="onClickEditTable" type="button" class="btn btn-warning p-3 w-full mt-3">
                <span v-if="!tableStore.loading">Save Changes</span>
                <span v-else class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </span>
            </button>
        </div>
    </div>
</template>