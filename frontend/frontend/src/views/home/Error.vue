<template>
    <div class="flex flex-col min-h-screen w-full">
        <NavBar />
        <div class="flex flex-col flex-grow justify-center mx-auto p-4 sm:p-6 xl:p-8">
            <h1 class="text-3xl">Oops! The page you are looking for does not exist.</h1>
            <router-link class="text-xl" to="/">Go back to Home</router-link>
        </div>
        <Footer />
    </div>
</template>
<script setup>
import NavBar from "@/views/home/Navigation.vue";
import Footer from "@/views/home/Footer.vue";
</script>