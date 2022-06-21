<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import { useTableStore } from '../../stores/table'

const tableStore = useTableStore()
const userStore = useAdminStore()

const tid = ref("")

onMounted(() => {
    userStore.checkAuth('/remove-table')
    tableStore.readTablesData()
    userStore.getToken()
})

const onClickRemoveTable = () => {
    tableStore.loading = true
    tableStore.removeTableData(tid.value)
}
</script>

<template>
    <div class="py-12 container flex flex-col gap-3 justify-start items-center md:!w-1/3">
        <h1 class="display-6">Remove Table</h1>
        <div class="flex flex-col gap-3 transition-all duration-500 w-full mx-auto p-6 !shadow-md bg-white hover:!shadow-xl rounded-2xl">
            <div class="form-floating">
                <select class="form-select" id="tid" v-model="tid" aria-label="tid">
                    <option value="" selected>Select Table Id [TID]</option>
                    <option v-for="(tbl, index) in tableStore.tables" :key="index" :value="tbl.key">{{ tbl.key }}</option>
                </select>
                <label for="tid">Select Table Id [TID]</label>
            </div>
            <button @click="onClickRemoveTable" type="button" class="btn btn-warning p-3 w-full mt-3">
                <span v-if="!tableStore.loading">Remove Table</span>
                <span v-else class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </span>
            </button>
        </div>
    </div>
</template>