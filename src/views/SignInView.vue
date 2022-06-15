<template>
    <div class="w-screen h-screen flex justify-center items-center">
        <div class="relative flex flex-col justify-center items-center w-96 p-6 rounded-lg bg-white shadow-lg">
            <img src="../assets/logo.JPG" class="w-32" alt="Meal In Time Logo">
            <h1 class="display-6 mb-3 py-3">Sign In</h1>
            <div class="form-floating mb-3 w-full">
                <input type="email" class="form-control" id="emailInput" placeholder="name@example.com">
                <label for="emailInput">Email address</label>
            </div>
            <div class="form-floating mb-3 w-full">
                <input type="password" class="form-control" id="passwordInput" placeholder="123456789">
                <label for="passwordInput">Password</label>
            </div>
            <button type="button" class="btn btn-warning p-3 w-full mt-3">Sign In</button>
        </div>
    </div>
</template>