<template>
  <div>
    <Head>
      <title>Mastering Cloudflare DNS & Redirect Rules: A Complete Guide for Multi-Domain Management</title>
      <meta
        name="og:description"
        content="A complete technical guide for developers and system administrators on mastering Cloudflare DNS, Redirect Rules, Expressions, SSL, multi-domain management, and advanced redirect logic."
      />
      <meta
        name="og:keywords"
        content="Cloudflare, DNS, Redirect Rules, Page Rules, Expression Builder, SSL, Nameservers, Multi-domain redirect, NGINX rewrite, Odoo multi-website, CDN, Proxy, DevOps"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <!-- NAVBAR -->
    <div class="mb-3">
      <NavBar />
    </div>

    <!-- <div class="bg-gray-50 min-h-screen"> -->
      <!-- MOBILE TOC -->
      <div class="lg:hidden fixed top-20 right-4 z-50">
        <button
          @click="toggleMobileToc"
          class="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- MOBILE TOC PANEL -->
      <div id="mobileToc"
           class="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
           :class="{ hidden: isMobileTocHidden }"
           @click="closeMobileToc()"
      >
        <div class="fixed top-0 right-0 h-full w-80 bg-white shadow-xl overflow-y-auto" @click.stop="">
          <div class="p-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-bold">Table of Contents</h2>
              <button @click="closeMobileToc()" class="text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav class="space-y-2" id="mobileTocNav">
              <a v-for="section in sections"
                 :key="section.id"
                 :href="'#' + section.id"
                 class="block py-1 text-gray-600 hover:text-blue-600 transition-colors"
                 @click="closeMobileToc()"
              >
                {{ section.title }}
              </a>
            </nav>
          </div>
        </div>
      </div>

      <!-- MAIN CONTENT -->
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <!-- HEADER -->
        <div class="mb-8">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {{ BLOGS_INFO['cloudflare_redirect_rules']['title'] }}
          </h1>

          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Cloudflare</span>
            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">DNS</span>
            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">DevOps</span>
            <span>{{ BLOGS_INFO['cloudflare_redirect_rules']['date'] }} | {{ BLOGS_INFO['cloudflare_redirect_rules']['readTime'] }}</span>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">

          <!-- DESKTOP TOC -->
          <div class="hidden lg:block lg:w-80 flex-shrink-0">
            <nav class="sticky top-8 bg-white rounded-xl p-6 shadow-sm border">
              <div class="bg-blue-600 rounded-lg p-4 mb-6">
                <h2 class="text-lg font-semibold text-white">Table of Contents</h2>
              </div>

              <div class="space-y-2" id="desktopTocNav">
                <a
                  v-for="section in sections"
                  :key="section.id"
                  :href="'#' + section.id"
                  class="block py-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {{ section.title }}
                </a>
              </div>
            </nav>
          </div>

          <!-- ARTICLE -->
          <article class="flex-1 min-w-0">
            <div class="bg-white rounded-xl p-6 sm:p-8 shadow-sm border">
              <div class="prose prose-lg max-w-none">

                <!-- INTRODUCTION -->
                <section id="introduction" class="mb-14">
                  <h2 class="text-3xl font-bold mb-4">Introduction</h2>
                  <p class="leading-relaxed text-lg mb-4">
                    Cloudflare is one of the most powerful global edge networks used by developers, DevOps engineers,
                    and businesses to manage DNS, security, caching, CDN, and domain redirection. Understanding how DNS
                    works inside Cloudflare — and how Redirect Rules transform multi-domain routing — is essential for
                    building reliable, scalable architectures.
                  </p>
                  <p class="leading-relaxed text-lg">
                    In this guide, we’ll walk through Cloudflare DNS fundamentals, explain modern Redirect Rules,
                    contrast old Page Rules, build advanced expression-based redirects, and explore a practical
                    comparison with Odoo’s multi-website domain routing system.
                  </p>
                </section>

                <!-- SECTION: DNS BASICS -->
                <section id="dns-basics" class="mb-14">
                  <h2 class="text-3xl font-bold mb-6">Understanding Cloudflare DNS</h2>
                  <p class="text-lg leading-relaxed mb-4">
                    When you move a domain to Cloudflare, you point your nameservers to Cloudflare's. Once configured,
                    Cloudflare becomes the DNS authority for your domain and handles all DNS queries through its
                    ultra-fast global network.
                  </p>

                  <h3 class="text-xl font-semibold mb-4">Typical DNS Records</h3>

                  <ul class="list-disc pl-6 space-y-2 mb-4 text-lg">
                    <li><strong>A Record</strong>: Points your domain to an IPv4 server address</li>
                    <li><strong>AAAA Record</strong>: Points to an IPv6 address</li>
                    <li><strong>CNAME</strong>: Alias another hostname</li>
                    <li><strong>TXT</strong>: Used for SPF, Google verification, etc.</li>
                    <li><strong>MX</strong>: Mail routing</li>
                  </ul>

                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.dnsExample)"
                      class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs copy-btn"
                    >
                      Copy
                    </button>

                    <pre class="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-100" ref="dnsExample"><code># Example DNS Setup
