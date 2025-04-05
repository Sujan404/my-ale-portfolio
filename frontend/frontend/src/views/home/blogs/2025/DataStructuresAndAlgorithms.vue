<template>
  <Head>
    <title>Build Time and Run Time Integration</title>
    <meta name="og:description" content="Vue catch all /404 Not Found Route" />
    <meta
      name="og:keywords"
      content="Software Engineer, Docker, HTML, CSS, Python, Vue, JavaScript, Build time, Runtime, Integration"
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
  </div>

  <Footer />
</template>

<script setup>
import NavBar from '@/views/home/Navigation.vue'
import Footer from '@/views/home/Footer.vue'
import { Head } from '@unhead/vue/components'
import { BLOGS_INFO } from '@/stores/blogsStore'
</script>
