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
            <div class="bg-blue-500 rounded-xl p-3 my-1">
              <h2 class="text-lg my-3 text-white">
                Understanding Proxy/Forward Server and Reverse Proxy Server
              </h2>
            </div>
            <a
              class="p-3 hover:bg-gray-500 hover:rounded-xl cursor-pointer hover:text-white"
              href="#overview"
              :class="activeNav === 'overview' ? 'bg-gray-500 rounded-xl text-white' : ''"
            >
              <span class="text-md">Overview</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer hover:text-white"
              href="#proxy-server"
              :class="activeNav === 'proxy-server' ? 'bg-gray-500 rounded-xl text-white' : ''"
            >
              <span class="text-md">Forward/Proxy Server</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer hover:text-white"
              href="#proxy-server-features"
              :class="
                activeNav === 'proxy-server-features' ? 'bg-gray-500 rounded-xl text-white' : ''
              "
            >
              <span class="text-md">Features of Proxy Server</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer hover:text-white"
              href="#reverse-proxy-server"
              :class="
                activeNav === 'reverse-proxy-server' ? 'bg-gray-500 rounded-xl text-white' : ''
              "
            >
              <span class="text-md">Reverse Proxy Server</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer hover:text-white"
              href="#reverse-proxy-server-features"
              :class="
                activeNav === 'reverse-proxy-server-features'
                  ? 'bg-gray-500 rounded-xl text-white'
                  : ''
              "
            >
              <span class="text-md">Features and uses of Reverse Proxy Server</span>
            </a>
            <a
              class="p-3 hover:rounded-xl hover:bg-gray-500 cursor-pointer hover:text-white"
              href="#conclusion"
              :class="activeNav === 'conclusion' ? 'bg-gray-500 rounded-xl text-white' : ''"
            >
              <span class="text-md">Conclusion</span>
            </a>
          </nav>
        </div>
        <div class="md:ml-8">
          <div class="flex flex-wrap justify-center my-5">
            <img :src="imgUrl" class="text-center" />
          </div>
          <div>
            <div id="overview">
              <section class="text-justify">
                <h1 class="text-xl my-3 font-bold">Overview</h1>
                <h2 class="text-lg my-3">
                  These two words <strong>Proxy/Forward Proxy</strong> and
                  <strong>Reverse Proxy</strong> are very pouplar words we hear everyday. They are
                  heavily used in controling web traffics between users and applications servers
                  creating robust, low latency, and secured connections among users and
                  applications. Lets delve into what they are and how they are differed from each
                  other.
                </h2>
              </section>
            </div>
            <div id="proxy-server">
              <section class="text-justify">
                <h1 class="text-xl my-3 font-bold">Forward/Proxy Server</h1>
                <h2 class="text-lg my-3">
                  Proxy server acts as a middleman between user's computer and the application
                  server where user sends a request to browser, this request gets through the proxy
                  server and proxy server uses its IP address to fetch the website on the behalf of
                  user hiding user's computer IP address in the process.
                </h2>
                <h2 class="text-lg my-3">
                  Lets take an example, a receptionist at an office building who receives all
                  incoming packages and then delivers them to the appropriate person inside, acting
                  as an intermediary between the outside world and the individuals within the
                  building; essentially, the receptionist (proxy server) manages and filters who
                  gets what, while keeping the identities of the people inside the building (users)
                  private from those outside.
                </h2>
              </section>
            </div>
            <div id="proxy-server-features">
              <section class="text-justify">
                <h1 class="text-xl my-3 font-bold">Features of Proxy Server</h1>
                <ol class="text-lg my-3">
                  <li>
                    Content Filtering: Block access to specific websites or categories of content
                    based on company policy.
                  </li>
                  <li>
                    Internet Access Control: Monitor and restrict employee web browsing activity.
                  </li>
                  <li>Anonymity: Hide a user's IP address when accessing the internet (VPN).</li>
                  <li>
                    Geo-restricted Content Access: Access content from different regions by routing
                    traffic through a proxy in that location.
                  </li>
                  <li>
                    Caching Popular Content: Store frequently accessed web content locally to reduce
                    bandwidth usage.
                  </li>
                </ol>
              </section>
            </div>
            <div id="reverse-proxy-server">
              <section>
                <h1 class="text-lg my-3 font-bold">Reverse Proxy Server</h1>
                <h2 class="text-lg my-3">
                  A reverse proxy server functions as an intermediary between users and backend
                  servers. While a proxy server hides a user's IP address from the internet, a
                  reverse proxy hides the backend server's IP address from users, improving
                  security, load balancing, and performance.
                </h2>
                <h2 class="text-lg my-3">
                  Lets take an example. Imagine a large company’s customer service center where
                  customers call a single public phone number.
                </h2>
                <ol class="text-lg my-3">
                  <li>
                    The receptionist (reverse proxy) answers all calls and routes them to the
                    appropriate department or representative inside the company.
                  </li>
                  <li>
                    The customers (users) never directly interact with the internal employees
                    (application servers).
                  </li>
                  <li>
                    The real identities and contact details of employees remain hidden, and
                    customers only see the public number of the company.
                  </li>
                  <li>
                    The receptionist can also filter spam calls, prioritize VIP customers, or record
                    calls for security purposes.
                  </li>
                </ol>
              </section>
            </div>
            <div id="reverse-proxy-server-features">
              <section>
                <h1 class="text-lg my-3 font-bold">Features and uses of Reverse Proxy Server</h1>
                <h2 class="text-lg my-3"></h2>
                <ol class="text-lg my-3">
                  <li>
                    Load Balancing: Distribute incoming traffic across multiple web servers to
                    improve performance and availability.
                  </li>
                  <li>
                    Website Security: Filter malicious requests and protect against DDoS attacks
                    before they reach the backend server.
                  </li>
                  <li>
                    Content Caching: Cache static website content to reduce server load and improve
                    response times.
                  </li>
                  <li>
                    SSL Termination: Decrypt HTTPS traffic at the proxy level, allowing backend
                    servers to operate without managing SSL certificates.
                  </li>
                  <li>
                    IP Address Masking: Hide the actual IP addresses of backend servers from
                    clients.
                  </li>
                </ol>
              </section>
            </div>
            <div id="conclusion">
              <section>
                <h1 class="text-lg my-3 font-bold">Conclusion</h1>
                <h2 class="text-lg my-3">Here are the main points to remember about Proxy and Reverse Proxy:</h2>
                <ol class="text-lg my-3">
                    
<li>
A proxy server acts as a middleman between you and the internet. It hides your IP address and provides you with a new one. This helps maintain your online privacy and access geographically restricted content.

</li> 
<li>
    A reverse proxy stands in front of servers and forwards client requests to those servers. It provides an additional layer of security, load balancing, and SSL encryption offloading.

</li> 
<li>
    While both forward proxy and reverse proxy servers serve as intermediaries in the network, they cater to different cases: forward proxies serve the client-side, and reverse proxies benefit the server side.
</li>              
</ol>
               
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
import imgUrl from '@/assets/images/2025/proxy-vs-reverse-proxy.png'

var activeNav = ref('')
const sections = [
  'overview',
  'proxy-server',
  'proxy-server-features',
  'reverse-proxy-server',
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
      if (window.scrollY + 100 >= element.offsetTop) {
        activeNav.value = section
      }
    }
  }
}
</script>