A      example.com        → 192.0.2.10
A      api.example.com    → 192.0.2.20
CNAME  www.example.com    → example.com
TXT    example.com        → "google-site-verification=XYZ123"
MX     example.com        → mail.example.net</code></pre>
                  </div>

                  <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                    <p class="text-sm text-blue-700">
                      <strong>Tip:</strong> Always proxy traffic through Cloudflare (orange cloud ✅)
                      unless you specifically need DNS-only mode.
                    </p>
                  </div>
                </section>

                <!-- SECTION: REDIRECT RULES -->
                <section id="redirect-rules" class="mb-14">
                  <h2 class="text-3xl font-bold mb-6">Mastering Cloudflare Redirect Rules</h2>

                  <p class="text-lg leading-relaxed mb-4">
                    Cloudflare replaced the older Page Rules with a more flexible and powerful system: Redirect Rules.
                    These rules run at the edge and allow highly customizable filtering using Cloudflare’s Expression
                    Language.
                  </p>

                  <h3 class="text-xl font-semibold mb-4">Basic Redirect Rule Example</h3>

                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.redirectBasic)"
                      class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs copy-btn"
                    >Copy</button>

                    <pre class="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-100"
                         ref="redirectBasic"><code># Redirect www → non-www
(http.host eq "www.example.com")

Action:
concat("https://example.com", http.request.uri.path)</code></pre>
                  </div>

                  <h3 class="text-xl font-semibold mb-4">Redirecting Multiple Hostnames</h3>

                  <p class="leading-relaxed text-lg mb-4">
                    When you need to redirect more than one domain into a single target, the correct syntax is using
                    Cloudflare’s <code>in {}</code> operator.
                  </p>

                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.redirectMulti)"
                      class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs copy-btn"
                    >Copy</button>

                    <pre class="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-100"
                      ref="redirectMulti"><code>(http.host in {"example.net" "www.example.net"})

Action:
concat("https://example.com", http.request.uri.path)</code></pre>
                  </div>

                  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                    <p class="text-sm text-yellow-700">
                      <strong>Important:</strong> Using <code>or</code> inside the expression builder
                      interface often causes UI validation errors. Always switch to “Edit Expression”
                      and use the <code>in { }</code> syntax.
                    </p>
                  </div>
                </section>

                <!-- SECTION: ADVANCED REDIRECT LOGIC -->
                <section id="advanced-redirects" class="mb-14">
                  <h2 class="text-3xl font-bold mb-6">Advanced Cloudflare Redirect Expressions</h2>

                  <h3 class="text-xl font-semibold mb-4">1. Country-based Redirect</h3>
                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.countryRedirect)"
                      class="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 rounded text-xs copy-btn"
                    >Copy</button>

                    <pre ref="countryRedirect" class="bg-gray-900 p-4 rounded text-gray-100 overflow-x-auto"><code>(ip.geoip.country eq "AU")

