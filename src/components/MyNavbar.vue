<script setup>
import { useAdminStore } from '../stores/admin'

const userStore = useAdminStore()
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-gradient-to-b from-orange-300 to-orange-400 py-3 !text-lg !font-bold shadow-2xl">
        <div class="container">
            <router-link to="/" class="navbar-brand me-5 flex gap-2 justify-center items-center" href="#">
                <img class="h-12 rounded-full" src="../assets/meal-in-time-logo.png" alt="Meal In Time Logo">
                <span class="!leading-5 !text-lg font-medium text-gray-800">Meal <br> InTime</span>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link active" aria-current="page">Dashboard</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Orders
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><router-link to="/pending-orders" class="dropdown-item">Pending Orders</router-link></li>
                            <li><router-link to="/received-orders" class="dropdown-item">Recived Orders</router-link></li>
                            <li><router-link to="/ready-orders" class="dropdown-item">Ready Orders</router-link></li>
                            <li><router-link to="/completed-orders" class="dropdown-item">Completed Orders</router-link></li>
                            <li><router-link to="/cancelled-orders" class="dropdown-item">Cancelled Orders</router-link></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Tables
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><router-link to="/tables" class="dropdown-item">View Tables</router-link></li>
                            <li><router-link to="/add-table" class="dropdown-item">Add Table</router-link></li>
                            <li><router-link to="/edit-table" class="dropdown-item">Edit Table</router-link></li>
                            <li><router-link to="/remove-table" class="dropdown-item">Remove Table</router-link></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Menu
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><router-link to="/menu" class="dropdown-item">View Menu</router-link></li>
                            <li><router-link to="/add-menu" class="dropdown-item">Add Menu Item</router-link></li>
                            <li><router-link to="/edit-menu" class="dropdown-item">Edit Menu Item</router-link></li>
                            <li><router-link to="/remove-menu" class="dropdown-item">Remove Menu Item</router-link></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link to="/catagories" class="nav-link" aria-current="page">Catagories</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item dropdown !relative">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            @{{ userStore.user.displayName }}
                        </a>
                        <ul class="dropdown-menu !absolute !left-auto !right-0" aria-labelledby="navbarDropdown">
                            <li><router-link to="/customers" class="dropdown-item">Customers</router-link></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a @click="userStore.logout" class="dropdown-item" href="#">Sign Out</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>