<script setup>
import { ref, onMounted } from 'vue'
import { useAdminStore } from '../stores/admin'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const admin = useAdminStore()
const user = ref({})

const authenticate = async () => {
    admin.loading = true
    user.value = await admin.signin(email.value, password.value)
}

onMounted(() => {
    if (admin.user.displayName != null) {
        useRouter().push({ path: '/' })
    } else {
        useRouter().push({ path: '/signin' })
    }
})
</script>

<template>
    <div class="w-screen h-screen flex justify-center items-center">
        <div class="relative flex flex-col justify-center items-center w-96 p-6 rounded-lg bg-white shadow-lg">
            <img src="../assets/logo.JPG" class="w-32" alt="Meal In Time Logo">
            <h1 class="display-6 mb-3 py-3">Sign In</h1>
            <div class="form-floating mb-3 w-full">
                <input type="email" class="form-control" id="emailInput" v-model="email" placeholder="name@example.com">
                <label for="emailInput">Email address</label>
            </div>
            <div class="form-floating mb-3 w-full">
                <input type="password" class="form-control" id="passwordInput" v-model="password"
                    placeholder="123456789">
                <label for="passwordInput">Password</label>
            </div>
            <button @click="authenticate" type="button" class="btn btn-warning p-3 w-full mt-3">
                <span v-if="!admin.loading">Sign In</span>
                <span v-else class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </span>
            </button>
        </div>
    </div>
</template>