Action:
"https://au.example.com"</code></pre>
                  </div>

                  <h3 class="text-xl font-semibold mb-4">2. Redirect Only Subpath</h3>

                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.pathRedirect)"
                      class="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 rounded text-xs copy-btn"
                    >Copy</button>

                    <pre ref="pathRedirect" class="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto"><code>(http.request.uri.path starts_with "/old")

Action:
concat("https://example.com/new", http.request.uri.path)</code></pre>
                  </div>

                  <h3 class="text-xl font-semibold mb-4">3. Force HTTPS (Edge Rule)</h3>

                  <div class="relative mb-6">
                    <button
                      @click="copyCode($refs.httpsRedirect)"
                      class="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 rounded text-xs copy-btn"
                    >Copy</button>

                    <pre ref="httpsRedirect" class="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto"><code>(not http.request.full_uri starts_with "https")

Action:
concat("https://", http.host, http.request.uri.path)</code></pre>
                  </div>

                </section>

                <!-- SECTION: CLOUDFLARE VS ODOO -->
                <section id="cloudflare-vs-odoo" class="mb-14">
                  <h2 class="text-3xl font-bold mb-6">Cloudflare Redirect Rules vs Odoo Multi-Website Domain Handling</h2>

                  <p class="text-lg leading-relaxed mb-4">
                    Many teams struggle when they manage multiple websites in Odoo while using Cloudflare for DNS and
                    redirection. Understanding how both systems handle domains helps avoid misrouting, wrong-domain
                    rendering, or redirect loops.
                  </p>

                  <h3 class="text-xl font-semibold mb-4">How Cloudflare Works</h3>
                  <ul class="list-disc pl-6 mb-6 text-lg space-y-2">
                    <li>Cloudflare handles DNS → which hostname points where</li>
                    <li>Redirect Rules decide where requests go (before they reach Odoo)</li>
                    <li>Cloudflare operates at the edge, outside your server</li>
                  </ul>

                  <h3 class="text-xl font-semibold mb-4">How Odoo Works</h3>
                  <ul class="list-disc pl-6 mb-6 text-lg space-y-2">
                    <li>Odoo routes users internally based on the request hostname</li>
                    <li>Each website can only hold one primary domain</li>
                    <li>If Odoo sees an unknown domain → it loads the default website</li>
                  </ul>

                  <h3 class="text-xl font-semibold mb-4">Common Conflict</h3>
                  <p class="text-lg mb-4">
                    If Cloudflare points two domains to the same origin server but Odoo only recognizes one of them, the
                    second domain loads the wrong website.
                  </p>

                  <h3 class="text-xl font-semibold mb-4">Solution</h3>

                  ```
                  ✅ Use Cloudflare only for DNS & redirections  
                  ✅ Ensure each Odoo website has exactly ONE hostname  
                  ✅ Redirect secondary domains at Cloudflare level BEFORE they reach Odoo  
                  ```

                  <div class="bg-green-50 border-l-4 border-green-400 p-4 my-6">
                    <p class="text-sm text-green-700">
                      <strong>Pro Tip:</strong> Odoo should not handle multi-domain redirects.  
                      Let Cloudflare manage domain canonicalization — it's faster and avoids misrouting.
                    </p>
                  </div>
                </section>

                <!-- SECTION: TROUBLESHOOTING -->
                <section id="troubleshooting" class="mb-14">
                  <h2 class="text-3xl font-bold mb-6">Troubleshooting Cloudflare DNS & Redirect Issues</h2>

                  <h3 class="text-xl font-semibold mb-4">1. Redirect Not Working?</h3>
                  <ul class="list-disc pl-6 space-y-2 text-lg">
                    <li>Check that Cloudflare proxy is ON (orange cloud ✅)</li>
                    <li>Ensure the rule is placed above others</li>
                    <li>Clear Cloudflare cache</li>
                    <li>Try in private/incognito mode</li>
                  </ul>

                  <h3 class="text-xl font-semibold my-4">2. Wrong Website Appearing?</h3>
                  <ul class="list-disc pl-6 space-y-2 text-lg">
                    <li>Check Odoo’s website domain settings</li>
                    <li>Ensure Cloudflare redirects unknown hostnames</li>
                  </ul>

                  <h3 class="text-xl font-semibold my-4">3. DNS Record Shows “Proxied But Unreachable”</h3>
                  <ul class="list-disc pl-6 space-y-2 text-lg">
                    <li>Your server may block Cloudflare IPs</li>
                    <li>Add Cloudflare IP ranges to allowed list</li>
                  </ul>
                </section>

                <!-- CONCLUSION -->
                <section id="conclusion" class="mb-14">
                  <h2 class="text-3xl font-bold mb-6">Conclusion</h2>

                  <p class="leading-relaxed text-lg mb-4">
                    Cloudflare is much more than a DNS host — it’s an intelligent global network that can completely
                    transform how your domains route, redirect, and interact with your backend architecture. With
                    Redirect Rules, Expression Builder, and advanced conditions, developers can craft precise,
                    high-performance routing logic directly at the edge.
                  </p>
                  <p class="leading-relaxed text-lg">
                    When combined with platforms like Odoo, understanding where domain routing should happen — at
                    Cloudflare or at the application layer — becomes essential. I have worked on directing multi-domain 
                    either non-www to www within in same domain server or converging non-identical domains to one. It was daunting
                    at the very beginning but by handling canonical redirects,
                    multi-domain routing, and DNS management at Cloudflare, you reduce load on your servers and achieve
                    maximum reliability.
                  </p>
                </section>

              </div>
            </div>
          </article>

        </div>
      </div>
    <!-- </div> -->

    <Footer />
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '@/views/home/Navigation.vue'
import Footer from '@/views/home/Footer.vue'
import { Head } from '@unhead/vue/components'
import { BLOGS_INFO } from '@/stores/blogsStore'

