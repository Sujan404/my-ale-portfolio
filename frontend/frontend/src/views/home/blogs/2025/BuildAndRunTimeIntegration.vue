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
      {{ BLOGS_INFO['buildAndRunTimeIntegration']['date'] }} |
      {{ BLOGS_INFO['buildAndRunTimeIntegration']['readTime'] }} read
    </p>
    <section class="text-lg">
      <h2 class="my-3">
        When developing a web application, we often integrate third-party APIs, databases, and other
        services. These integrations can happen at two different stages:
      </h2>
      <ol class="my-3">
        <li>● Build-Time Integration (happens before the app is deployed)</li>
        <li>● Run-Time Integration (happens while the app is running)</li>
      </ol>
      <h2 class="my-3">
        Both have their own advantages and are used in different scenarios. Let’s break them down
        with simple explanations and technical examples.
      </h2>
    </section>
    <section class="text-lg">
      <h2 class="my-3 font-bold">What is Build-Time Integration?</h2>
      <h2 class="my-3">
        Build-time integration happens before the application is deployed. It is mainly about
        compiling, bundling, or processing data during the build phase. Once the app is built, the
        integration is set and does not change until a new build is deployed.
      </h2>
      <h2 class="my-3 font-bold">
        Example: Fetching Static Content from an API at Build Time in Vue.js
      </h2>
      <h2 class="my-3">
        Consider a blog that fetches posts from an external API. Using a Vue.js build process, we
        can fetch the data before deployment and store it as static JSON:
      </h2>
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
