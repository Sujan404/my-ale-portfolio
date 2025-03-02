<template>
  <div>
    <Head>
      <title>Proxy/Forward and Reverse Proxy servers</title>
      <meta name="og:description" content="Vue catch all /404 Not Found Route" />
      <meta
        name="og:keywords"
        content="Software Engineer, Docker, HTML, CSS, Python, Vue, JavaScript, Bastion Host Architecture"
      />
    </Head>
    <div class="mb-3">
      <NavBar />
    </div>
    <div class="max-w-screen-xl mx-auto p-4 sm:p-6 xl:p-8">
      <h1 class="text-3xl">Proxy vs Reverse Proxy</h1>
      <p id="read-text">2025-02-26 | 2 min read</p>
      <div class="flex justify-between">
        <div class="relative mr-8 my-5 max-md:hidden">
          <nav class="sticky top-5 bg-gray-100 rounded-xl flex flex-col p-1">
            <div class="bg-blue-500 rounded-xl p-3">
              <h2 class="text-lg my-3 text-white">
                Understanding Proxy/Forward Server and Reverse Proxy Server
              </h2>
            </div>
            <a
              class="p-3 hover:bg-gray-500 hover:rounded-xl cursor-pointer"
              href="#overview"
              :class="activeNav === 'overview' ? 'bg-gray-500 rounded-xl': 'sdf'"
            >
              <span class="text-lg my-3 hover:bg-gray-500">Overview</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer"
              href="#proxy-server"
              :class="activeNav === 'proxy-server' ? 'bg-gray-500 rounded-xl': ''"
            >
              <span class="text-md my-3 hover:bg-gray-500">Forward/Proxy Server</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer"
              href="#proxy-server-examples"
              :class="activeNav === 'proxy-server-examples' ? 'bg-gray-500 rounded-xl': ''"
            >
              <span class="text-md my-3 hover:bg-gray-500">Examples of Proxy Server</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer"
              href="#proxy-server-features"
              :class="activeNav === 'proxy-server-features' ? 'bg-gray-500 rounded-xl': ''"
            >
              <span class="text-md my-3 hover:bg-gray-500">Features and uses of Proxy Server</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer"
              href="#reverse-proxy-server"
              :class="activeNav === 'reverse-proxy-server' ? 'bg-gray-500 rounded-xl': ''"
            >
              <span class="text-md my-3 hover:bg-gray-500">Reverse Proxy Server</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer"
              href="#reverse-proxy-server-examples"
              :class="activeNav === 'reverse-proxy-server-examples' ? 'bg-gray-500 rounded-xl': ''"
            >
              <span class="text-md my-3 hover:bg-gray-500">Examples of Reverse Proxy Server</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer"
              href="#reverse-proxy-server-features"
              :class="activeNav === 'reverse-proxy-server-features' ? 'bg-gray-500 rounded-xl': ''"
            >
              <span class="text-md my-3 hover:bg-gray-500"
                >Features and uses of Reverse Proxy Server</span
              >
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer"
              href="#conclusion"
              :class="activeNav === 'conclusion' ? 'bg-gray-500 rounded-xl': ''"
            >
              <span class="text-md my-3 hover:bg-gray-500">Conclusion</span>
            </a>
          </nav>
        </div>
        <div class="md:ml-8">
          <div class="flex flex-wrap justify-center my-5">
            <img :src="imgUrl" class="text-center" />
          </div>
          <div>
            <div id="overview">
              <section>
                <h1 class="text-lg my-3">Overview</h1>
                <h2 class="text-lg my-3">
                  These two words <strong>Proxy/Forward Proxy</strong> and
                  <strong>Reverse Proxy</strong> are very pouplar words we hear everyday. They are
                  heavily used in controling web traffics between users and applications servers
                  creating robust, low latency, and secured connections among users and
                  applications.
                </h2>
                <pre>
                    you 












                    need to














                    scroll
                  </pre
                >
              </section>
            </div>
            <div id="proxy-server">
              <section>
                <h1 class="text-lg my-3">Forward/Proxy Server</h1>
                <h2 class="text-lg my-3">
                  These two words <strong>Proxy/Forward Proxy</strong> and
                  <strong>Reverse Proxy</strong> are very pouplar words we hear everyday. They are
                  heavily used in controling web traffics between users and applications servers
                  creating robust, low latency, and secured connections among users and
                  applications.
                </h2>
                <pre>
                    you 












                    need to














                    scroll
                  </pre
                >
              </section>
            </div>
            <div id="proxy-server-examples">
              <section>
                <h1 class="text-lg my-3">Examples of Proxy Server</h1>
                <h2 class="text-lg my-3">
                  These two words <strong>Proxy/Forward Proxy</strong> and
                  <strong>Reverse Proxy</strong> are very pouplar words we hear everyday. They are
                  heavily used in controling web traffics between users and applications servers
                  creating robust, low latency, and secured connections among users and
                  applications.
                </h2>
                <pre>
                    you 












                    need to














                    scroll
                  </pre
                >
              </section>
            </div>
            <div id="proxy-server-features">
              <section>
                <h1 class="text-lg my-3">Features and uses of Proxy Server</h1>
                <h2 class="text-lg my-3">
                  These two words <strong>Proxy/Forward Proxy</strong> and
                  <strong>Reverse Proxy</strong> are very pouplar words we hear everyday. They are
                  heavily used in controling web traffics between users and applications servers
                  creating robust, low latency, and secured connections among users and
                  applications.
                </h2>
                <pre>
                    you 












                    need to














                    scroll
                  </pre
                >
              </section>
            </div>
            <div id="reverse-proxy-server">
              <section>
                <h1 class="text-lg my-3">Reverse Proxy Server</h1>
                <h2 class="text-lg my-3">
                  These two words <strong>Proxy/Forward Proxy</strong> and
                  <strong>Reverse Proxy</strong> are very pouplar words we hear everyday. They are
                  heavily used in controling web traffics between users and applications servers
                  creating robust, low latency, and secured connections among users and
                  applications.
                </h2>
                <pre>
                    you 












                    need to














                    scroll
                  </pre
                >
              </section>
            </div>
            <div id="reverse-proxy-server-examples">
              <section>
                <h1 class="text-lg my-3">Examples of Reverse Proxy Server</h1>
                <h2 class="text-lg my-3">
                  These two words <strong>Proxy/Forward Proxy</strong> and
                  <strong>Reverse Proxy</strong> are very pouplar words we hear everyday. They are
                  heavily used in controling web traffics between users and applications servers
                  creating robust, low latency, and secured connections among users and
                  applications.
                </h2>
                <pre>
                    you 












                    need to














                    scroll
                  </pre
                >
              </section>
            </div>
            <div id="reverse-proxy-server-features">
              <section>
                <h1 class="text-lg my-3">Features and uses of Reverse Proxy Server</h1>
                <h2 class="text-lg my-3">
                  These two words <strong>Proxy/Forward Proxy</strong> and
                  <strong>Reverse Proxy</strong> are very pouplar words we hear everyday. They are
                  heavily used in controling web traffics between users and applications servers
                  creating robust, low latency, and secured connections among users and
                  applications.
                </h2>
                <pre>
                    you 












                    need to














                    scroll
                  </pre
                >
              </section>
            </div>
            <div id="conclusion">
              <section>
                <h1 class="text-lg my-3">Conclusion</h1>
                <h2 class="text-lg my-3">
                  These two words <strong>Proxy/Forward Proxy</strong> and
                  <strong>Reverse Proxy</strong> are very pouplar words we hear everyday. They are
                  heavily used in controling web traffics between users and applications servers
                  creating robust, low latency, and secured connections among users and
                  applications.
                </h2>
                <pre>
                    asfasf
















                    afdfds
                </pre>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import NavBar from '@/views/home/Navigation.vue'
