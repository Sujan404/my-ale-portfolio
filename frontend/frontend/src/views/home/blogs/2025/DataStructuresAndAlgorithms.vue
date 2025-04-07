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
            <p><span class="font-bold">1. Array</span></p>
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
</script>
