<template>
    <div>
        <div class="max-w-screen-xl mx-auto text-center">
            <div class="p-4 sm:p-6 xl:p-8">
                <div class="flex flex-wrap justify-center my-5">
                <img :src="imgUrl" class="text-center rounded-full">
            </div>
                <div>
                    <h1 class="md:text-5xl text-4xl lg:mt-20 md:mt-10 mt-5 text-green-600">
                        Hello, I am Sujan Ale, Software Engineer.
                    </h1>

                    <h2 class="text-lg my-2 text-orange-600">
                        I am an enthusiastic nerd who is always thriving to learn new things.
                        I have started this website to share my learnings that I have learnt so far and will be trying
                        my
                        best
                        to explicitly include my challenges and its overcomed ways in the blogs.
                    </h2>
                </div>
            </div>
        </div>
        <div class="h-36 text-center flex flex-wrap justify-center bg-gray-100 my-12">
            <h1 class="md:text-5xl text-4xl my-6 text-blue-700 flex flex-wrap items-center">Things I have learnt</h1>
        </div>

        <div class="max-w-screen-xl mx-auto flex flex-wrap justify-around max-sm:mx-2">

            <div v-for="article in currentPageArticles" class="max-w-sm p-6 border border-gray-200 rounded-lg shadow bg-gray-100 dark:border-gray-700 max-sm:my-2">
                <a href="/2024/vue-component-seo-csr">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{article.title}}</h5>
                    <p>2{{article.date}} | 4 min read</p>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ article.summary }}</p>
                <router-link :to="{ name: 'VueComponentSEOCSR' }"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </router-link>
            </div>
        </div>
        <Pagination :rows="rows" :totalRecords="articles.length" @page="onPageChange" />
    </div>
</template>

<script setup>
import imgUrl from "@/assets/images/me/sujan.png";
import Pagination from "./Pagination.vue";
import { ref, computed } from "vue";

const articles = ref([
    { title: 'Proxy vs Reverse Proxy', date: '2025-02-26', summary: 'Understanding the differences between proxy and reverse proxy servers.' },
    { title: 'Bastion Host Architecture', date: '2024-10-30', summary: 'Secured access to resources in a private subnet without exposing them to the internet.' },
    { title: 'Why is Docker So Popular?', date: '2024-10-29', summary: 'Exploring the reasons behind Docker\'s popularity in modern development.' },
    { title: 'Hot Reloading Vue with Vite in Docker', date: '2024-10-26', summary: 'Implementing hot reload for Vue applications using Vite inside a Docker container.' },
    { title: 'CSS Flex Importance', date: '2024-10-26', summary: 'The significance of CSS Flexbox in creating responsive layouts.' },
    { title: 'Vue Catch-All 404 Not Found Route', date: '2024-10-25', summary: 'Implementing a catch-all route in Vue to handle 404 Not Found errors.' },
    { title: 'SEO for Vue Components in Client-Side Rendering', date: '2024-10-25', summary: 'Add meta tags in vue component that helps search engines understand your content, and helping users find your site and make decision about whether they should visit your site through a search engine.' }
]);
const first = ref(0);
const rows = ref(3); // Number of items per page

// Compute the current page items
const currentPageArticles = computed(() => {
    const start = first.value;
    const end = start + rows.value;
    return articles.value.slice(start, end);
});

// Event handler for page changes
const onPageChange = (event) => {
    first.value = event.first;
    rows.value = event.rows;
};
</script>