// STATE
const isMobileTocHidden = ref(true)
const sections = ref([])

// CODE BLOCK REFS
const dnsExample = ref(null)
const redirectBasic = ref(null)
const redirectMulti = ref(null)
const countryRedirect = ref(null)
const pathRedirect = ref(null)
const httpsRedirect = ref(null)

// GENERATE TOC
const generateToc = () => {
  const allSections = document.querySelectorAll('section[id]')
  sections.value = Array.from(allSections).map(sec => ({
    id: sec.id,
    title: sec.querySelector('h2').innerText
  }))
}

const toggleMobileToc = () => {
  isMobileTocHidden.value = !isMobileTocHidden.value
  document.body.style.overflow = isMobileTocHidden.value ? 'auto' : 'hidden'
}

const closeMobileToc = () => {
  isMobileTocHidden.value = true
  document.body.style.overflow = 'auto'
}

const copyCode = (preElement) => {
  if (preElement && preElement.querySelector('code')) {
    const code = preElement.querySelector('code').innerText
    navigator.clipboard.writeText(code).then(() => {
      const button = preElement.previousElementSibling
      if (button) {
        button.textContent = 'Copied!'
        setTimeout(() => {
          button.textContent = 'Copy'
        }, 2000)
      }
    })
  }
}

onMounted(() => generateToc())
</script>

<style scoped>
.prose {
  color: #374151;
}
.prose h1,
.prose h2,
.prose h3 {
  color: #111827;
}
.prose h2 {
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}
.prose code {
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-weight: 600;
}
pre {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.4;
  background-color: #111827;
  color: #f3f4f6;
}
.copy-btn {
  transition: all 0.2s ease;
}
.copy-btn:hover {
  background-color: #4b5563;
}
</style>
