<template>
    <div class="flex flex-col min-h-screen w-full">

        <Head>
            <title>My blogs</title>
            <meta name="og:description" content="Software Engineering technical blogs">
            <meta name="og:keywords" content="Software Engineer, Docker, HTML, CSS, Python, Vue, JavaScript, Bastion Host Architecture">
        </Head>
        <NavBar />

        <div class="flex flex-grow max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
            <div>
                <h1 class="text-3xl">
                    Blogs Collection
                </h1>
                <h2>I am sharing knowledge I have learnt about software engineering topics in the blogs. Keep visiting
                    my site to read new blogs with new contents.</h2>
                <div class="my-8">
                    <h2 class="text-2xl ">Topics</h2>
                    <hr class="w-full h-1 bg-gray-200 border-0 rounded dark:bg-gray-700">
                </div>
                <div>
                    <ul>
                        <li class="my-2" v-for="article in currentPageArticles">
                            <div class="flex max-w-screen-xl justify-between">
                                <p> ● {{article.title}}</p>
                                <router-link :to="{ name: article.routeName }"
                                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </router-link>
                            </div>
                        </li>
                    </ul>
                </div>
                <Pagination :rows="rows" :totalRecords="articles.length" @page="onPageChange"/>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import NavBar from "@/views/home/Navigation.vue";
import Footer from "@/views/home/Footer.vue";
import { Head } from '@unhead/vue/components'
import { ref, computed } from "vue";
import Pagination from "./Pagination.vue";

const articles = ref([
    { title: 'Proxy vs Reverse Proxy', date: '2024-11-07', readTime:'6 min', routeName:'Proxy', summary: 'Understanding the differences between proxy and reverse proxy servers.' },
    { title: 'Bastion Host Architecture', date: '2024-10-30',readTime: '2 min', routeName:'BastionHost', summary: 'Secured access to resources in a private subnet without exposing them to the internet.' },
    { title: 'Why is Docker So Popular?', date: '2024-10-29', readTime: '2 min', routeName: 'Docker', summary: 'Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.' },
    { title: 'Hot reload the Vue with Vite inside docker container', date: '2024-10-26', readTime: '2 min', routeName: 'HotReloadVueContainer',summary: 'Hot reload has been a manadotory tool for saving time and smooth workflow for developers.' },
    { title: 'CSS Flex Importance', date: '2024-10-26', readTime:'2 min', routeName:'CssFlex', summary: 'CSS Flexbox is essential for creating flexible, responsive layouts that adjust seamlessly across different screen sizes and devices.' },
    { title: 'Vue catch all /404 Not Found Route', date: '2024-10-25', readTime: '2 min', routeName:'VueCatch404', summary: 'Display meaningful content instead showing blank white page.' },
    { title: 'SEO for Vue Components in Client-Side Rendering', date: '2024-10-25', readTime: '4 min', routeName:'VueComponentSEOCSR', summary: 'Add meta tags in vue component that helps search engines understand your content, and helping users find your site and make decision about whether they should visit your site through a search engine.' }
]);

const first = ref(0);
const rows = ref(10); // Number of items per page

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