import Footer from '@/views/home/Footer.vue'
import { Head } from '@unhead/vue/components'
import { onMounted, ref, onUnmounted } from 'vue'
import { useClipboard } from '@vueuse/core'
import imgUrl from '@/assets/images/2025/proxy-vs-reverse-proxy.png'

var activeNav = ref('')
const sections = [
  'overview',
  'proxy-server',
  'proxy-server-examples',
  'proxy-server-features',
  'reverse-proxy-server',
  'reverse-proxy-server-examples',
  'reverse-proxy-server-features',
  'conclusion'
]

onMounted(() => {
  window.addEventListener('scroll', handleNavBar)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleNavBar)
})

function handleNavBar() {
  for (var section of sections) {
    var element = document.getElementById(section)
    console.log(element)
    if (element) {
      // console.log(element.offsetHeight)
      // console.log(element.scrollHeight)
      console.log(element.offsetTop)
      // console.log(window.scrollY)
      if (window.scrollY + 100 >= element.offsetTop) {
        activeNav.value = section
        console.log('The height is more than offset height')
      }
    }
  }
}
// Store the code you want to copy in `source`
const sourceOne = ref(`
<template>
    <div class="flex flex-col min-h-screen w-full">
        <div class="flex flex-col flex-grow justify-center mx-auto p-4 sm:p-6 xl:p-8">
            <h1 class="text-3xl">Oops! The page you are looking for does not exist.</h1>
            <router-link class="text-xl" to="/">Go back to Home</router-link>
        </div>
    </div>
</template>`)

const sourceTwo = ref(`
import { createRouter, createWebHistory } from 'vue-router'
import RouteNotFound from '@/views/home/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  // Catch-all route for undefined paths
     {
      path: '/:pathMatch(.*)*',
      name: 'RouteNotFound',
      component: RouteNotFound
    },
  ]
})`)
const { text, copy, isSupported } = useClipboard()

const copiedOne = ref(false)
const copiedTwo = ref(false)

const copyOne = () => {
  copy(sourceOne.value)
  copiedOne.value = true
  setTimeout(() => (copiedOne.value = false), 1500) // Reset after 1.5 seconds
}

const copyTwo = () => {
  copy(sourceTwo.value)
  copiedTwo.value = true
  setTimeout(() => (copiedTwo.value = false), 1500)
}
</script>
