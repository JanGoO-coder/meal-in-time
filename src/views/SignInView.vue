<script setup>
import { ref } from 'vue'
import { useAdminStore } from '../stores/admin'

const email = ref('')
const password = ref('')

const admin = useAdminStore()
const user = ref({})

const authenticate = async () => {
    user.value = await admin.signin(email.value, password.value)
    console.log(await user.value)
}
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
                <input type="password" class="form-control" id="passwordInput" v-model="password" placeholder="123456789">
                <label for="passwordInput">Password</label>
            </div>
            <button @click="authenticate" type="button" class="btn btn-warning p-3 w-full mt-3">Sign In</button>
        </div>
    </div>
</template>