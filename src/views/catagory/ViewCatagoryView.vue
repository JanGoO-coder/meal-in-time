<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import { useCatagoryStore } from '../../stores/catagories'

const catagoryStore = useCatagoryStore()
const userStore = useAdminStore()

const catagoryName = ref('')
const edit_cid = ref('')

onBeforeMount(() => {
    catagoryStore.catagroies = []
    catagoryStore.readCatagoryData()
    userStore.getToken()
    if (userStore.user.uid != null) {
        useRouter().push({ path: '/catagories' })
    } else {
        useRouter().push({ path: '/signin' })
    }
})

const onClickAddNewCatagory = () => {
    catagoryStore.addNewCatagoryItem(catagoryName.value)
    document.getElementById("catagoryAddCloseBtn").click()
}

const onClickEditCatagory = () => {
    catagoryStore.editCatagoryItem(edit_cid.value, catagoryName.value)
    document.getElementById("catagoryEditCloseBtn").click()
}

const onClickDeleteCatagory = (cid) => {
    catagoryStore.removeCatagoryItem(cid)
}

const pickCatagoryName = (cid, name) => {
    edit_cid.value = cid
    catagoryName.value = name
}
</script>

<template>
    <div class="modal fade" id="addCatagoryModal" tabindex="-1" aria-labelledby="addCatagoryModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addCatagoryModalLabel">Add Catagory Form</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="form-floating">
                            <input type="text" class="form-control" id="catagoryAddInput" v-model="catagoryName"
                                placeholder="Catagory Name">
                            <label for="catagoryAddInput">Catagory Name</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="catagoryAddCloseBtn" type="button" class="btn btn-secondary"
                        data-bs-dismiss="modal">Close</button>
                    <button @click="onClickAddNewCatagory" type="button" class="btn btn-primary">
                        <span v-if="catagoryStore.loading" class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </span>
                        <span v-else>Add New Catagory</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="editCatagoryModal" tabindex="-1" aria-labelledby="editCatagoryModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editCatagoryModalLabel">Edit Catagory Form</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="form-floating">
                            <input type="text" class="form-control" id="catagoryEditInput" v-model="catagoryName" placeholder="Catagory Name">
                            <label for="catagoryEditInput">Catagory Name</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="catagoryEditCloseBtn" type="button" class="btn btn-secondary"
                        data-bs-dismiss="modal">Close</button>
                    <button @click="onClickEditCatagory" type="button" class="btn btn-primary">
                        <span v-if="catagoryStore.loading" class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </span>
                        <span v-else>Save Changes</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="container py-16">
        <div class="flex flex-row justify-between items-center">
            <h1 class="display-6 pb-8">Catagories</h1>
            <button type="button" class="btn btn-warning btn-lg mr-2 !flex !flex-row !gap-3" data-bs-toggle="modal"
                data-bs-target="#addCatagoryModal">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Catagory</span>
            </button>
        </div>
        <div v-if="catagoryStore.catagroies.length > 0" class="flex flex-row flex-wrap gap-3 mt-10">
            <div v-for="(catagory, index) in catagoryStore.catagroies" :key="index"
                class="card text-dark bg-light mb-3 !min-w-max" style="max-width: 18rem;">
                <div
                    class="card-header !flex !gap-20 !flex-row !flex-nowrap !items-center bg-gradient-to-b from-orange-300 to-orange-400">
                    <span class="text-xl font-bold whitespace-nowrap">Catagory No: {{ index + 1 }}</span>
                    <div>
                        <button @click="pickCatagoryName(catagory.key, catagory.data.categoryName)" type="button" class="btn btn-light mr-2" data-bs-toggle="modal"
                            data-bs-target="#editCatagoryModal">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="1">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button @click="onClickDeleteCatagory(catagory.key)" type="button" class="btn btn-light">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="1">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title"><span class="font-extrabold">Name:</span> {{ catagory.data.categoryName }}
                    </h5>
                    <h3 class="text-lg text-gray-600"><span class="font-bold">ID:</span> {{ catagory.key }}
                    </h3>
                </div>
            </div>
        </div>
        <div v-else-if="catagoryStore.loading">
            <span class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </span>
        </div>
        <div v-else>
            <h1 class="text-slate-500 font-extralight">There is nothing to show here.</h1>
        </div>
    </div>
</template>