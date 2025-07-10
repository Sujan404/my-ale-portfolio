```vue
<template>
  <div>
    <div class="max-w-screen-xl mx-auto text-center">
      <div class="p-4 sm:p-6 xl:p-8">
        <div class="flex flex-wrap justify-center my-5">
          <img :src="imgUrl" class="text-center rounded-full" alt="Sujan Ale" />
        </div>
        <div>
          <h1 class="md:text-5xl text-4xl lg:mt-20 md:mt-10 mt-5 text-green-600">
            Hello, I am Sujan Ale, Software Engineer.
          </h1>

          <h2 class="text-lg my-2 text-orange-600">
            I am an enthusiastic nerd who is always thriving to learn new things. I have started
            this website to share my learnings that I have learnt so far and will be trying my best
            to explicitly include my challenges and its overcomed ways in the blogs.
          </h2>
        </div>
      </div>
    </div>
    <div class="h-36 text-center flex flex-wrap justify-center bg-gray-100 my-12">
      <h1 class="md:text-5xl text-4xl my-6 text-blue-700 flex flex-wrap items-center">
        Things I have learnt
      </h1>
    </div>

    <div class="max-w-screen-xl mx-auto flex flex-wrap justify-around max-sm:mx-2">
      <div
        v-for="article in currentPageArticles"
        class="max-w-sm p-6 border border-gray-200 rounded-lg shadow bg-gray-100 dark:border-gray-700 max-sm:my-2"
      >
        <router-link :to="{ name: article.routeName }">
          <div>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ article.title }}
            </h5>
            <p>{{ article.date }} | {{ article.readTime }} read</p>
          </div>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ article.summary }}</p>
          <p
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more

            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </p>
        </router-link>
      </div>
    </div>
    <Pagination :rows="rows" :totalRecords="articles.length" @page="onPageChange" />

    <!-- The projects I have worked on -->
    <div
      class="h-36 text-center flex flex-wrap justify-center bg-gray-100 my-12 relative bg-cover bg-center"
    >
      <div class="absolute inset-0 bg-gray-100 opacity-75"></div>
      <h1 class="md:text-5xl text-4xl my-6 text-blue-700 flex flex-wrap items-center relative z-10">
        Projects I have worked on
      </h1>
    </div>
    <div class="max-w-screen-xl mx-auto flex flex-wrap justify-around max-sm:mx-2">
      <a
        v-for="company in companies"
        :href="company.url"
        target="_blank"
        class="max-w-sm p-6 border border-gray-200 rounded-lg shadow bg-gray-100 dark:border-gray-700 max-sm:my-2 hover:bg-gray-200 transition-colors duration-200 relative bg-cover bg-center"
        :style="{ backgroundImage: `url(${company.bgImage})` }"
      >
        <div class="absolute inset-0 bg-gray-100 opacity-75"></div>
        <div class="relative z-10">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ company.name }}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ company.description }}</p>
          <span
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Visit Website
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import imgUrl from '@/assets/images/me/sujan.png'
import Pagination from './Pagination.vue'
import { ref, computed } from 'vue'
import { RENDER_ARTICLES } from '@/views/home/blogs/renderBlogList'

const articles = RENDER_ARTICLES

const first = ref(0)
const rows = ref(3) // Number of items per page

// Compute the current page items
const currentPageArticles = computed(() => {
  const start = first.value
  const end = start + rows.value
  return articles.value.slice(start, end)
})

// Event handler for page changes
const onPageChange = (event) => {
  first.value = event.first
  rows.value = event.rows
}

// Companies data with background images
const companies = [
  
  {
    name: 'GeoTrack',
    url: 'https://www.geotrack.com.np/',
    description:
      'Specializing in location-based services and Geographic Information System (GIS) solutions for efficient tracking and mapping.',
    bgImage:
      'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'AuctionsLive',
    url: 'https://auctionslive.com/',
    description:
      'An online platform revolutionizing real estate auctions with seamless the digital bidding experiences.',
    bgImage:
      'https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'NIRI Nepal',
    url: 'https://nirinepal.org/',
    description:
      'A non-profit organization focused on research and innovation for sustainable development in Nepal.',
    bgImage:
      'https://plus.unsplash.com/premium_photo-1691735665916-cf31006dffe3?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  },
  {
    name: 'Three Brothers',
    url: 'https://threebrothersnepal.com/',
    description:
      'Three Brothers Human Resource Pvt. Ltd. (ISO Certificated Company 9001:2015) is a professionally managed organization covering the entire country of Nepal.',
    bgImage:
      'https://plus.unsplash.com/premium_photo-1688821131205-52f5c633ce69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Software Shark Tech',
    url: 'https://softwaresharktech.com/',
    description:
      'A technology company delivering innovative software solutions for businesses in Nepal and beyond.',
    bgImage:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
  },
]
</script>
