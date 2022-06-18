<template>
    <div class="flex flex-col gap-10 justify-center items-center p-20">
        <div>
            <h1 class="display-6">Sorry! Page Not Found</h1>
            <router-link class="!flex !flex-row !flex-nowrap !gap-2 btn btn-outline-dark btn-sm max-w-min" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span class="whitespace-nowrap">Go Back Home</span>
            </router-link>
        </div>
        <img class="h-[36rem]" src="../assets/page_not_found.svg" alt="404 SVG">
    </div>
</template>