<template>
    <div class="relative flex flex-wrap justify-between flex-col w-full">
        <div class="body-content p-4 sm:p-6 xl:p-8 mx-auto">
            <div
                class="mx-2 items-center block p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-green-500 dark:text-white">
                    Upload a Image to get text</h5>

                <div class="card flex flex-col items-center gap-6" id="file-upload-card">
                    <FileUpload mode="advanced" @select="onFileSelect" @uploader="onFileUpload" customUpload
                        accept="image/*" :multiple="true" severity="secondary" class="p-button-outlined" />
                    <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full sm:w-64"
                        style="filter: grayscale(100%)" />
                </div>
                <h1 class="text-3xl">Image Text Information:</h1>
                <br>
                <div v-if="notifications.length > 0">
                    <ul>
                        <li v-for="(notification, index) in notifications" :key="index">
                            <p><span class="text-red-500">Event: </span> {{ notification.event }}</p>

                            <span>Bill ID: {{ notification.bill_id }}</span>

                            <p class="flex flex-wrap"><span class="text-red-500">Image URL: </span><a
                                    :href="this.backendServer + notification.photo_url" target="_blank">{{
                                        this.backendServer + notification.photo_url }}</a></p>
                            <p class="flex flex-wrap">
                                <span class="text-red-500">Image text: </span> {{ notification.ocr_text }}
                            </p>
                        </li>
                    </ul>
                </div>
                <h1 v-else>No image is uploaded...</h1>
            </div>


        </div>
    </div>

</template>

<script>
import { useWebSocket } from "@vueuse/core";
import { userUserStore } from "@/stores/user"
import { userSpinnerStore } from '@/stores/spinner';
// import {userHideContentStore} from '@/stores/hideContentUser'
import { useRoute } from "vue-router";
import { Bill_IMAGE } from "@/mutations"
import { computed, ref, watch } from 'vue';
import Navbar from "@/views/home/Navigation.vue"
import Footer from "@/views/home/Footer.vue"

export default {
    data() {
        return {
            billInfo: {},
            backendServer: import.meta.env.VITE_BACKEND_SERVER,
            mySite: null,
            activeLink: null,
            src: null,
        }
    },
    components: {
        Navbar,
        Footer,
    },
    setup() {
        const websocket_url = import.meta.env.VITE_WEBSOCKET_SERVER;
        const notifications = ref([]);
        const route = useRoute();
        const userStore = userUserStore();
        const loggedInUser = computed(() => userStore.getUser);
        const spinnerStore = userSpinnerStore();
        // const hideContentUser = userHideContentStore()
        // hideContentUser.setHideContent(true)
        const { status, data: wsData, send, open, close } = useWebSocket(
            websocket_url + '/ws/bill_notifications/'
        );
        // Watch for changes in wsData
        watch(() => wsData.value, (newData) => {
            if (newData) {
                // console.log(newData)
                const event = JSON.parse(newData);
                if (notifications) {
                    notifications.value = [event];
                    spinnerStore.setSpinner(false)
                }
            }
        });

        return {
            route, notifications, loggedInUser,
            send, // Expose WebSocket methods for potential use
            open,
            close,
            status,
        }
    },
    async created() {
    },
    methods: {
        onFileSelect(event) {
            const file = event.files[0];
            const reader = new FileReader();

            reader.onload = async (e) => {
                this.src = e.target.result;
            };

            reader.readAsDataURL(file);
        },
        async onFileUpload(event) {
            const spinnerStore = userSpinnerStore();
            spinnerStore.setSpinner(true)
            const files = event.files; // Get the file to upload
            // Define the mutation for the file upload
            try {
                await files.forEach((file) => {
                    const response = this.$apollo.mutate({
                        mutation: Bill_IMAGE,
                        variables: {
                            userId: this.loggedInUser.id,
                            name: file.name,
                            description: file.name,
                            photo: file
                        },
                    });
                    // console.log("Upload response:", response);
                })
            } catch (error) {
                console.error("File upload failed:", error);
            }
        },
    }
};
</script>