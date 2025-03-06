<template>
    <Head>
      <title>Build Time and Run Time Integration</title>
      <meta name="og:description" content="Vue catch all /404 Not Found Route" />
      <meta
        name="og:keywords"
        content="Software Engineer, Docker, HTML, CSS, Python, Vue, JavaScript, Build time, Runtime, Integration"
      />
    </Head>
    <div class="mb-3">
      <NavBar />
    </div>
    <div class="max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
      <h1 class="text-3xl">{{ BLOGS_INFO['buildAndRunTimeIntegration']['title'] }}</h1>
      <p id="read-text">
        {{ BLOGS_INFO['buildAndRunTimeIntegration']['date'] }} | {{ BLOGS_INFO['buildAndRunTimeIntegration']['readTime'] }} read
      </p>
      <h2 class="text-lg my-3">
        Buid time and Run time intergration are very widely used concepts nowadays.  
      </h2>
    </div>
    <Footer/>
</template>
<script setup>
import NavBar from '@/views/home/Navigation.vue'
import Footer from '@/views/home/Footer.vue'
 import { Head } from '@unhead/vue/components'
 import { BLOGS_INFO } from '@/stores/blogsStore'
</script>