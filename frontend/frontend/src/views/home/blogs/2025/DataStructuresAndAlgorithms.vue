<template>
  <Head>
    <title>Build Time and Run Time Integration</title>
    <meta name="og:description" content="Vue catch all /404 Not Found Route" />
    <meta
      name="og:keywords"
      content="Software Engineer, Docker, HTML, CSS, Python, Vue, JavaScript, Data Structure and Algorithms"
    />
  </Head>

  <!-- NavBar -->
  <div class="mb-3">
    <NavBar />
  </div>
  <!-- Body Part -->
  <div class="max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
    <h1 class="text-3xl">{{ BLOGS_INFO['dataStructuresAndAlgorithms']['title'] }}</h1>
    <p id="read-text">
      {{ BLOGS_INFO['dataStructuresAndAlgorithms']['date'] }} |
      {{ BLOGS_INFO['dataStructuresAndAlgorithms']['readTime'] }} read
    </p>

    <section class="text-lg">
      <h2 class="my-3">
        Data structures and algorithms form the backbone of computer science and software
        development. Understanding how data is stored, accessed, and manipulated, as well as how
        problems are solved efficiently, is crucial for building scalable and high-performance
        applications. In this blog, we will explore fundamental data structures and algorithms,
        their real-world applications, and practical examples.
      </h2>
    </section>

    <!-- Data Structures -->
    <section class="text-lg">
      <h2 class="my-3 font-bold">What are Data Structures?</h2>
      <h2 class="my-3">
        Data structures are ways to organize and store data so that it can be accessed and modified
        efficiently. Common types include:
      </h2>
      <ol>
        <li>
          <p>
            <span class="font-bold">1. Array</span>: A collection of elements identified by index or
            key. Its usages are Storing lists of data, iterating, sorting, filtering.
          </p>
          <!-- source one -->
          <div class="my-3">
            <button @click="copyOne" class="relative ml-auto block">
              <!-- by default, `copied` will be reset in 1.5s -->
              <span v-if="!copiedOne" class="copy-code-btn p-2 rounded-lg font-bold text-white"
                >Copy Code</span
              >
              <span v-else class="copy-code-btn p-2 rounded-lg font-bold text-white">Copied!</span>
            </button>
          </div>
          <div class="bg-gray-100 overflow-auto">
            <pre class="px-5 text-indigo-600">
                    {{ sourceOne }}
                </pre
            >
          </div>
        </li>
      </ol>
    </section>
  </div>

  <Footer />
</template>

<script setup>
import NavBar from '@/views/home/Navigation.vue'
import Footer from '@/views/home/Footer.vue'
import { Head } from '@unhead/vue/components'
import { BLOGS_INFO } from '@/stores/blogsStore'
import { useClipboard } from '@vueuse/core'
const { text, copy, isSupported } = useClipboard()

const sourceOne = ref(`
let fruits = ["Apple", "Banana", "Cherry"];
fruits.push("Date"); // Adds 'Date' to the array`)

const copiedOne = ref(false)

const copyOne = () => {
  copy(sourceOne.value)
  copiedOne.value = true
  setTimeout(() => (copiedOne.value = false), 1500) // Reset after 1.5 seconds
}
</script>
