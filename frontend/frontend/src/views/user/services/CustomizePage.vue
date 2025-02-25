<template>
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <div v-if="router.currentRoute.value.name === 'CustomizePage'" class="flex flex-wrap items-center justify-center mx-auto">
            <div class="max-w-sm p-6 border border-gray-200 rounded-lg shadow bg-gray-100 dark:border-gray-700 max-sm:my-2">
                <!-- <a href="/2024/bastion-host-architecture"> -->
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">View saved template</h5>
                <!-- </a> -->
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">View all the customized pages.</p>
                <router-link :to="{ name: 'ViewPage', params: { userId: userStore.getUser['id'] } }"
                    class="w-full inline-flex items-center justify-center 
                    px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View
                </router-link>
            </div>
            <div class="max-w-sm p-6 border border-gray-200 rounded-lg shadow bg-gray-100 dark:border-gray-700 max-sm:my-2">
                <!-- <a href="/2024/bastion-host-architecture"> -->
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create new template</h5>
                <!-- </a> -->
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Customize new template as you desire.</p>
                <router-link :to="{ name: 'CreatePage', params: { userId: userStore.getUser['id'] } }"
                    class="w-full inline-flex items-center justify-center 
                    px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View
                </router-link>
            </div>
  
        </div>
        <RouterView />
    </div>
</template>
<script setup>
// import { userHideContentStore } from '@/stores/hideContentuser'
import { useRouter } from 'vue-router'
import { userUserStore } from "@/stores/user"
const userStore = userUserStore();

// const hideContentUser = userHideContentStore()
// hideContentUser.setHideContent(true)

var router = useRouter()
</script>