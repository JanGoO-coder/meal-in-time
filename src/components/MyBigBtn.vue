<script setup>
import { defineProps } from 'vue'

defineProps({
    btnText: {
        type: String,
        default: 'Click me'
    },
    btnImage: {
        type: String,
        default: 'https://via.placeholder.com/150'
    }
})

const getImgUrl = (pic) => {
    return require('../assets/'+pic)
}
</script>

<template>
    <button class="group btn btn-outline-dark bg-gradient-to-b hover:from-orange-300 hover:to-orange-400 border-2 !border-transparent hover:!border-gray-800 !rounded-2xl !p-6 !w-56 shadow-inner !bg-slate-100" type="button">
        <div class="flex flex-col justify-start gap-6">
            <img class="h-20 w-20 opacity-60 group-hover:opacity-100" :src="btnImage" alt="Burger SVG">
            <div class="text-xl whitespace-nowrap text-start">{{ btnText }}</div>
        </div>
    </button>
</template>