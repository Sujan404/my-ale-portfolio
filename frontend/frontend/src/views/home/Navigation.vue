<template>
    <div>
        <nav class="bg-gray-100 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 sm:p-6 xl:p-8">
                <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <span class="text-3xl">👀</span>
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Sujan Ale</span>
                </router-link>
                <div class="hidden md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:flex">
                    <div v-if="user">
                        <router-link :to="{ name: 'User', params: { userId: userStore.getUser['id'] } }"
                            class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-2">
                            {{ username }}</router-link>

                        <button type="button" @click="signOut"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Log out</button>
                    </div>
                    <div v-else>
                        <router-link to="/signin" type="button"
                            class="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Sign in</router-link>
                        <router-link to="/signup" type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Sign Up</router-link>

                    </div>
                </div>

                <button @click="toggleNavbar" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                <div :class="{ hidden: isCollapsed }"
                    class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul
                        class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-100 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <router-link to="/"
                                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent sm:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                aria-current="page">Home</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'BlogsCollection' }"
                                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent sm:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Blog</router-link>
                        </li>
                        <!-- <li>
                            <router-link href="#"
                                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent sm:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</router-link>
                        </li> -->
                        <li v-if="user" class="md:hidden">
                            <router-link :to="{ name: 'User', params: { userId: userStore.getUser['id'] } }"
                                type="button"
                                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent sm:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                {{ username }}</router-link>
                        </li>
                        <li v-if="user" class="md:hidden">
                            <router-link to="/" type="button" @click="signOut"
                                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent sm:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Log out</router-link>
                        </li>
                        <li v-if="!user" class="md:hidden">
                            <router-link to="/signin" type="button"
                                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent sm:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Sign in</router-link>
                        </li>
                        <li v-if="!user" class="md:hidden">
                            <router-link to="/signup" type="button"
                                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent sm:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Sign Up</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { userUserStore } from "@/stores/user"
import { useRouter } from 'vue-router'
import { DELETE_ACTIVE_JWT_TOKEN } from "@/mutations";
import { apolloClient } from "@/apollo-config"; // Import Apollo Client

const userStore = userUserStore();
const router = useRouter();
const isCollapsed = ref(true);
const user = userStore.getUser
var username = null
if(user){
    username = user.username.charAt(0).toUpperCase()
    + user.username.slice(1)
}

function toggleNavbar() {
    isCollapsed.value = !isCollapsed.value;
}
async function signOut() {
    try {
        await apolloClient.mutate({
            mutation: DELETE_ACTIVE_JWT_TOKEN,
            variables: {
                userId: userStore.getUser['id']
            }
        });
        userStore.removeToken();
        userStore.removeUser();
        router.push({ name: "home" });
    } catch (error) {
        console.error("Error signing out:", error);
    }
}
</script>
