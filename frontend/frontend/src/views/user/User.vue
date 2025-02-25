<template>
    <div class="relative flex flex-wrap flex-col w-full">
        <div role="status"
            class="absolute z-50 bg-gray-200 flex justify-center items-center h-full w-full opacity-70 p-8"
            :class="{ hidden: !spinnerStore.showSpinner }">
            <div class="flex flex-col items-center justify-center">
                <svg aria-hidden="true" class="w-40 h-40 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>
                <h1 class="text-blue-800 font-bold text-3xl">Text is generating from image......</h1>
                <span class="sr-only">Loading...</span>
            </div>
        </div>

        <div class="flex flex-col justify-between min-h-screen">

            <Navbar />

            <BreadCrumb />

            <!-- <div class="body-content p-4 sm:p-6 xl:p-8 mx-auto" :class="{ hidden: hideContentUser.hideServiceOptions }"> -->
                <div class="body-content p-4 sm:p-6 xl:p-8 mx-auto" v-if="route.name === 'User'">
                <div v-if="loggedInUser">
                    <div class="flex p-4 sm:p-6 xl:p-8">
                        <div>
                            <h1 class="text-3xl" v-if="loggedInUser">Welcome {{ loggedInUser.username.charAt(0).toUpperCase()
    + loggedInUser.username.slice(1) }}</h1>
                        </div>
                    </div>

                    <fwb-accordion>
                        <fwb-accordion-panel>
                            <fwb-accordion-header>Customize Frontend</fwb-accordion-header>
                            <fwb-accordion-content>
                                <div>
                                    <p class="mb-2 text-gray-500 dark:text-gray-400">Unlocking the power to customize
                                        template
                                        and
                                        make it resuable</p>
                                    <p class="text-gray-500 dark:text-gray-400">Try it!<router-link
                                            :to="{ name: 'CustomizePage', params: { userId: loggedInUser.id } }"
                                            class="text-blue-600 dark:text-blue-500 hover:underline">Click
                                            Here</router-link>
                                        and
                                        start
                                        customizing pages and use it.</p>
                                </div>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>
                        <fwb-accordion-panel>
                            <fwb-accordion-header>Generate Text from Image</fwb-accordion-header>
                            <fwb-accordion-content>
                                <div>
                                    <p class="mb-2 text-gray-500 dark:text-gray-400">Get string from the image</p>
                                    <p class="text-gray-500 dark:text-gray-400">Try it!<router-link
                                            :to="{ name: 'GenerateText', params: { userId: loggedInUser.id } }"
                                            class="text-blue-600 dark:text-blue-500 hover:underline">Click
                                            Here</router-link>
                                        and
                                        start
                                        generating strings.</p>
                                </div>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>
                        <!-- <fwb-accordion-panel>
                        <fwb-accordion-header>and one more header</fwb-accordion-header>
                        <fwb-accordion-content>
                            <div>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Flowbite is first conceptualized and designed using the Figma software so everything
                                    you see in the library has a design equivalent in our Figma file.
                                </p>
                                <p class="text-gray-500 dark:text-gray-400">
                                    Check out the <a href="https://flowbite.com/figma/"
                                        class="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a>
                                    based on the utility classes from Tailwind CSS and components from Flowbite.
                                </p>
                            </div>
                        </fwb-accordion-content>
                    </fwb-accordion-panel> -->
                    </fwb-accordion>
                </div>

            </div>

            <router-view></router-view>
            <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                <div class="max-w-screen-xl flex flex-wrap justify-center mx-auto p-4 sm:p-6 xl:p-8">
                    <div>
                        <p class="font-bold">Informational message</p>
                        <p class="text-sm">This application is currently in development and may not deliver fully
                            accurate
                            results. It is intended solely for educational and experimental purposes. The application
                            does
                            not aim to replicate or copy any existing work or ideas and is not intended for commercial
                            or
                            business use. Any similarities to existing projects are purely coincidental, as the
                            application's design and functionality are based on general knowledge and principles.
                            Feedback
                            and suggestions for improvement are welcome as the project evolves.</p>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    </div>

</template>

<script>
import {
    FwbAccordion,
    FwbAccordionContent,
    FwbAccordionHeader,
    FwbAccordionPanel,
} from 'flowbite-vue'
import { useRoute } from "vue-router";
import { computed, ref, watch } from 'vue';
import { userUserStore } from "@/stores/user"
import { userSpinnerStore } from '@/stores/spinner';
// import { userHideContentStore } from '@/stores/hideContentUser'
import Navbar from "@/views/home/Navigation.vue"
import Footer from "@/views/home/Footer.vue"
import BreadCrumb from "@/views/home/BreadCrumb.vue";

export default {
    data() {
        return {
            billInfo: {},
            backendServer: import.meta.env.VITE_BACKEND_SERVER,
            frontendServer: import.meta.env.VITE_FRONTEND_SERVER,
            mySite: null,
            activeLink: null,
            src: null,
            serviceOptions: false,
        }
    },
    components: {
        Navbar,
        Footer,
        BreadCrumb,
        FwbAccordion,
        FwbAccordionContent,
        FwbAccordionHeader,
        FwbAccordionPanel,
    },
    setup() {
        const route = useRoute();
        const userStore = userUserStore();
        const loggedInUser = computed(() => userStore.getUser);
        const spinnerStore = userSpinnerStore();
        // const hideContentUser = userHideContentStore()
        return {
            loggedInUser, userStore, route, spinnerStore
        }
    },
    methods: {
        async logout() {
            this.userStore.removeToken();
            this.userStore.removeUser();
            this.$router.push({ name: "SignIn" });
        },
    },
    // watch: {
    //     $route(to, from) {
    //         const hideContentUser = userHideContentStore()
    //         // Show the element again if coming back to this page
    //         if (to.fullPath === '/user/' + this.loggedInUser.id) {
    //             hideContentUser.setHideContent(false);
    //         }
    //     },
    // }
};
</script>