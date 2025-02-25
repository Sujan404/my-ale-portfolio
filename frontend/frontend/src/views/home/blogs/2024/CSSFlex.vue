<template>
    <div>

        <Head>
            <title>CSS Flex importance</title>
            <meta name="og:description" content="CSS Flex importance">
            <meta name="og:keywords"
                content="Software Engineer, Docker, HTML, CSS, Python, Vue, JavaScript, Bastion Host Architecture">
        </Head>
        <div class="mb-3">
            <NavBar />
        </div>
        <div class="max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
            <h1 class="text-3xl">
                CSS Flex importance
            </h1>
            <p id="read-text">2024-10-26 | 2 min read</p>
            <div class="flex flex-wrap justify-center my-5">
                <img :src="imgUrl" class="text-center">
            </div>
            <h2 class="text-lg my-3">
                CSS Flexbox is essential for creating flexible, responsive layouts that adjust seamlessly across
                different screen sizes and devices.
                It simplifies aligning and distributing space among items within a container, even when their sizes are
                unknown or dynamic.
                With Flexbox, elements can grow, shrink, or wrap as needed to fit the available space, making it ideal
                for both single- and multi-dimensional layouts.

                Example: Centering Content with Flexbox
                Here's a simple layout where Flexbox centers content both horizontally and vertically.
            </h2>

            <div class="my-3">
                <button @click="copy(source)" class="relative top-0 ml-auto block">
                    <!-- by default, `copied` will be reset in 1.5s -->
                    <span v-if="!copied" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
                    <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                </button>
            </div>
            <div class="bg-gray-100 overflow-auto">
                <pre class="px-5 text-indigo-600">
                    {{ source }}
                </pre>
            </div>
            <h2 class="text-lg my-3">In above example:</h2>

            <h2 class="text-lg"><span class="font-bold">display</span>: flex makes .container a flex container.</h2>
            <h2 class="text-lg"><span class="font-bold">justify-content</span>: center aligns items horizontally,
                centering .box.</h2>
            <h2 class="text-lg"><span class="font-bold">align-items</span>: center aligns items vertically, centering
                .box within .container.</h2>
            <h2 class="text-lg my-3">This approach keeps content centered regardless of screen size, demonstrating
                Flexbox’s responsiveness
                and versatility. </h2>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import imgUrl from "@/assets/images/2024/css-flex.png";
import NavBar from "@/views/home/Navigation.vue";
import Footer from "@/views/home/Footer.vue";
import { ref } from "vue";
import { Head } from '@unhead/vue/components'
import { useClipboard } from "@vueuse/core";

// Store the code you want to copy in `source`
const source = ref(`
<div class="container">
    <div class="box">Centered Box</div>
</div>

// Add CSS Style
.container {
    display: flex;
    justify-content: center; /* Centers horizontally */
    align-items: center;     /* Centers vertically */
    height: 100vh;           /* Full viewport height */
    background-color: #f0f0f0;
}

.box {
    padding: 20px;
    background-color: #4CAF50;
    color: white;
    font-size: 1.5rem;
}`);
const { text, copy, copied, isSupported } = useClipboard()
</script>
