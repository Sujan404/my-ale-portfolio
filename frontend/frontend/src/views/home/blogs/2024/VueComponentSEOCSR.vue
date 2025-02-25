<template>
    <div>

        <Head>
            <title>SEO for vue components Client Side Rendering(CSR)</title>
            <meta name="og:description" content="SEO for vue components Client Side Rendering (CSR)">
            <meta name="og:keywords"
                content="Software Engineer, Docker, HTML, CSS, Python, Vue, JavaScript, Bastion Host Architecture">
        </Head>
        <div class="mb-3">
            <NavBar />
        </div>
        <div class="max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
            <h1 class="text-3xl">
                SEO for vue components Client Side Rendering (CSR)
            </h1>
            <p id="read-text">2024-10-25 | 4 min read</p>
            <h2 class="text-lg my-3">
                Search Engine Optimization (SEO) for Vue components is essential when creating Single Page Applications
                (SPAs) in
                Vue because it ensures that search engines and social media platforms can index and understand your
                content, which can be challenging for SPAs.
            </h2>
            <h2 class="text-lg my-3 font-bold">
                What is Client Side Rendering (CSR)?
            </h2>
            <h2 class="text-lg my-3">
                Client-side rendering (CSR) is a web development technique where, upon the user’s initial request, the
                server delivers only the static files
                (HTML, CSS, and JavaScript) to the browser. The browser first loads the HTML and then downloads
                JavaScript, which generates the content dynamically on the client side.
                Initially, users may see loading symbols until the JavaScript fully executes, making the website
                interactive and visible as users navigate and engage with the content.
            </h2>
            <h1 class="text-xl font-bold">Technical Details</h1>
            <h1 class="text-lg my-3">There is <a href="https://unhead.unjs.io/" target="_blank">unjs/unhead</a> package
                available to manage head tags.</h1>

            <!-- source One -->
            <h1 class="text-xl font-bold my-3">Step 1: Install @unhead/vue dependency to your project</h1>
            <h1 class="text-lg my-3">npm install @unhead/vue</h1>
            <div class="my-3">
                <button @click="copyOne" class="relative top-0 ml-auto block">
                    <!-- by default, `copied` will be reset in 1.5s -->
                    <span v-if="!copiedOne" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
                    <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                </button>
            </div>
            <div class="bg-gray-100 overflow-auto">
                <pre class="px-5 text-indigo-600">
                    {{ sourceOne }}
                </pre>
            </div>

            <!-- source two -->
            <h1 class="text-xl font-bold my-3">Step 2: Register the Vue plugin in src/main.js</h1>
            <div class="my-3">
                <button @click="copyTwo" class="relative top-0 ml-auto block">
                    <!-- by default, `copied` will be reset in 1.5s -->
                    <span v-if="!copiedTwo" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
                    <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                </button>
            </div>
            <div class="bg-gray-100 overflow-auto">
                <pre class="px-5 text-indigo-600">
                    {{ sourceTwo }}
                </pre>
            </div>

            <!-- source three -->
            <h1 class="text-xl font-bold">Step 3: After you registered, use <span
                    class="font-bold text-rose-500">useHead</span> in the components</h1>
            <h1 class="text-xl my-3">Options API: Just add script like shown bottom then it will automatically update in
                &lt;head&gt;&lt;/head&gt; tag.</h1>

            <div class="my-3">
                <button @click="copyThree" class="relative top-0 ml-auto block">
                    <!-- by default, `copied` will be reset in 1.5s -->
                    <span v-if="!copiedThree" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
                    <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                </button>
            </div>
            <div class="bg-gray-100 overflow-auto">
                <pre class="px-5 text-indigo-600">
                    {{ sourceThree }}
                </pre>
            </div>

            <!-- source four -->
            <h1 class="text-xl my-3">Composition API: It is slightly different form Options API </h1>

            <div class="my-3">
                <button @click="copyFour" class="relative top-0 ml-auto block">
                    <!-- by default, `copied` will be reset in 1.5s -->
                    <span v-if="!copiedFour" class="copy-code-btn p-2 rounded-lg font-bold text-white">Copy Code</span>
                    <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
                </button>
            </div>
            <div class="bg-gray-100 overflow-auto">
                <pre class="px-5 text-indigo-600">
                    {{ sourceFour }}
                </pre>
            </div>

            <div class="my-3">
                <h1 class="text-xl font-bold">Bottom link provides in-depth information</h1>
                <h2 class="text-lg my-3">
                    <a href="https://unhead.unjs.io/setup/vue/installation" target="_blank">Add meta tags in vue
                        components</a>
                </h2>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script setup>
import NavBar from "@/views/home/Navigation.vue";
import Footer from "@/views/home/Footer.vue";
import { Head } from '@unhead/vue/components'
import { ref } from "vue";
import { useClipboard } from "@vueuse/core";

// Store the code you want to copy in `source`
const sourceOne = ref(`
npm install @unhead/vue`);
const sourceTwo = ref(`
import { createApp } from "vue";
import { createHead } from '@unhead/vue'
import router from "./router";
const head = createHead()
const app = createApp();

app.use(head).use(router).mount("#app");`);

const sourceThree = ref(`
<script>
import { useHead } from '@unhead/vue'
    export default {
    setup() {
        useHead({
        title: "Add meta tags",
        meta: [
            {
            name: "og:description",
            content: "I am adding description meta tag for SEO.",
            },
            {
            name: "og:keywords",
            content: "Vue, Options API, Client Side Rendering.",
            },
        ],
        });
    }
<`+ `/script>`);

const sourceFour = ref(`
<template>
    <Head>
        <title>Add meta tags</title>
        <meta name="og:description" content="I am adding description meta tag for SEO.">
        <meta name="og:keywords" content="Vue, Composition API, Client Side Rendering">
    </Head>
</template>
                
<script>
    import { Head } from '@unhead/vue/components'
<`+ `/script>`);

// Create individual copied state for each source
const copiedOne = ref(false);
const copiedTwo = ref(false);
const copiedThree = ref(false);
const copiedFour = ref(false);

const { text, copy, copied, isSupported } = useClipboard()

const copyOne = () => {
    copy(sourceOne.value);
    copiedOne.value = true;
    setTimeout(() => copiedOne.value = false, 1500); // Reset after 1.5 seconds
}

const copyTwo = () => {
    copy(sourceTwo.value);
    copiedTwo.value = true;
    setTimeout(() => copiedTwo.value = false, 1500);
}

const copyThree = () => {
    copy(sourceThree.value);
    copiedThree.value = true;
    setTimeout(() => copiedThree.value = false, 1500);
}

const copyFour = () => {
    copy(sourceFour.value);
    copiedFour.value = true;
    setTimeout(() => copiedFour.value = false, 1500);
}
</script>
