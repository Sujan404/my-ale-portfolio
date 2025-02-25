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
                        <li class="my-2">
                            <div class="flex max-w-screen-xl justify-between">
                                <p> ● Bastion Host Architecture</p>
                                <router-link :to="{ name: 'BastionHost' }"
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
                        <li class="my-2">
                            <div class="flex max-w-screen-xl justify-between">
                                <p> ● Why is docker so
                                    popular?</p>
                                <router-link :to="{ name: 'Docker' }"
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
                        <li class="my-2">
                            <div class="flex max-w-screen-xl justify-between">
                                <p> ● Hot reload the Vue
                                    with Vite inside docker container</p>
                                <router-link :to="{ name: 'HotReloadVueContainer' }"
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
                        <li class="my-2">
                            <div class="flex max-w-screen-xl justify-between">
                                <p> ● CSS Flex importance</p>
                                <router-link :to="{ name: 'CssFlex' }"
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
                        <li class="my-2">
                            <div class="flex max-w-screen-xl justify-between">
                                <p> ● Vue catch all /404 Not Found Route</p>
                                <router-link :to="{ name: 'VueCatch404' }"
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
                        <li class="my-2">
                            <div class="flex max-w-screen-xl justify-between">
                                <p> ● SEO for vue components in Client Side Rendering(CSR)</p>
                                <router-link :to="{ name: 'VueComponentSEOCSR' }"
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
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import NavBar from "@/views/home/Navigation.vue";
import Footer from "@/views/home/Footer.vue";
import { Head } from '@unhead/vue/components'
</script>