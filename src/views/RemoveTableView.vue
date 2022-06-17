<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../stores/admin'
import { useTableStore } from '../stores/table'

const tableStore = useTableStore()
const userStore = useAdminStore()

const tid = ref("")

onMounted(() => {
    tableStore.readTablesData()
    userStore.getToken()
    if (userStore.user.uid != null) {
        useRouter().push({ path: '/remove-table' })
    } else {
        useRouter().push({ path: '/signin' })
    }
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
                <input type="text" class="form-control" id="tid" v-model="tid" placeholder="Table ID [TID]">
                <label for="tid">Table ID [TID]</label>
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